import React from 'react';
import AuctionGrid from './AuctionGrid/AuctionGrid';
import { AuctionContainer } from './styles';
import HowItWorks from './HowItWorks';
import VerifyReward from './VeifyReward';

function Auctions() {
  return (
    <>
      <AuctionContainer>
        <VerifyReward />
        <HowItWorks />
      </AuctionContainer>
      <AuctionGrid />
    </>
  );
}

export default Auctions;
