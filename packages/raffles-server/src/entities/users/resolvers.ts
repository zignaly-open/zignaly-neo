import { User } from './model';
import {
  authenticateSignature,
  validateDiscordName,
  validateUsername,
} from './util';
import { ApolloContext } from '../../types';
import fetch from 'node-fetch';
import crypto from 'node:crypto';
import {
  zignalyAPI,
  zignalyAPIPrivateKey,
  zignalyAPIPublicKey,
} from '../../../config';
import { randomHex } from 'web3-utils';

const generateNonceSignMessage = (nonce: string | number) =>
  `Please sign this message to verify it's you: ${nonce}`;

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;
      return await User.findByPk(user.id);
    },
    balance: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;

      try {
        const rdmString = randomHex(4).slice(2);
        const timestamp = +new Date();
        const str = `p=POST_BODY&s=${rdmString}&secret=${zignalyAPIPrivateKey}&t=${timestamp}`;
        const checksum = crypto.createHash('sha256').update(str).digest('hex');

        const response = await fetch(
          `${zignalyAPI}/balance/all/${user.publicAddress}?s=${rdmString}&t=${timestamp}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CODE': zignalyAPIPublicKey,
              'X-CHECKSUM': checksum,
            },
          },
        );
        return await response.json();
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
      { username, discordName }: { username: string; discordName: string },
      { user }: ApolloContext,
    ) => {
      if (!user) return null;
      const userInstance = await User.findByPk(user.id);
      const usernameValid = await validateUsername(username, user.id);
      const discordNameValid = await validateDiscordName(discordName);
      if (!usernameValid && !discordNameValid) return null;
      if (usernameValid) userInstance.username = username;
      if (discordNameValid) userInstance.discordName = discordName;
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
};
