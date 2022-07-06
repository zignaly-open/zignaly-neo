import { Alert, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useMemo, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { AuctionType } from '@zigraffle/shared/types';
import AuctionCard from '../AuctionCard';
import { BIDS_SUBSCRIPTION, GET_AUCTIONS } from '../queries';
import Loader from '../../common/Loader';
import { getWinningLosingStatus } from '../AuctionCard/util';
import { Select } from 'zignaly-ui';

const MasonryWrapper = styled(Box)`
  max-width: 1280px;
  margin: 30px auto;
`;

const StyledMasonry = styled(Masonry)`
  margin: 0;
`;

const StyledSelect = styled(Select)`
  min-width: 150px;

  > div {
    text-align: left;
  }
`;

enum SortDirection {
  Expiry = 'expiry',
  Bid = 'bid',
  LastBid = 'last-bid',
}

enum ShowOptions {
  All = 'all',
  Active = 'active',
  Yours = 'yours',
}

const AuctionGrid: React.FC = () => {
  const { t } = useTranslation('auction');
  const { loading, error, data } = useQuery(GET_AUCTIONS);
  const [selectedSort, setSelectedSort] = useState(SortDirection.Expiry);
  const [selectedShowMode, setSelectedShowMode] = useState(ShowOptions.All);
  useSubscription(BIDS_SUBSCRIPTION);
  const sortOptions = useMemo(
    () => [
      { caption: t('sort-by-expiry'), value: SortDirection.Expiry },
      {
        caption: t('sort-by-last-bid'),
        value: SortDirection.LastBid,
      },
      { caption: t('sort-by-bid'), value: SortDirection.Bid },
    ],
    [],
  );

  const showOptions = useMemo(
    () => [
      { caption: t('show-all'), value: ShowOptions.All },
      { caption: t('show-active'), value: ShowOptions.Active },
      { caption: t('show-yours'), value: ShowOptions.Yours },
    ],
    [],
  );

  const filtered = useMemo(() => {
    return data?.auctions
      ?.filter((x: AuctionType) => {
        const { isActive, isUserActive } = getWinningLosingStatus(x);
        switch (selectedShowMode) {
          case ShowOptions.Yours:
            return isUserActive;
          case ShowOptions.Active:
            return isActive;
          case ShowOptions.All:
            return true;
        }
      })
      .sort((a: AuctionType, b: AuctionType) => {
        switch (selectedSort) {
          case SortDirection.LastBid:
            return -(+a.bids[0]?.id || 0) + (+b.bids[0]?.id || 0);
          case SortDirection.Bid:
            console.log(-(+a.bids[0]?.value || 0), a, b.bids[0]?.value, b);
            return -(+a.bids[0]?.value || 0) + (+b.bids[0]?.value || 0);
          case SortDirection.Expiry:
            return +new Date(a.expiresAt) - +new Date(b.expiresAt);
        }
      });
  }, [data?.auctions, selectedSort, selectedShowMode]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert severity='error'>Error! {error.message}</Alert>;
  }

  if (!data?.auctions?.length) {
    return <Alert severity='warning'>{t('no-auctions')}</Alert>;
  }

  return (
    <MasonryWrapper>
      <Box padding={2}>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item textAlign='right'>
            <StyledSelect
              options={showOptions}
              value={showOptions.find((o) => o.value === selectedShowMode)}
              onChange={(option) => setSelectedShowMode(option.value)}
              fullWidth={false}
              label={t('show')}
            />
          </Grid>
          <Grid item>
            <StyledSelect
              options={sortOptions}
              value={sortOptions.find((o) => o.value === selectedSort)}
              onChange={(option) => setSelectedSort(option.value)}
              fullWidth={false}
              label={t('sort')}
            />
          </Grid>
        </Grid>
      </Box>
      <StyledMasonry columns={{ xs: 1, sm: 1, md: 2 }} spacing={4}>
        {filtered.map((x: AuctionType) => (
          <AuctionCard key={x.id} auction={x} />
        ))}
      </StyledMasonry>
    </MasonryWrapper>
  );
};

export default AuctionGrid;
