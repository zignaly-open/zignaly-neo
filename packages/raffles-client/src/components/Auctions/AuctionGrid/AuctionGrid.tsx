import { Alert, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useMemo, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import Loader from '../../common/Loader';
import { getWinningLosingStatus } from '../AuctionCard/util';
import { Select, Typography } from '@zignaly-open/ui';
import { BIDS_SUBSCRIPTION, GET_AUCTIONS } from 'queries/auctions';
import AuctionCard from '../AuctionCard/AuctionCard';

const MasonryWrapper = styled(Box)`
  max-width: 1280px;
  margin: 30px auto;
  padding: 0 8px;
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
  const { loading, error, data: data2 } = useQuery(GET_AUCTIONS);
  const data = {
    auctions: [
      {
        id: '7',
        title: 'Just go',
        createdAt: '2022-08-31T10:02:36.190Z',
        expiresAt: '2022-09-02T07:18:02.511Z',
        maxExpiryDate: '2022-09-02T07:18:00.511Z',
        maxClaimDate: '2022-09-10T10:02:36.189Z',
        status: null,
        comingSoon: false,
        currentBid: '0.35',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description: 'Pay me and go',
        imageUrl: '/images/7.jpg',
        startingBid: '0.01',
        numberOfWinners: 3,
        basketItems: [
          { ticker: 'USDT', amount: '10', __typename: 'BasketItem' },
          { ticker: 'BTC', amount: '0.001', __typename: 'BasketItem' },
        ],
        monetaryValue: '$100',
        bids: [
          {
            id: 1115,
            position: 1,
            value: '0.35',
            user: { id: 19, username: 'ToleMob', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1114,
            position: 2,
            value: '0.34',
            user: { id: 6, username: 'Ehsan', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1113,
            position: 3,
            value: '0.33',
            user: { id: 2, username: 'ARG007', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: null,
        __typename: 'Auction',
      },
      {
        id: '4',
        title: 'Charity Giveaway 2',
        createdAt: '2022-08-31T10:02:33.264Z',
        expiresAt: '2022-09-02T07:05:00.511Z',
        maxExpiryDate: '2022-09-08T10:02:33.264Z',
        maxClaimDate: '2022-09-10T10:02:33.264Z',
        status: null,
        comingSoon: false,
        currentBid: '0.19',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description:
          'All proceeds from this auction will go towards the needs of Alex who would like to have an M4 as well',
        imageUrl: '/images/10.jpg',
        startingBid: '0.01',
        numberOfWinners: 10,
        basketItems: [
          { ticker: 'USDT', amount: '10', __typename: 'BasketItem' },
        ],
        monetaryValue: '$1',
        bids: [
          {
            id: 1018,
            position: 1,
            value: '0.19',
            user: { id: 1, username: 'Tole00', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1009,
            position: 2,
            value: '0.18',
            user: { id: 2, username: 'ARG007', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 987,
            position: 3,
            value: '0.1',
            user: { id: 19, username: 'ToleMob', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: null,
        __typename: 'Auction',
      },
      {
        id: '2',
        title: "Elon Musk's giveaway",
        createdAt: '2022-08-31T10:02:30.736Z',
        expiresAt: '2022-09-02T07:05:00.511Z',
        maxExpiryDate: '2022-09-08T10:02:30.736Z',
        maxClaimDate: '2022-09-10T10:02:30.736Z',
        status: null,
        comingSoon: false,
        currentBid: '0.06',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description:
          'Have you ever dreamt of reading the most retarded description ever? Well, continue dreaming',
        imageUrl: '/images/11.jpg',
        startingBid: '0.01',
        numberOfWinners: 10,
        basketItems: [
          {
            ticker: 'Genetically Engineered Catgirl',
            amount: '1',
            __typename: 'BasketItem',
          },
          { ticker: '$TSLA', amount: '1', __typename: 'BasketItem' },
        ],
        monetaryValue: '1 Model S',
        bids: [
          {
            id: 1019,
            position: 1,
            value: '0.06',
            user: { id: 1, username: 'Tole00', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1010,
            position: 2,
            value: '0.05',
            user: { id: 2, username: 'ARG007', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 972,
            position: 3,
            value: '0.02',
            user: { id: 19, username: 'ToleMob', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: null,
        __typename: 'Auction',
      },
      {
        id: '8',
        title: 'Diversification',
        createdAt: '2022-08-31T10:02:37.653Z',
        expiresAt: '2022-09-02T07:05:00.511Z',
        maxExpiryDate: '2022-09-08T10:02:37.652Z',
        maxClaimDate: '2022-09-10T10:02:37.652Z',
        status: null,
        comingSoon: false,
        currentBid: '0.04',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description: 'Win a basket more diverse than a Netflix cast',
        imageUrl: '/images/8.jpg',
        startingBid: '0.01',
        numberOfWinners: 10,
        basketItems: [
          { ticker: 'SHT', amount: '1000', __typename: 'BasketItem' },
          { ticker: 'XRP', amount: '10', __typename: 'BasketItem' },
          { ticker: 'ETH', amount: '0.01', __typename: 'BasketItem' },
          { ticker: 'BTC', amount: '0.001', __typename: 'BasketItem' },
        ],
        monetaryValue: '$1000',
        bids: [
          {
            id: 1022,
            position: 1,
            value: '0.04',
            user: { id: 19, username: 'ToleMob', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1013,
            position: 2,
            value: '0.03',
            user: { id: 1, username: 'Tole00', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1001,
            position: 3,
            value: '0.02',
            user: { id: 6, username: 'Ehsan', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: null,
        __typename: 'Auction',
      },
      {
        id: '6',
        title: 'Honest Auction',
        createdAt: '2022-08-31T10:02:35.219Z',
        expiresAt: '2022-09-03T07:05:00.511Z',
        maxExpiryDate: '2022-09-08T10:02:35.219Z',
        maxClaimDate: '2022-09-10T10:02:35.219Z',
        status: null,
        comingSoon: false,
        currentBid: '0.04',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description:
          'Lotteries are for economically illiterate, stop playing one',
        imageUrl: '/images/6.jpg',
        startingBid: '0.01',
        numberOfWinners: 10,
        basketItems: [{ ticker: 'BTC', amount: '1', __typename: 'BasketItem' }],
        monetaryValue: '$30k',
        bids: [
          {
            id: 1020,
            position: 1,
            value: '0.04',
            user: { id: 1, username: 'Tole00', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 999,
            position: 2,
            value: '0.02',
            user: { id: 6, username: 'Ehsan', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: null,
        __typename: 'Auction',
      },
      {
        id: '5',
        title: 'Win&Go',
        createdAt: '2022-08-31T10:02:34.266Z',
        expiresAt: '2022-09-04T07:05:00.511Z',
        maxExpiryDate: '2022-09-08T10:02:34.266Z',
        maxClaimDate: '2022-09-10T10:02:34.266Z',
        status: null,
        comingSoon: false,
        currentBid: '0.05',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description: 'Bid, win, get outbid and go',
        imageUrl: '/images/5.jpg',
        startingBid: '0.01',
        numberOfWinners: 10,
        basketItems: [{ ticker: 'ETH', amount: '2', __typename: 'BasketItem' }],
        monetaryValue: '$4000',
        bids: [
          {
            id: 1021,
            position: 1,
            value: '0.05',
            user: { id: 1, username: 'Tole00', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 998,
            position: 2,
            value: '0.03',
            user: { id: 6, username: 'Ehsan', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 993,
            position: 3,
            value: '0.02',
            user: { id: 2, username: 'ARG007', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: null,
        __typename: 'Auction',
      },
      {
        id: '1',
        title: 'Best Auction EVER',
        createdAt: '2022-08-31T10:02:29.753Z',
        expiresAt: '2022-09-02T07:14:02.511Z',
        maxExpiryDate: '2022-09-02T07:14:00.511Z',
        maxClaimDate: '2022-09-10T10:02:29.752Z',
        status: null,
        comingSoon: false,
        currentBid: '0.4',
        website: 'https://zignaly.com/',
        twitter: 'https://zignaly.com/',
        telegram: 'https://zignaly.com/',
        discord: 'https://zignaly.com/',
        bidFee: '1',
        description: 'Bid now or die regretting',
        imageUrl: '/images/4.jpg',
        startingBid: '0.01',
        numberOfWinners: 3,
        basketItems: [
          { ticker: 'BTC', amount: '100', __typename: 'BasketItem' },
        ],
        monetaryValue: '100 BTC!!11',
        bids: [
          {
            id: 1086,
            position: 1,
            value: '0.4',
            user: { id: 19, username: 'ToleMob', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1085,
            position: 2,
            value: '0.39',
            user: { id: 1, username: 'Tole00', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1082,
            position: 3,
            value: '0.36',
            user: { id: 8, username: 'Owvais', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: null,
        __typename: 'Auction',
      },
      {
        id: '3',
        title: 'Charity Giveaway',
        createdAt: '2022-08-31T10:02:32.177Z',
        expiresAt: '2022-09-02T07:10:04.511Z',
        maxExpiryDate: '2022-09-02T07:10:00.511Z',
        maxClaimDate: '2022-09-10T10:02:32.177Z',
        status: null,
        comingSoon: false,
        currentBid: '0.52',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description:
          'All proceeds from this auction will go towards the needs of Alex who desperately needs a brand new X5 40d',
        imageUrl: '/images/9.jpg',
        startingBid: '0.01',
        numberOfWinners: 2,
        basketItems: [
          { ticker: 'USDT', amount: '1', __typename: 'BasketItem' },
        ],
        monetaryValue: '$1',
        bids: [
          {
            id: 1067,
            position: 1,
            value: '0.52',
            user: { id: 2, username: 'ARG007', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
          {
            id: 1066,
            position: 2,
            value: '0.51',
            user: { id: 19, username: 'ToleMob', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: null,
        __typename: 'Auction',
      },
      {
        id: '10',
        title: 'Diversification 3',
        createdAt: '2022-08-31T10:02:37.653Z',
        expiresAt: '2022-09-03T23:10:14.511Z',
        maxExpiryDate: '2022-09-08T10:02:37.652Z',
        maxClaimDate: '2022-09-10T10:02:37.652Z',
        status: null,
        comingSoon: false,
        currentBid: '0.04',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description: 'Win a basket more diverse than a Netflix cast',
        imageUrl: '/images/8.jpg',
        startingBid: '0.01',
        numberOfWinners: 1,
        basketItems: [],
        monetaryValue: '$1000',
        bids: [
          {
            id: 1136,
            position: 1,
            value: '0.04',
            user: { id: 3, username: 'chris', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: {
          id: 1136,
          value: '0.04',
          position: 1,
          isClaimed: false,
          __typename: 'Bid',
        },
        __typename: 'Auction',
      },
      {
        id: '9',
        title: 'Diversification 2',
        createdAt: '2022-08-31T10:02:37.653Z',
        expiresAt: '2022-09-02T09:38:14.511Z',
        maxExpiryDate: '2022-09-08T10:02:37.652Z',
        maxClaimDate: '2022-09-10T10:02:37.652Z',
        status: null,
        comingSoon: false,
        currentBid: '0.19',
        website: null,
        twitter: null,
        telegram: null,
        discord: null,
        bidFee: '1',
        description: 'Win a basket more diverse than a Netflix cast',
        imageUrl: '/images/8.jpg',
        startingBid: '0.01',
        numberOfWinners: 1,
        basketItems: [],
        monetaryValue: '$1000',
        bids: [
          {
            id: 1133,
            position: 1,
            value: '0.19',
            user: { id: 3, username: 'chris', __typename: 'UserInfo' },
            __typename: 'Bid',
          },
        ],
        userBid: {
          id: 1133,
          value: '0.19',
          position: 1,
          isClaimed: false,
          __typename: 'Bid',
        },
        __typename: 'Auction',
      },
    ],
  };

  const [selectedSort, setSelectedSort] = useState();
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
    [t],
  );

  const showOptions = useMemo(
    () => [
      { caption: t('show-all'), value: ShowOptions.All },
      { caption: t('show-active'), value: ShowOptions.Active },
      { caption: t('show-yours'), value: ShowOptions.Yours },
    ],
    [t],
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
            return -(+a.bids[0]?.value || 0) + (+b.bids[0]?.value || 0);
          case SortDirection.Expiry:
            const date1 = +new Date(a.expiresAt);
            const date2 = +new Date(b.expiresAt);
            if (date1 < +new Date() || date2 < +new Date()) {
              return date2 - date1;
            }
            return date1 - date2;
        }
      });
  }, [data?.auctions, selectedSort, selectedShowMode]);

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
    <MasonryWrapper>
      <Grid container marginY={2} columnSpacing={4} justifyContent='center'>
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
            placeholder='Select Sort'
          />
        </Grid>
      </Grid>
      <Box padding='40px 0 33px 28px'>
        <Typography variant='h3' weight='medium'>
          {filtered.length} {t('zauctions-projects')}
        </Typography>
      </Box>
      <Grid justifyContent='center' container spacing={4}>
        {filtered.map((x: AuctionType) => (
          <Grid
            item
            key={x.id}
            xs={12}
            md={6}
            display='flex'
            justifyContent='center'
          >
            <AuctionCard auction={x} />
          </Grid>
        ))}
      </Grid>
    </MasonryWrapper>
  );
};

export default AuctionGrid;
