import { WalletType } from '@zignaly-open/raffles-shared/types';
import { withFilter } from 'graphql-subscriptions';
import { Op } from 'sequelize';
import { getUserBalance, deposit } from '../balances/service';
import { broadcastBalanceChange } from '../auctions/service';
import pubsub from '../../pubsub';
import redisService from '../../redisService';
import { ContextUser, ResourceOptions, TransactionType } from '../../types';
import { checkAdmin } from '../../util/admin';
import { getUserIdFromToken } from '../../util/jwt';
import { BALANCE_CHANGED, EMAIL_REWARD, EMAIL_CHANGED } from './constants';
import { User } from './model';
import {
  authenticateSignature,
  validateDiscordName,
  validateEmail,
  validateUsername,
  sendEmailVerification,
  isEmailConfirmed,
  deleteContact,
  generateJwtToken,
  verifyJwtToken,
} from './util';

const generateNonceSignMessage = (nonce: string | number) =>
  `Please sign this message to verify it's you: ${nonce}`;

export const getUserBalanceObject = async (
  user: ContextUser,
): Promise<{ id: number; balance: string }> => {
  const balance = await getUserBalance(user.publicAddress);
  const currentBalance = await redisService.processBalance(balance, user.id);
  return {
    id: user.id,
    balance: currentBalance,
  };
};

export const subscribeEmailChanged = withFilter(
  () => pubsub.asyncIterator([EMAIL_CHANGED]),
  (payload, variables) =>
    getUserIdFromToken(variables.token) === payload.emailChanged.id,
);

export const subscribeBalanceChanged = withFilter(
  () => pubsub.asyncIterator([BALANCE_CHANGED]),
  (payload, variables) =>
    getUserIdFromToken(variables.token) === payload.balanceChanged.id,
);

const userFilter = (filter: ResourceOptions['filter'] = {}) => {
  const { q, ...restFilter } = filter;
  return {
    ...restFilter,
    ...(q && {
      [Op.or]: [
        { id: isNaN(parseInt(q.toString())) ? null : q },
        { username: { [Op.iLike]: `%${q}%` } },
        { discordName: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } },
      ],
    }),
  };
};

export const generateService = (user: ContextUser) => {
  const me = async () => {
    if (!user) return null;
    return User.findByPk(user.id);
  };

  const balance = async () => {
    if (!user) return null;
    return getUserBalanceObject(user);
  };

  const checkUsername = async (username: string) => {
    if (!user) return null;
    return validateUsername(username, user.id);
  };

  const getAll = async ({
    sortField = 'id',
    sortOrder = 'desc',
    page = 0,
    perPage = 25,
    filter,
  }: ResourceOptions) => {
    checkAdmin(user);

    return User.findAll({
      where: userFilter(filter),
      order: [[sortField, sortOrder]],
      limit: perPage,
      offset: page * perPage,
    });
  };

  const count = async ({ filter }: ResourceOptions) => {
    checkAdmin(user);

    const count = await User.count({
      where: userFilter(filter),
    });
    return { count };
  };

  const authenticate = async ({
    publicAddress,
    signature,
  }: {
    signature: string;
    publicAddress: string;
  }) => {
    try {
      const accessToken = authenticateSignature(
        signature,
        publicAddress,
        generateNonceSignMessage,
      );
      return { accessToken };
    } catch (e) {
      return null;
    }
  };

  const rewardUser = async (user: User) => {
    if (user.zhitRewarded) {
      return;
    }
    await deposit({
      walletAddress: user.publicAddress,
      amount: EMAIL_REWARD,
      blockchain: '',
      note: '',
      transactionType: TransactionType.Reward,
    });
  };

  const broadcastEmailChange = async (userId: number) => {
    const user = await User.findByPk(userId);
    pubsub.publish(EMAIL_CHANGED, {
      emailChanged: {
        id: user.id,
        emailVerified: user.emailVerified,
        emailVerificationSent: user.emailVerificationSent,
        zhitRewared: user.zhitRewarded,
      },
    });
  };

  const updateProfile = async ({
    username,
    discordName,
    email,
  }: {
    username: string;
    discordName: string;
    email: string;
  }) => {
    if (!user) return null;
    const userInstance = await User.findByPk(user.id);
    const usernameValid = await validateUsername(username, user.id);
    if (typeof usernameValid === 'string') {
      throw new Error(usernameValid);
    }
    const emailValid = await validateEmail(email);
    const discordNameValid = await validateDiscordName(discordName);

    if (!usernameValid || !emailValid || !discordNameValid) {
      throw new Error('Invalid data');
    }

    userInstance.username = username;
    userInstance.email = email;
    if (!emailValid) {
      userInstance.emailVerified = false;
    }
    if (userInstance.email !== email) {
      userInstance.emailVerified = false;
    }
    userInstance.discordName = discordName;
    await userInstance.save();
    await redisService.updateRedisUsernameCache(user.id);
    await broadcastEmailChange(user.id);
    return userInstance.toJSON();
  };

  const getOrCreateUser = async ({
    walletType,
    publicAddress,
  }: {
    walletType: WalletType;
    publicAddress: string;
  }) => {
    if (!publicAddress) return null;

    try {
      let user: User | null = await User.findOne({
        where: { publicAddress },
      });
      if (!user) {
        user = await User.create({ walletType, publicAddress });
      }

      return {
        ...user.toJSON(),
        messageToSign: generateNonceSignMessage(user.nonce),
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const confirmEmail = async (hashStr: string) => {
    try {
      const { userId, email } = await verifyJwtToken(hashStr);
      const user = await User.findByPk(userId);

      if (user.emailVerified) {
        return true;
      }

      if (userId) {
        if (await isEmailConfirmed(email)) {
          await User.update(
            {
              emailVerified: true,
            },
            {
              where: {
                id: userId,
              },
            },
          );

          if (!user.zhitRewarded) {
            await rewardUser(user);
            await User.update(
              {
                zhitRewarded: true,
              },
              {
                where: {
                  id: user.id,
                },
              },
            );
          }
          const balance = await getUserBalance(user.publicAddress);
          await broadcastBalanceChange(balance, user);
          if (user.previousEmail) {
            await deleteContact(user.previousEmail);
          }
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      console.error('Error Confirming Email:', e.message);
      return false;
    }
  };

  const verifyEmail = async (userId: number, email: string) => {
    try {
      const user = await User.findByPk(userId);
      const hashWithExpiration = generateJwtToken(
        userId,
        email,
        process.env.HASH_SECRET,
      );
      await sendEmailVerification(`${userId}`, email, hashWithExpiration);
      User.update(
        {
          emailValidationHash: hashWithExpiration,
          emailVerificationSent: true,
          emailVerified: false,
          email: email,
          previousEmail: user.email,
        },
        {
          where: {
            id: userId,
          },
        },
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return {
    me,
    balance,
    checkUsername,
    getAll,
    count,
    authenticate,
    updateProfile,
    getOrCreateUser,
    verifyEmail,
    confirmEmail,
  };
};
