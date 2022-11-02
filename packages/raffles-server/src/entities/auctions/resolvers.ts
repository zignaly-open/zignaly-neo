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
    ) => services.Auctions.getById(id),
    allAuctions: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Auctions.getAll(data),
    _allAuctionsMeta: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Auctions.count(data),
    allAdmAuctions: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Auctions.getAll(data, true),
    _allAdmAuctionsMeta: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Auctions.count(data, true),
  },
  Mutation: {
    updateAuction: async (
      _: any,
      data: Partial<Auction>,
      { services }: ApolloContext,
    ) => services.Auctions.update(data),
    createAuction: async (
      _: any,
      data: Partial<Auction>,
      { services }: ApolloContext,
    ) => services.Auctions.create(data),
    deleteAuction: async (
      _: any,
      { id }: { id: number },
      { services }: ApolloContext,
    ) => services.Auctions.delete(id),
    bid: async (_: any, { id }: { id: number }, { services }: ApolloContext) =>
      services.Auctions.bid(id),
    claim: async (
      _: any,
      { id }: { id: number },
      { services }: ApolloContext,
    ) => services.Auctions.claim(id),
  },
  Subscription: {
    auctionUpdated: {
      subscribe: () => pubsub.asyncIterator([AUCTION_UPDATED]),
    },
  },
};
