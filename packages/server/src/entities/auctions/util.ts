import { Auction, AuctionBid } from './model';
import { BN } from 'ethereumjs-util';

export function getMinRequiredBidForAuction(
  auction: Auction,
  lastBid: AuctionBid,
): string {
  if (lastBid) {
    return new BN(lastBid.value).add(new BN(auction.bidStep)).toString();
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
