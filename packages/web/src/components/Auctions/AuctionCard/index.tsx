import { useMutation } from '@apollo/client';
import React from 'react';
import { AuctionType } from '../../../../../types/src/Auction';
import { BID_AUCTION } from '../queries';
import AuctionCardComponent from './AuctionCard';

// states
// - winning
// - winning
// - inactive
// - generic
// - outbid

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  const [bid] = useMutation(BID_AUCTION);

  return (
    <AuctionCardComponent
      auction={auction}
      onBid={() =>
        bid({
          variables: {
            id: auction.id,
            value: (auction.lastBid?.value || 0) + 1,
          },
        })
      }
    />
  );
};

export default AuctionCard;
