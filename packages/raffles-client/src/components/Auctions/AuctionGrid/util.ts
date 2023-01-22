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

const unshiftBid = (bids: AuctionBidType[], bid: BidSubscriptionData) => {
  const usersBidIndex = bids?.findIndex((b) => b.user.id === bid.user.id);
  const newBid = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    __typename: 'Bid',
    position: 1,
    user: bid.user,
  };
  return [
    newBid,
    ...bids.reduce((memo, b, i) => {
      const position =
        b.position + (usersBidIndex === -1 || i < usersBidIndex ? 1 : 0);
      if (i !== usersBidIndex) memo.push({ ...b, position });
      return memo;
    }, []),
  ];
};

export const extendAuctionListWithNewBid = (
  auctions: AuctionType[],
  bidMade: { auctionId: number; user: AuctionBidType['user'] },
): AuctionType[] => {
  const bid = fixBid(bidMade);
  return auctions?.map((x: AuctionType) => {
    if (x.id === bid?.auctionId) {
      let { bids = [] } = x;
      const winningBid = bids[0];
      if (+winningBid?.user?.id === +bid.user.id) {
        // same user, do nothing
      } else {
        bids = unshiftBid(bids, bid);
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
