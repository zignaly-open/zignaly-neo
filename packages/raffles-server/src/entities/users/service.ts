import { WalletType } from '@zignaly-open/raffles-shared/types';
import { withFilter } from 'graphql-subscriptions';
import { Op } from 'sequelize';
import { getUserBalance } from '../../cybavo';
import pubsub from '../../pubsub';
import redisService from '../../redisService';
import { ContextUser, ResourceOptions } from '../../types';
import { checkAdmin } from '../../util/admin';
import { getUserIdFromToken } from '../../util/jwt';
import { BALANCE_CHANGED } from './constants';
import { User } from './model';
import {
  authenticateSignature,
  validateDiscordName,
  validateEmail,
  validateUsername,
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
    userInstance.discordName = discordName;
    await userInstance.save();
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

  return {
    me,
    balance,
    checkUsername,
    getAll,
    count,
    authenticate,
    updateProfile,
    getOrCreateUser,
  };
};
