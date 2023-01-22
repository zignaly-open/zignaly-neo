import {
  AuctionBidType,
  AuctionType,
} from '@zignaly-open/raffles-shared/types';
import BN from 'bignumber.js';

export const extendAuctionListWithNewBid = (
  auctions: AuctionType[],
  bidMade: { auctionId: number; user: AuctionBidType['user'] },
): AuctionType[] => {
  return auctions.map((x: AuctionType) => {
    if (x.id === bidMade?.auctionId) {
      return {
        ...x,
        currentBid: new BN(x.currentBid).plus(new BN(x.bidStep)).toString(),
        // add bid to the bids list and maybe check for dates
      };
    } else {
      return x;
    }
  });
};
