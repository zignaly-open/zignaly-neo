import React from 'react';
import { AuctionType } from '@zignaly/raffles-shared/types';
import AuctionCardComponent from './AuctionCard';

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  return <AuctionCardComponent auction={auction} />;
};

export default AuctionCard;
