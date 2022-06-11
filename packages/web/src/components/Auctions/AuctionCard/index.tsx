import React from 'react';
import { AuctionType } from '@zigraffle/shared/types';
import AuctionCardComponent from './AuctionCard';
import useCurrentUser from '../../../hooks/useCurrentUser';

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  const { user: currentUser } = useCurrentUser();
  return (
    <AuctionCardComponent auction={auction} currentUserId={currentUser?.id} />
  );
};

export default AuctionCard;
