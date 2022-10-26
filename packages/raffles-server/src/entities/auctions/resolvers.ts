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
const debounceBroadcastAuction = debounce(broadcastAuctionChange, 50);

export const resolvers = {
  Query: {
    Auction: async (
      _: any,
      { id }: { id: number },
      { user }: ApolloContext,
    ) => {
      //  todo: call getAuctionsWithBids
      await checkAdmin(user?.id);
      return Auction.findByPk(id);
    },
    allAuctions: async (
      _: any,
      data: ResourceOptions,
      { user }: ApolloContext,
    ) => {
      return await AuctionsService.getAuctionsWithBids(
        null,
        user,
        data.sortField,
        data.sortOrder,
        data.page,
        data.perPage,
        data.filter,
      );
    },
    _allAuctionsMeta: async (
      _: any,
      {
        filter,
      }: {
        filter: ResourceOptions['filter'];
      },
      { user }: ApolloContext,
    ) => {
      return AuctionsService.countAuctions(user, filter);
    },
  },
  Mutation: {
    updateAuction: async (
      _: any,
      data: Partial<Auction>,
      { user }: ApolloContext,
    ) => {
      try {
        return AuctionsService.updateAuction(user, data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    createAuction: async (
      _: any,
      data: Partial<Auction>,
      { user }: ApolloContext,
    ) => {
      try {
        return AuctionsService.createAuction(user, data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    bid: async (_: any, { id }: { id: number }, { user }: ApolloContext) => {
      if (!user) {
        throw new Error('User not found');
      }
      try {
        const balance = await redisService.bid(user.id, id);

        if (!isTest) {
          debounceBroadcastAuction(id);
        }

        pubsub.publish(BALANCE_CHANGED, {
          balanceChanged: {
            id: user.id,
            balance,
          },
        });

        return 'ok';
      } catch (e) {
        if (!isTest) {
          console.error(e);
        }
        throw e;
      }
    },
    claim: async (_: any, { id }: { id: number }, { user }: ApolloContext) => {
      if (!user) {
        throw new Error('User not found');
      }
      const [auction] = await AuctionsService.getAuctionsWithBids(id, user);

      if (!auction.isFinalized) throw new Error('Auction not finalized');
      if (auction.maxClaimDate && +new Date(auction.maxClaimDate) < Date.now())
        throw new Error('Can not claim after the max claim date');

      const userBid = auction.bids
        .filter((b) => b.position <= auction.numberOfWinners)
        .find((b) => b.user.id === user.id);
      if (!userBid) {
        throw new Error('Can not find the bid');
      }

      if (userBid.claimTransactionId) {
        throw new Error('Already claimed');
      }

      if (
        !isBalanceSufficientForPayment(
          auction.currentBid,
          await getUserBalance(user.publicAddress),
        )
      ) {
        throw new Error('Insufficient funds');
      }

      try {
        await internalTransfer(
          user.publicAddress,
          zignalySystemId,
          auction.currentBid,
          TransactionType.Payout,
          false,
        ).then((tx) => {
          if (!tx.transaction_id) throw new Error('Transaction error');
          userBid.claimTransactionId = tx.transaction_id;
        });

        (userBid as AuctionBid).save();
      } catch (error) {
        throw new Error('Could not transfer');
      }

      await Payout.create({
        auctionId: id,
        userId: user.id,
        publicAddress: user.publicAddress,
      });

      emitBalanceChanged(user);

      return { id: auction.id, isClaimed: true };
    },
  },
  Subscription: {
    auctionUpdated: {
      subscribe: () => pubsub.asyncIterator([AUCTION_UPDATED]),
    },
  },
};
