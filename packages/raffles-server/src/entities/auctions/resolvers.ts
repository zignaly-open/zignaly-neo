import pubsub from '../../pubsub';
import { AUCTION_UPDATED } from './constants';
import { ApolloContext, ResourceOptions } from '../../types';
import { Auction } from './model';

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
      data: Partial<Auction>,
      { services }: ApolloContext,
    ) => services.Auction.update(data),

    createAuction: async (
      _: any,
      data: Partial<Auction>,
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
