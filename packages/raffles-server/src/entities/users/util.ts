import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { algorithm, secret } from '../../../config';
import { generateUserNonce, User } from './model';
import jwt from 'jsonwebtoken';
import pubsub from '../../pubsub';
import {
  BALANCE_CHANGED,
  EMAIL_LIST_IDS,
  EMAIL_TEMPLATE_ID,
  HASH_EXPIRATION,
} from './constants';
import { getUserBalance } from '../balances/service';
import { ContextUser, TokenPayload } from '../../types';
import redisService from '../../redisService';
import * as SibApiV3Sdk from 'sib-api-v3-typescript';

export function signJwtToken(user: User) {
  return new Promise<string>((resolve, reject) =>
    // https://github.com/auth0/node-jsonwebtoken
    jwt.sign(
      {
        payload: {
          id: user.id,
          publicAddress: user.publicAddress,
          isAdmin: user.isAdmin,
        },
      },
      secret,
      { algorithm },
      (err: any, token: string) => {
        if (err) {
          return reject(err);
        }
        if (!token) {
          return new Error('Empty token');
        }
        return resolve(token);
      },
    ),
  );
}

export const authenticateSignature = async (
  signature: string,
  publicAddress: string,
  signStringGenerator: (nonce: string | number) => string,
) => {
  if (!signature || !publicAddress) {
    throw new Error('Either `publicAddress` or `signature` missing');
  }

  const user: User | null = await User.findOne({ where: { publicAddress } });
  if (!user) {
    // should not happen if the app is used correctly
    // the user should be present in the db
    throw new Error(
      `User with publicAddress ${publicAddress} is not found in database`,
    );
  }

  // we want to check is the signature is correct
  const address = recoverPersonalSignature({
    data: bufferToHex(Buffer.from(signStringGenerator(user.nonce), 'utf8')),
    sig: signature,
  });

  // The signature verification is successful if the address found with
  // sigUtil.recoverPersonalSignature matches the initial publicAddress
  if (address.toLowerCase() !== publicAddress.toLowerCase()) {
    throw new Error('Signature verification failed');
  }

  user.nonce = generateUserNonce();
  await user.save();
  return await signJwtToken(user);
};

export async function validateUsername(
  username: string,
  userId: number,
): Promise<boolean | string> {
  if (!username) return true;
  if (!/^[a-z0-9-._]{2,20}$/i.test(username)) return false;
  const userWithThisUsername = await User.findOne({ where: { username } });
  return (
    !userWithThisUsername ||
    userWithThisUsername.id === userId ||
    'Username already taken'
  );
}

export async function validateEmail(email: string): Promise<boolean> {
  if (!email) return true;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

// Regex: At least 3 letters, max 32. Followed by a hashtag of numbers in the real of 0-9.
// Hashtag number needs to be 4 numbers long.
export async function validateDiscordName(
  discordName: string,
): Promise<boolean> {
  if (!discordName) return true;
  return /^.{3,32}#[0-9]{4}$/i.test(discordName);
}

export async function emitBalanceChanged(user: ContextUser) {
  const balance = await getUserBalance(user.publicAddress);
  // Update redis balance data and get actual balance
  const currentBalance = await redisService.processBalance(balance, user.id);

  pubsub.publish(BALANCE_CHANGED, {
    balanceChanged: {
      id: user.id,
      balance: currentBalance,
    },
  });
}

export async function sendEmailVerification(
  userId: string,
  email: string,
  hashStrWithExpiration: string,
) {
  const apiInstance = new SibApiV3Sdk.ContactsApi();

  apiInstance.setApiKey(
    SibApiV3Sdk.ContactsApiApiKeys.apiKey,
    process.env.EMAIL_API_KEY,
  );

  const createDoiContact = new SibApiV3Sdk.CreateDoiContact(); // CreateDoiContact | Values to create the Double opt-in (DOI) contact

  createDoiContact.email = email;
  createDoiContact.includeListIds = EMAIL_LIST_IDS;
  createDoiContact.templateId = Number(EMAIL_TEMPLATE_ID);
  createDoiContact.redirectionUrl = `${process.env.ZIGNALY_API}?confirm=${hashStrWithExpiration}`;

  try {
    const response = await apiInstance.createDoiContact(createDoiContact);
    return response;
  } catch (error) {
    console.error('Send email', error.message);
  }
}

export async function isEmailConfirmed(email: string) {
  const apiInstance = new SibApiV3Sdk.ContactsApi();

  apiInstance.setApiKey(
    SibApiV3Sdk.ContactsApiApiKeys.apiKey,
    process.env.EMAIL_API_KEY,
  );

  try {
    const { body } = await apiInstance.getContactInfo(email);
    const hasOptedIn = body.attributes['DOUBLE_OPT-IN'] === '1';
    return hasOptedIn;
  } catch (error) {
    console.error('confirm email', error, error.message);
  }
}

export async function deleteContact(email: string) {
  const apiInstance = new SibApiV3Sdk.ContactsApi();

  apiInstance.setApiKey(
    SibApiV3Sdk.ContactsApiApiKeys.apiKey,
    process.env.EMAIL_API_KEY,
  );

  try {
    const { body } = await apiInstance.getContactInfo(email);
    const contactEmail = body ? body.email : null;
    if (contactEmail) {
      await apiInstance.deleteContact(email);
      return true;
    }
  } catch (error) {
    console.log('error deleting contact', email);
  }
}

export const generateJwtToken = (
  userId: number,
  email: string,
  secret: string,
) => {
  const user: TokenPayload = {
    userId,
    email,
  };

  return jwt.sign(user, secret, {
    expiresIn: HASH_EXPIRATION,
  });
};

export const verifyJwtToken = (token: string) => {
  try {
    const decodedPayload = jwt.verify(token, process.env.HASH_SECRET, {
      algorithms: ['HS256'],
      clockTimestamp: Math.floor(Date.now() / 1000),
    }) as TokenPayload;
    const { userId, email } = decodedPayload;
    return {
      userId,
      email,
    };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log('Token has expired');
    } else {
      console.log('Error verifying token:', err);
    }
  }
};
