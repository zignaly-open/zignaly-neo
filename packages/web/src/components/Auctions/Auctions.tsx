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
      <Box textAlign={'center'} marginBottom={1}>
        <HomeTitle variant='h1' color='neutral000'>
          ZIGRAFFLE
        </HomeTitle>
      </Box>
      <Box textAlign={'center'}>
        <Typography color='neutral300'>{t('moto')}</Typography>
      </Box>
      <AuctionGrid />
    </>
  );
}

export default Auctions;
