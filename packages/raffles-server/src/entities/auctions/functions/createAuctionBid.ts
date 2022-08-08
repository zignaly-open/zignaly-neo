import { zignalySystemId } from '../../../../config';
import { internalTransfer } from '../../../cybavo';
import { ContextUser, TransactionType } from '../../../types';
import { AUCTION_FEE } from '../constants';
import { Auction, AuctionBid } from '../model';
import { getMinRequiredBidForAuction, verifyPositiveBalance } from '../util';
import calculateNewExpiryDate from './calculateExpiryDate';

async function createAuctionBid(
  user: ContextUser,
  auction: Auction,
  id: number,
): Promise<void> {
  try {
    if (+new Date(auction.expiresAt) <= Date.now()) {
      throw new Error('Auction expired');
    }

    const txPromise = internalTransfer(
      user.publicAddress,
      zignalySystemId,
      AUCTION_FEE,
      TransactionType.Fee,
    );

    // better re-load from inside the transaction
    const lastAuctionBidPromise = AuctionBid.findOne({
      where: {
        auctionId: id,
      },
      order: [['id', 'DESC']],
    });

    const [tx, lastAuctionBid] = await Promise.all([
      txPromise,
      lastAuctionBidPromise,
    ]);

    if (!tx.transaction_id) throw new Error('Transaction error');

    auction.expiresAt = calculateNewExpiryDate(auction);

    await AuctionBid.create({
      auctionId: id,
      transactionId: tx.transaction_id,
      value: getMinRequiredBidForAuction(auction, lastAuctionBid),
      userId: user.id,
    });

    await auction.save();

    await verifyPositiveBalance(user.publicAddress);
  } catch (error) {
    console.error(error);
    throw new Error('Could not create a bid');
  }
}

export default createAuctionBid;
