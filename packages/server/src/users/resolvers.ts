import { User } from './model';
import { authenticateSignature } from './util';

const generateNonceSignMessage = (nonce: string | number) =>
  `Please sign this message to verify it's you: ${nonce}`;

export const resolvers = {
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
