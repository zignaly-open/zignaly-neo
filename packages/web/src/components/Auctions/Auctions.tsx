import React from 'react';
import AuctionGrid from './AuctionGrid/AuctionGrid';
import Box from '@mui/material/Box';
import { Typography } from 'zignaly-ui';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const HomeTitle = styled(Typography)`
  && {
    font-weight: 500;
    font-size: 26px;
    line-height: 40px;
  }
`;

function Auctions() {
  const { t } = useTranslation('global');

  return (
    <>
      <Box textAlign={'center'} marginTop='122px'>
        <HomeTitle variant='h1' color='neutral000'>
          ZIGRaffle
        </HomeTitle>
      </Box>
      <Box textAlign={'center'} marginBottom='70px'>
        <Typography color='neutral300'>{t('moto')}</Typography>
      </Box>
      <AuctionGrid />
    </>
  );
}

export default Auctions;
