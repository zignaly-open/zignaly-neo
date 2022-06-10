import { useMutation } from '@apollo/client';
import React from 'react';
import { AuctionType } from '@zigraffle/shared/types';
import { BID_AUCTION } from '../queries';
import AuctionCardComponent from './AuctionCard';
import { getMinBid } from '../util';
import useCurrentUser from '../../../hooks/useCurrentUser';

// states
// - winning
// - winning
// - inactive
// - generic
// - outbid

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  const [bid, { loading: isBidding }] = useMutation(BID_AUCTION);
  const { user: currentUser, loading: isGettingUserInfo } = useCurrentUser();
  return (
    <AuctionCardComponent
      auction={auction}
      currentUserId={currentUser?.id}
      isPerformingAction={isBidding || isGettingUserInfo}
      onBid={() => {
        currentUser?.id
          ? bid({
              variables: {
                id: auction.id,
                // TODO
                value: getMinBid(auction) + 1,
              },
            }).catch((e) => {
              // TODO: better alerts
              alert(e.toString());
            })
          : alert('Not logged in');
      }}
    />
  );
};

export default AuctionCard;
