import {
  AuctionBidType,
  AuctionType,
} from '@zignaly-open/raffles-shared/types';
import BN from 'bignumber.js';

type BidSubscriptionData = { auctionId: number; user: AuctionBidType['user'] };

const fixBid = (bid: BidSubscriptionData): BidSubscriptionData => ({
  ...bid,
  user: {
    ...bid.user,
    id: +bid.user.id,
  },
});

export const extendAuctionListWithNewBid = (
  auctions: AuctionType[],
  bidMade: { auctionId: number; user: AuctionBidType['user'] },
): AuctionType[] => {
  const bid = fixBid(bidMade);
  return auctions.map((x: AuctionType) => {
    if (x.id === bid?.auctionId) {
      let { bids = [] } = x;
      const winningBid = bids[0];
      debugger;
      if (winningBid?.user?.id === bid.user.id) {
        // same user, do nothing
      } else {
        bids = [
          {
            position: 1,
            user: bid.user,
          },
          ...bids.map((b) => ({ ...b, position: b.position + 1 })),
        ];
      }
      return {
        ...x,
        currentBid: new BN(x.currentBid).plus(new BN(x.bidStep)).toString(),
        bids,
      };
    } else {
      return x;
    }
  });
};
