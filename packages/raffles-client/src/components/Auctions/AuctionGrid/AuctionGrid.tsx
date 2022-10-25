import React from 'react';
import { Alert, Grid } from '@mui/material';
import { useQuery, useSubscription } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import Loader from '../../common/Loader';
import { BIDS_SUBSCRIPTION, GET_AUCTIONS } from 'queries/auctions';
import AuctionCard from '../AuctionCard/AuctionCard';
import { LayoutContainer } from './styles';

const AuctionGrid: React.FC = () => {
  const { t } = useTranslation('auction');
  const { showUnannounced, privateCode } = Object.fromEntries(
    new URLSearchParams(location.search),
  );
  const { loading, error, data } = useQuery(GET_AUCTIONS, {
    variables: {
      unannounced: showUnannounced === 'true',
      privateCode,
    },
  });

  useSubscription(BIDS_SUBSCRIPTION);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert severity='error'>
        {t('error')} {error.message}
      </Alert>
    );
  }

  if (!data?.auctions?.length) {
    return <Alert severity='warning'>{t('no-auctions')}</Alert>;
  }

  return (
    <LayoutContainer>
      <Grid justifyContent='center' container spacing={4}>
        {data.auctions.map((x: AuctionType) => (
          <Grid
            item
            key={x.id}
            xs={12}
            md={6}
            display='flex'
            justifyContent='center'
            mt='54px'
          >
            <AuctionCard auction={x} />
          </Grid>
        ))}
      </Grid>
    </LayoutContainer>
  );
};

export default AuctionGrid;
