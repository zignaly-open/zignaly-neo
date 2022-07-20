import { User } from './model';
import { authenticateSignature, validateUsername } from './util';
import { ApolloContext } from '../../types';

const generateNonceSignMessage = (nonce: string | number) =>
  `Please sign this message to verify it's you: ${nonce}`;

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;
      return await User.findByPk(user.id);
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
      const discordNameValid = await validateUsername(discordName, user.id);
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
