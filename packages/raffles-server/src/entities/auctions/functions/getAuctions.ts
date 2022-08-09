import {
  AuctionBidType,
  AuctionType,
} from '@zignaly-open/raffles-shared/types';
import { ContextUser } from '../../../types';
import { Auction, AuctionBasketItem } from '../model';
import { getMinRequiredBidForAuction } from '../util';
import getSortedAuctionBids from './getSortedAuctionBids';

async function getAuctions(
  id: number,
  user: ContextUser,
  showAllBids?: boolean,
) {
  const bids = await getSortedAuctionBids(id, showAllBids, user);
  const auctions = (await Auction.findAll({
    where: { ...(id ? { id } : {}) },
    include: [AuctionBasketItem],
  })) as unknown as AuctionType[];

  auctions.forEach((x) => {
    // here we will match auctions and bids
    x.bids = bids.filter((b: AuctionBidType) => x.id === b.auctionId);
    x.userBid = x.bids.find((b) => b.user.id === user?.id);
    x.minimalBid = getMinRequiredBidForAuction(x, x.bids[0]);
  });

  return auctions;
}
export default getAuctions;
