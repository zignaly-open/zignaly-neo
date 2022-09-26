import { Auction } from './model';
import BN from 'bignumber.js';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import { getUserBalance } from '../../cybavo';

export function getMinRequiredBidForAuction(
  auction: Auction | AuctionType,
): string {
  return new BN(auction.currentBid).plus(new BN(auction.bidStep)).toString();
}

export function isBalanceSufficientForPayment(
  payment: string,
  balance: string,
): boolean {
  return new BN(payment).lte(new BN(balance));
}

export async function verifyPositiveBalance(address: string) {
  if (+(await getUserBalance(address)) < 0) {
    // this means our cowboy somehow managed to become the fastest head on the west
    // noinspection ExceptionCaughtLocallyJS
    throw new Error('Ne tak bistro, pidor');
  }
}
