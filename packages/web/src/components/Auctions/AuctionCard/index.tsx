import { useMutation } from '@apollo/client';
import React from 'react';
import { AuctionType } from '@zigraffle/shared/types';
import { BID_AUCTION } from '../queries';
import AuctionCardComponent from './AuctionCard';
import useCurrentUser from '../../../hooks/useCurrentUser';

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
      onBid={(amount) => {
        currentUser?.id
          ? bid({
              variables: {
                id: auction.id,
                value: amount,
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
