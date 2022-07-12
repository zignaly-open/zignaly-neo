import { Auction, AuctionBid } from './model';
import BN from 'bignumber.js';
import { AuctionBidType, AuctionType } from '@zigraffle/shared/types';

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

export function isBalanceSufficientForBid(
  fee: string,
  balance: string,
): boolean {
  return new BN(fee).lte(new BN(balance));
}
