import { User } from './model';
import { authenticateSignature } from './util';
import { ApolloContext } from '../../types';

const generateNonceSignMessage = (nonce: string | number) =>
  `Please sign this message to verify it's you: ${nonce}`;

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;
      return await User.findByPk(user.id);
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
