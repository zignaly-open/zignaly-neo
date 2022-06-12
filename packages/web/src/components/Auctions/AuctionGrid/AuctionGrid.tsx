import { Alert, Button, ButtonGroup, Grid } from '@mui/material';
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

const MasonryWrapper = styled(Box)`
  max-width: 1000px;
  margin: 30px auto;
`;
const StyledMasonry = styled(Masonry)`
  margin: 0;
`;

enum SortDirection {
  Expiry = 'expiry',
  Value = 'value',
  LastBid = 'last-bid',
  Yours = 'yours',
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
      { label: t('sort-by-expiry'), value: SortDirection.Expiry },
      // { label: t('sort-by-value'), value: SortDirection.Value },
      { label: t('sort-by-last-bid'), value: SortDirection.LastBid },
      { label: t('sort-by-yours'), value: SortDirection.Yours },
    ],
    [],
  );

  const showOptions = useMemo(
    () => [
      { label: t('show-all'), value: ShowOptions.All },
      { label: t('show-active'), value: ShowOptions.Active },
      { label: t('show-yours'), value: ShowOptions.Yours },
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
          case SortDirection.Yours:
            return (+b.userBid?.[0]?.id || 0) - (+a.userBid?.[0]?.id || 0);
          case SortDirection.LastBid:
            return -(+a.bids[0]?.id || 0) + (+b.bids[0]?.id || 0);
          case SortDirection.Value:
            return 0;
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
        <Grid container spacing={2}>
          <Grid item textAlign='left' sm={12} md={6}>
            <ButtonGroup variant='contained'>
              {showOptions.map(({ label, value }) => (
                <Button
                  key={value}
                  variant={value !== selectedShowMode ? 'outlined' : undefined}
                  onClick={() => setSelectedShowMode(value)}
                >
                  {label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Grid item textAlign={{ sm: 'left', md: 'right' }} sm={12} md={6}>
            <ButtonGroup variant='contained'>
              {sortOptions.map(({ label, value }) => (
                <Button
                  key={value}
                  variant={value !== selectedSort ? 'outlined' : undefined}
                  onClick={() => setSelectedSort(value)}
                >
                  {label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <StyledMasonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={4}>
        {filtered.map((x: AuctionType) => (
          <AuctionCard key={x.id} auction={x} />
        ))}
      </StyledMasonry>
    </MasonryWrapper>
  );
};

export default AuctionGrid;
