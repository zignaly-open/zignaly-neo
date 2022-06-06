import { AuctionType } from '../../../../types/src/Auction';

export function getMinBid(auction: AuctionType): number {
  return +(auction.bids?.[0]?.value || auction.startingBid);
}
