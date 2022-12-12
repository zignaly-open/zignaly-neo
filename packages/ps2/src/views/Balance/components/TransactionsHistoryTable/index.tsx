import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, CoinLabel, DateLabel, ZigPriceLabel } from '@zignaly-open/ui';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useTransactions } from '../../../../apis/coin/use';
import { Transaction, Transactions } from '../../../../apis/coin/types';
import TransactionStateLabel from '../TransactionStateLabel';
import InfiniteScroll from 'react-infinite-scroll-component';
import CenteredLoader from 'components/CenteredLoader';

const initialStateTable = {
  sortBy: [
    {
      id: 'valueUSD',
      desc: true,
    },
  ],
};

const limit = 30;

const TransactionsHistoryTable = () => {
  const { t } = useTranslation('transactions-history');
  const [fromId, setFromId] = useState('');
  const transactionsEndpoint = useTransactions({ from: fromId });

  const columns: TableProps<Transaction>['columns'] = useMemo(
    () => [
      {
        Header: t('tableHeader.date'),
        accessor: 'datetime',
        Cell: ({ cell: { value } }) => <DateLabel date={new Date(value)} />,
        sortType: (a, b) => +new Date(a.values.date) - +new Date(b.values.date),
      },
      {
        Header: t('tableHeader.coin'),
        accessor: 'asset',
        Cell: ({ cell: { value } }) => <CoinLabel coin={value} name={'what'} />,
        // sortType: (a, b) =>
        //   // todo
        //   a.values.coin?.symbol?.localeCompare(b.values.coin?.symbol),
      },
      {
        Header: t('tableHeader.type'),
        accessor: 'txType',
        // Cell: ({ cell: { value } }) => <>{t(connectionStateName[value])}</>,
        Cell: ({ cell: { value } }) => <>{t(`type.${value}`)}</>,
      },
      {
        Header: t('tableHeader.amount'),
        accessor: 'amount',
        Cell: ({ cell: { value, row } }) => (
          <ZigPriceLabel
            coin={row.original.asset}
            value={value}
            alwaysShowSign={true}
          />
        ),
        // sortType: (a, b) =>
        //   sortByValue(a.values.total.balanceTotal, b.values.total.balanceTotal),
      },
      {
        Header: t('tableHeader.transactionId'),
        accessor: 'txId',
        Cell: ({ cell: { value } }) => value || '-',
      },
      {
        Header: t('tableHeader.from'),
        accessor: 'fromName',
        Cell: ({ cell: { value } }) => value || '-',
      },
      {
        Header: t('tableHeader.to'),
        accessor: 'toName',
        Cell: ({ cell: { value } }) => value || '-',
      },
      {
        Header: t('tableHeader.status'),
        accessor: 'status',
        Cell: ({ cell: { value } }) => <TransactionStateLabel state={value} />,
      },
      // {
      //   Header: t('tableHeader.availableBalance'),
      //   accessor: 'available',
      //   Cell: ({ cell: { value } }) => (
      //     <PriceLabel coin={value.symbol} value={value.balanceFree} />
      //   ),
      //   sortType: (a, b) =>
      //     sortByValue(
      //       a.values.available.balanceFree,
      //       b.values.available.balanceFree,
      //     ),
      // },
      // {
      //   Header: t('tableHeader.lockedBalance'),
      //   accessor: 'locked',
      //   Cell: ({ cell: { value } }) => (
      //     <PriceLabel coin={value.symbol} value={value.balanceLocked} />
      //   ),
      //   sortType: (a, b) =>
      //     sortByValue(a.values.balanceLocked, b.values.balanceLocked),
      // },
      // {
      //   Header: t('tableHeader.amount'),
      //   accessor: 'valueBTC',
      //   Cell: ({ cell: { value } }) => (
      //     <ZigPriceLabel coin={'btc'} value={value} />
      //   ),
      //   sortType: (a, b) =>
      //     sortByValue(
      //       a.values.valueBTC.balanceTotalBTC,
      //       b.values.valueBTC.balanceTotalBTC,
      //     ),
      // },
      // {
      //   Header: t('tableHeader.amount'),
      //   accessor: 'amount',
      //   Cell: ({ cell: { value } }) => (
      //     <UsdPriceLabel value={value.balanceTotalUSDT} />
      //   ),
      //   sortType: (a, b) =>
      //     sortByValue(
      //       a.values.valueUSD.balanceTotalUSDT,
      //       b.values.valueUSD.balanceTotalUSDT,
      //     ),
      // },
    ],
    [t],
  );

  const getFilteredData = useCallback(
    (transactions: Transactions) =>
      transactions.map((transaction) => ({
        date: transaction.datetime,
        // coin: { symbol: coin, name: balance.name },
        // total: {
        //   symbol: coin,
        //   balanceTotal: balance.balanceTotal,
        // },
        // available: {
        //   symbol: coin,
        //   balanceFree: balance.balanceFree,
        // },
        // locked: {
        //   symbol: coin,
        //   balanceLocked: balance.balanceLocked,
        // },
        // valueBTC: {
        //   balanceTotalBTC: balance.balanceTotalBTC,
        // },
        // valueUSD: {
        //   balanceTotalUSDT: balance.balanceTotalUSDT,
        // },
        // action: !!allowedDeposits[exchangeType]?.includes(coin) && (
        //   <IconButton
        //     icon={<AddIcon color={'neutral300'} />}
        //     onClick={() =>
        //       showModal(DepositModal, {
        //         selectedCoin: coin,
        //       })
        //     }
        //     variant='secondary'
        //   />
        // ),
      })),
    [],
  );

  return (
    <LayoutContentWrapper
      endpoint={[transactionsEndpoint]}
      content={([{ metadata, transactions }]: [Transactions]) => (
        <InfiniteScroll
          style={{ overflow: 'visible' }}
          // scrollableTarget={container}
          dataLength={transactions.length}
          next={() => setFromId(metadata.from)}
          hasMore={transactions.length === limit}
          loader={
            <CenteredLoader />
            // <Box display='flex' justifyContent='center'>
            //   <CircularProgress />
            // </Box>
          }
        >
          <Table
            type='basic'
            columns={columns}
            data={transactions}
            initialState={initialStateTable}
            hideOptionsButton={false}
            // renderRowSubComponent={renderRowSubComponent}
            isUserTable={false}
          />
        </InfiniteScroll>
      )}
    />
  );
};

export default TransactionsHistoryTable;
