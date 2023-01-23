import React from 'react';
import { Alert, Box, Grid } from '@mui/material';
import { useQuery, useSubscription } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import Loader from '../../common/Loader';
import {
  AUCTION_UPDATED_SUBSCRIPTION,
  RANKING_UPDATED_SUBSCRIPTION,
  GET_AUCTIONS,
} from 'queries/auctions';
import AuctionCard from '../AuctionCard/AuctionCard';
import { LayoutContainer } from './styles';
import InfiniteScroll from 'react-infinite-scroller';

const PER_PAGE = 20;

const AuctionGrid: React.FC = () => {
  const { t } = useTranslation('auction');
  const { showUnannounced, privateCode } = Object.fromEntries(
    new URLSearchParams(location.search),
  );
  const { loading, error, data, fetchMore } = useQuery(GET_AUCTIONS, {
    variables: {
      perPage: PER_PAGE,
      filter: {
        unannounced: showUnannounced === 'true',
        privateCode,
      },
    },
  });

  useSubscription(RANKING_UPDATED_SUBSCRIPTION);
  useSubscription(AUCTION_UPDATED_SUBSCRIPTION);

  const onLoadMore = () => {
    fetchMore({
      variables: {
        page: data.items.length / PER_PAGE,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          items: [...prev.items, ...fetchMoreResult.items],
          total: fetchMoreResult.total,
        };
      },
    });
  };

  if (loading) {
    return (
      <Box my={10}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity='error'>
        {t('error')} {error.message}
      </Alert>
    );
  }

  if (!data?.items.length) {
    return <Alert severity='warning'>{t('no-auctions')}</Alert>;
  }

  return (
    <LayoutContainer>
      <InfiniteScroll
        loadMore={onLoadMore}
        hasMore={data.items.length < data.total.count}
        loader={
          <Box mt={6} key={0}>
            <Loader />
          </Box>
        }
      >
        <Grid justifyContent='center' container spacing={4}>
          {data.items.map((x: AuctionType) => (
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
      </InfiniteScroll>
    </LayoutContainer>
  );
};

export default AuctionGrid;
