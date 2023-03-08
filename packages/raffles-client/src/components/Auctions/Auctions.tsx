import React from 'react';
import AuctionGrid from './AuctionGrid/AuctionGrid';
import { AuctionContainer } from './styles';
import HowItWorks from './HowItWorks';
import VerifyEmail from './VerifyEmail';
import ConfirmEmail from './ConfirmEmail';

function Auctions() {
  return (
    <>
      <AuctionContainer>
        <VerifyEmail />
        <ConfirmEmail />
        <HowItWorks />
      </AuctionContainer>
      <AuctionGrid />
    </>
  );
}

export default Auctions;
