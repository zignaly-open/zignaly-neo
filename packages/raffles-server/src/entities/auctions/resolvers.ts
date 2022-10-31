import pubsub from '../../pubsub';
import { AUCTION_UPDATED } from './constants';
import { ApolloContext, ResourceOptions, TransactionType } from '../../types';
import { isBalanceSufficientForPayment } from './util';
import { Payout } from '../payouts/model';
import { getUserBalance, internalTransfer } from '../../cybavo';
import { isTest, zignalySystemId } from '../../../config';
import { emitBalanceChanged } from '../users/util';
import AuctionsService from './service';
import redisService from '../../redisService';
import { BALANCE_CHANGED } from '../users/constants';
import { debounce } from 'lodash';
import { Auction, AuctionBid } from './model';
import { checkAdmin } from '../../util/admin';

const broadcastAuctionChange = async (auctionId: number) => {
  try {
    const [auctionUpdated] = await AuctionsService.getAuctionsWithBids(
      auctionId,
      true,
    );

    pubsub.publish(AUCTION_UPDATED, {
      auctionUpdated,
    });
  } catch (e) {
    console.error(e);
  }
};
const debounceBroadcastAuction = debounce(broadcastAuctionChange, 70, {
  maxWait: 160,
});

export const resolvers = {
  Query: {
    AdmAuction: async (
      _: any,
      { id }: { id: number },
      { services }: ApolloContext,
    ) => services.Auction.getById(id),

    allAuctions: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Auction.getAll(data),

    _allAuctionsMeta: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Auction.count(data),

    allAdmAuctions: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Auction.getAll(data, true),

    _allAdmAuctionsMeta: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Auction.count(data, true),
  },
  Mutation: {
    updateAuction: async (
      _: any,
      data: AuctionPayload,
      { services }: ApolloContext,
    ) => services.Auction.update(data),

    createAuction: async (
      _: any,
      data: AuctionPayload,
      { services }: ApolloContext,
    ) => services.Auction.create(data),

    deleteAuction: async (
      _: any,
      { id }: { id: number },
      { services }: ApolloContext,
    ) => services.Auction.delete(id),

    bid: async (_: any, { id }: { id: number }, { services }: ApolloContext) =>
      services.Auction.bid(id),

    claim: async (
      _: any,
      { id }: { id: number },
      { services }: ApolloContext,
    ) => services.Auction.claim(id),
  },
  Subscription: {
    auctionUpdated: {
      subscribe: () => pubsub.asyncIterator([AUCTION_UPDATED]),
    },
  },
};
