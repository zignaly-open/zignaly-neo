import { Auction, AuctionBid } from './model';
import BN from 'bignumber.js';
import { AuctionBidType, AuctionType } from '@zigraffle/shared/types';
import { getUserBalance } from '../transactions/util';

export function getMinRequiredBidForAuction(
  auction: Auction | AuctionType,
  lastBid: AuctionBid | AuctionBidType,
): string {
  if (lastBid) {
    return new BN(lastBid.value).plus(new BN(auction.bidStep)).toString();
  } else {
    return auction.startingBid;
  }
}

export function isBalanceSufficientForPayment(
  payment: string,
  balance: string,
): boolean {
  return new BN(payment).lte(new BN(balance));
}

export async function verifyPositiveBalance(userId: number) {
  if (+(await getUserBalance(userId)) < 0) {
    // this means our cowboy somehow managed to become the fastest head on the west
    // noinspection ExceptionCaughtLocallyJS
    throw new Error('Ne tak bistro, pidor');
  }
}
