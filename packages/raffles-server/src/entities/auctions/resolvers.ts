import pubsub from '../../pubsub';
import { AUCTION_UPDATED } from './constants';
import { Auction, AuctionBid, lastBidPopulation } from './model';
import { ApolloContext, TransactionType } from '../../types';
import { isBalanceSufficientForPayment, verifyPositiveBalance } from './util';
import { Payout } from '../payouts/model';
import performPayout from './functions/performPayout';
import { getUserBalance, internalTransfer } from '../../cybavo';
import { zignalySystemId } from '../../../config';
import { emitBalanceChanged } from '../users/util';
import findAuction from './functions/findAuction';
import createAuctionBid from './functions/createAuctionBid';
import getAuctions from './functions/getAuctions';
import getSortedAuctionBids from './functions/getSortedAuctionBids';

export const resolvers = {
  Query: {
    auctions: async (
      _: any,
      { id }: { id: number },
      { user }: ApolloContext,
    ) => {
      return getAuctions(id, user);
    },
  },
  Mutation: {
    bid: async (_: any, { id }: { id: number }, { user }: ApolloContext) => {
      if (!user) {
        throw new Error('User not found');
      }
      const auction = await findAuction(user, id);
      const createAuctionBidPromise = createAuctionBid(user, auction, id);
      const getAuctionsPromise = getAuctions(auction.id, user);
      const [, [updatedAuction]] = await Promise.all([
        createAuctionBidPromise,
        getAuctionsPromise,
      ]);

      console.log(updatedAuction);

      const subPromise = pubsub.publish(AUCTION_UPDATED, {
        auctionUpdated: updatedAuction,
      });
      const balanceChangedPromise = emitBalanceChanged(user);

      await Promise.all([subPromise, balanceChangedPromise]);
      return updatedAuction;
    },

    claim: async (_: any, { id }: { id: number }, { user }: ApolloContext) => {
      if (!user) {
        throw new Error('User not found');
      }
      const auction = await Auction.findByPk(id, {
        include: lastBidPopulation,
      });
      if (!auction) throw new Error('Auction not found');
      if (+new Date(auction.expiresAt) > Date.now())
        throw new Error('Auction not expired yet');
      if (auction.maxClaimDate && +new Date(auction.maxClaimDate) < Date.now())
        throw new Error('Can not claim after the max claim date');

      // here we SPECIFICALLY do not pass the current user to not receive current user's bid
      // TODO: maybe we should refactor it to make this more explicit
      const winningBids = await getSortedAuctionBids(id, false, undefined);
      const winningBidId = winningBids.find(
        (bid) => bid.user.id === user.id,
      )?.id;
      if (!winningBidId) throw new Error('Can not find the bid');
      const winningBid = await AuctionBid.findByPk(winningBidId);

      if (winningBid.claimTransactionId) {
        // cheeky bastard
        throw new Error('Already claimed');
      }

      if (
        !isBalanceSufficientForPayment(
          winningBid.value,
          await getUserBalance(user.publicAddress),
        )
      )
        throw new Error('Insufficient funds');

      try {
        const tx = await internalTransfer(
          user.publicAddress,
          zignalySystemId,
          winningBid.value,
          TransactionType.Payout,
        );

        if (!tx.transaction_id) throw new Error('Transaction error');

        winningBid.claimTransactionId = tx.transaction_id;
        await winningBid.save();
        await verifyPositiveBalance(user.publicAddress);
      } catch (error) {
        console.error(error);
        throw new Error('Could not make a claim');
      }

      const payout = await Payout.create({
        auctionId: id,
        userId: user.id,
        publicAddress: user.publicAddress,
      });

      await performPayout(payout);

      const [updatedAuction] = await getAuctions(auction.id, user);
      // no need to emit updated auctions here
      await emitBalanceChanged(user);
      return updatedAuction;
    },
  },
  Subscription: {
    auctionUpdated: {
      subscribe: () => pubsub.asyncIterator([AUCTION_UPDATED]),
    },
  },
};
