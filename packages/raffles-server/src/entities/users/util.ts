import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { algorithm, secret } from '../../../config';
import { generateUserNonce, User } from './model';
import jwt from 'jsonwebtoken';
import { BALANCE_CHANGED } from './constants';
import { getUserBalance } from '../../cybavo';
import { ContextUser } from '../../types';
import pubsub from '../../pubsub';

export function signJwtToken(user: User) {
  return new Promise<string>((resolve, reject) =>
    // https://github.com/auth0/node-jsonwebtoken
    jwt.sign(
      {
        payload: {
          id: user.id,
          publicAddress: user.publicAddress,
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
  pubsub.publish(BALANCE_CHANGED, {
    balanceChanged: {
      id: user.id,
      balance: await getUserBalance(user.publicAddress),
    },
  });
}
