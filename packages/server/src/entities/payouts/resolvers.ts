import { ApolloContext } from '../../types';
import { Payout } from './model';
import { Auction } from '../auctions/model';

export const resolvers = {
  Query: {
    payouts: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;
      return await Payout.findAll({
        where: {
          userId: user.id,
        },
        include: Auction,
        order: [['id', 'DESC']],
      });
    },
  },
};
