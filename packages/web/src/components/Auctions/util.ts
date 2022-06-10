import { AuctionType } from '@zigraffle/shared/types';

export function getMinBid(auction: AuctionType): number {
  return +(auction.bids?.[0]?.value || auction.startingBid);
}
