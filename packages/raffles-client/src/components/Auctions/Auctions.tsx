import React from 'react';
import AuctionGrid from './AuctionGrid/AuctionGrid';
import { AuctionContainer } from './styles';
import HowItWorks from './HowItWorks';

function Auctions() {
  return (
    <>
      <AuctionContainer>
        <HowItWorks />
      </AuctionContainer>
      <AuctionGrid />
    </>
  );
}

export default Auctions;
