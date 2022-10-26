import React from 'react';
import { Alert, Grid } from '@mui/material';
import { useQuery, useSubscription } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import Loader from '../../common/Loader';
import { BIDS_SUBSCRIPTION, GET_AUCTIONS } from 'queries/auctions';
import AuctionCard from '../AuctionCard/AuctionCard';
import { LayoutContainer } from './styles';
import InfiniteScroll from 'react-infinite-scroller';

// const AuctionsListQuery = () => (
//   <Quer query={chapterQuery}>
//     {({ data, fetchMore }) =>
//       data && (
//         <ChapterList
//           chapters={data.chapters || []}
//           onLoadMore={() =>
//             fetchMore({
//               variables: {
//                 offset: data.chapters.length
//               },
//               updateQuery: (prev, { fetchMoreResult }) => {
//                 if (!fetchMoreResult) return prev;
//                 return Object.assign({}, prev, {
//                   chapters: [...prev.chapters, ...fetchMoreResult.chapters]
//                 });
//               }
//             })
//           }
//         />
//       )
//     }
//   </Query>
// );

const AuctionGrid: React.FC = () => {
  const { t } = useTranslation('auction');
  const { showUnannounced, privateCode } = Object.fromEntries(
    new URLSearchParams(location.search),
  );
  const { loading, error, data, fetchMore } = useQuery(GET_AUCTIONS, {
    variables: {
      // page: $page
      perPage: 5,
      // sortField: $sortField
      // sortOder: $sortOrder
      filter: {
        unannounced: showUnannounced === 'true',
        privateCode,
      },
    },
  });

  useSubscription(BIDS_SUBSCRIPTION);

  const onLoadMore = () => {
    fetchMore({
      variables: {
        page: data.allAuctions.length / 5,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          allAuctions: {
            data: [
              ...prev.allAuctions.data,
              ...fetchMoreResult.allAuctions.data,
            ],
          },
        };
      },
    });
  };

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

  if (!data?.allAuctions?.length) {
    return <Alert severity='warning'>{t('no-auctions')}</Alert>;
  }

  return (
    <LayoutContainer>
      <InfiniteScroll
        style={{ width: '100%' }}
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={true || false}
        loader={<Loader />}
      >
        <Grid justifyContent='center' container spacing={4}>
          {data.allAuctions.map((x: AuctionType) => (
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
