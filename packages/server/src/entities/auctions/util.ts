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

export function isBidSufficientForAuction(
  bid: string,
  auction: Auction,
  lastBid: AuctionBid,
): boolean {
  return new BN(bid).gte(new BN(getMinRequiredBidForAuction(auction, lastBid)));
}

export function isBalanceSufficientForBid(
  bid: string,
  fee: string,
  balance: string,
): boolean {
  return new BN(bid).add(new BN(fee)).lte(new BN(balance));
}

export async function unfreezeLoserFunds() {
  // once the bid is updated, we need to unfreeze funds of people who were outbid
  // TODO unfreeze not frozen
}
