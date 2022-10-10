import { Auction } from './model';
import BN from 'bignumber.js';
import { AuctionType } from '@zignaly-open/raffles-shared/types';

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
