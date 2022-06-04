import { Alert } from '@mui/material';
import React from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { AuctionType } from '../../../../../types/src/Auction';
import AuctionCard from '../AuctionCard';
import { GET_AUCTIONS } from '../queries';

const AuctionGrid: React.FC = () => {
  const { t } = useTranslation('auction');
  const { loading, error, data } = useQuery(GET_AUCTIONS);

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity='error'>Error! {error.message}</Alert>;
  }

  if (!data?.auctions?.length) {
    return <Alert severity='warning'>{t('no-auctions')}</Alert>;
  }

  return (
    <>
      <Masonry columns={4} spacing={2}>
        {data.auctions.map((x: AuctionType) => (
          <AuctionCard key={x.id} auction={x} />
        ))}
      </Masonry>
    </>
  );
};

export default AuctionGrid;
