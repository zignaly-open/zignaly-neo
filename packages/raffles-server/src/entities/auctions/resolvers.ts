import pubsub from '../../pubsub';
import { AUCTION_UPDATED } from './constants';
import { AuctionBid } from './model';
import { ApolloContext, TransactionType } from '../../types';
import { isBalanceSufficientForPayment, verifyPositiveBalance } from './util';
import { Payout } from '../payouts/model';
import { getUserBalance, internalTransfer } from '../../cybavo';
import { zignalySystemId } from '../../../config';
import { emitBalanceChanged } from '../users/util';
import AuctionsRepository from './repository';
import redisService from '../../redisService';
import { BALANCE_CHANGED } from '../users/constants';
import { debounce } from 'lodash';

const broadcastAuctionChange = async (auctionId: number) => {
  const [auctionUpdated] = await AuctionsRepository.getAuctions(
    auctionId,
    null,
    true,
  );

  pubsub.publish(AUCTION_UPDATED, {
    auctionUpdated,
  });
};
const debounceBroadcastAuction = debounce(broadcastAuctionChange, 100);

export const resolvers = {
  Query: {
    auctions: async (
      _: any,
      { id }: { id: number },
      { user }: ApolloContext,
    ) => {
      return AuctionsRepository.getAuctions(id, user, true);
    },
  },
  Mutation: {
    bid: async (_: any, { id }: { id: number }, { user }: ApolloContext) => {
      if (!user) {
        throw new Error('User not found');
      }
      const balance = await redisService.bid(user.id, id);

      debounceBroadcastAuction(id);

      pubsub.publish(BALANCE_CHANGED, {
        balanceChanged: {
          id: user.id,
          balance,
        },
      });

      return 'ok';
    },

    claim: async (_: any, { id }: { id: number }, { user }: ApolloContext) => {
      if (!user) {
        throw new Error('User not found');
      }
      const auction = await AuctionsRepository.findAuction(user, id).then(
        (auction) => {
          if (+new Date(auction.expiresAt) > Date.now())
            throw new Error('Auction not expired yet');
          if (
            auction.maxClaimDate &&
            +new Date(auction.maxClaimDate) < Date.now()
          )
            throw new Error('Can not claim after the max claim date');
          return auction;
        },
      );

      // here we SPECIFICALLY do not pass the current user to not receive current user's bid
      // TODO: maybe we should refactor it to make this more explicit
      const userWinningBidId = await AuctionsRepository.getSortedAuctionBids(
        id,
        false,
        undefined,
      ).then((winningBids) => {
        const userWinningBidId = winningBids.find(
          (bid) => bid.user.id === user.id,
        )?.id;
        if (!userWinningBidId) {
          throw new Error('Can not find the bid');
        }
        return userWinningBidId;
      });

      const userWinningBid = await AuctionBid.findByPk(userWinningBidId).then(
        async (winningBid) => {
          if (winningBid.claimTransactionId) {
            // cheeky bastard
            throw new Error('Already claimed');
          }
          if (
            !isBalanceSufficientForPayment(
              winningBid.value,
              await getUserBalance(user.publicAddress),
            )
          ) {
            throw new Error('Insufficient funds');
          }
          return winningBid;
        },
      );

      try {
        await internalTransfer(
          user.publicAddress,
          zignalySystemId,
          auction.currentBid,
          TransactionType.Payout,
        ).then((tx) => {
          if (!tx.transaction_id) throw new Error('Transaction error');
          userWinningBid.claimTransactionId = tx.transaction_id;
        });

        await Promise.all([
          userWinningBid.save(),
          verifyPositiveBalance(user.publicAddress),
        ]);
      } catch (error) {
        throw new Error('Could not make a claim');
      }

      await Payout.create({
        auctionId: id,
        userId: user.id,
        publicAddress: user.publicAddress,
      });

      const [updatedAuction] = await AuctionsRepository.getAuctions(
        auction.id,
        user,
      );
      emitBalanceChanged(user);

      return updatedAuction;
    },
  },
  Subscription: {
    auctionUpdated: {
      subscribe: () => pubsub.asyncIterator([AUCTION_UPDATED]),
    },
  },
};
