import { User } from './model';
import {
  authenticateSignature,
  validateDiscordName,
  validateEmail,
  validateUsername,
} from './util';
import { ApolloContext, ContextUser } from '../../types';
import { getUserBalance } from '../../cybavo';
import pubsub from '../../pubsub';
import { BALANCE_CHANGED } from './constants';
import { withFilter } from 'graphql-subscriptions';
import { getUserIdFromToken } from '../../util/jwt';
import redisService from '../../redisService';

const generateNonceSignMessage = (nonce: string | number) =>
  `Please sign this message to verify it's you: ${nonce}`;

export async function getUserBalanceObject(
  user: ContextUser,
): Promise<{ id: number; balance: string }> {
  const balance = await getUserBalance(user.publicAddress);
  const currentBalance = await redisService.processBalance(balance, user.id);
  return {
    id: user.id,
    balance: currentBalance,
  };
}

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;
      return await User.findByPk(user.id);
    },
    balance: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;

      try {
        return await getUserBalanceObject(user);
      } catch (e) {
        return null;
      }
    },
    checkUsername: async (
      _: any,
      { username }: { username: string },
      { user }: ApolloContext,
    ) => {
      if (!user) return null;
      return await validateUsername(username, user.id);
    },
  },
  Mutation: {
    authenticate: async (
      _: any,
      {
        publicAddress,
        signature,
      }: { signature: string; publicAddress: string },
    ) => {
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
    },

    completeOnboarding: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;
      const userInstance = await User.findByPk(user.id);
      if (!userInstance) return null;
      userInstance.onboardingCompletedAt = new Date();
      await userInstance.save();
      return userInstance.toJSON();
    },

    updateProfile: async (
      _: any,
      {
        username,
        discordName,
        email,
      }: { username: string; discordName: string; email: string },
      { user }: ApolloContext,
    ) => {
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
    },

    getOrCreateUser: async (
      _: any,
      { publicAddress }: { publicAddress: string },
    ) => {
      if (!publicAddress) return null;

      try {
        let user: User | null = await User.findOne({
          where: { publicAddress },
        });
        if (!user) {
          user = await User.create({ publicAddress });
        }

        return {
          ...user.toJSON(),
          messageToSign: generateNonceSignMessage(user.nonce),
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    },
  },
  Subscription: {
    balanceChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([BALANCE_CHANGED]),
        (payload, variables) =>
          getUserIdFromToken(variables.token) === payload.balanceChanged.id,
      ),
    },
  },
};
