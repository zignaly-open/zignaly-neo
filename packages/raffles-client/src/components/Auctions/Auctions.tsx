import React from 'react';
import AuctionGrid from './AuctionGrid/AuctionGrid';
import { useTranslation } from 'react-i18next';
import { AuctionContainer, HomeTitle } from './styles';
import HowItWorks from './HowItWorks';

function Auctions() {
  const { t } = useTranslation('global');

  return (
    <>
      <AuctionContainer>
        <HomeTitle variant='h1' color='neutral000'>
          {t('auction')}
        </HomeTitle>
        <HowItWorks />
      </AuctionContainer>
      <AuctionGrid />
    </>
  );
}

export default Auctions;
