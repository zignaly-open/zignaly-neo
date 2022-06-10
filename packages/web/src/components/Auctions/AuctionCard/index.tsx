import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { AuctionType } from '@zigraffle/shared/types';
import { BID_AUCTION } from '../queries';
import AuctionCardComponent from './AuctionCard';
import { GET_CURRENT_USER } from '../../../hooks/useAuthenticate';
import { getMinBid } from '../util';

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
  const { data: currentUser, loading: isGettingUserInfo } =
    useQuery(GET_CURRENT_USER);
  return (
    <AuctionCardComponent
      auction={auction}
      currentUserId={currentUser?.me?.id}
      isPerformingAction={isBidding || isGettingUserInfo}
      onBid={() => {
        currentUser?.me?.id
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
