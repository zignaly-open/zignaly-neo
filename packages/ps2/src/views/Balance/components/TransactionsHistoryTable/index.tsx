import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CoinLabel,
  createColumnHelper,
  DateLabel,
  ZigPriceLabel,
  ZigTable,
} from '@zignaly-open/ui';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { useExchangeCoinsList, useTransactionsHistory } from 'apis/coin/use';
import { CoinDetails, Transaction } from 'apis/coin/types';
import TransactionStateLabel from './atoms/TransactionStateLabel';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TableLoader } from './styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { TransactionsTableDataType, transactionTypeName } from './types';
import TransactionDetails from './atoms/TransactionDetails';
import { Box } from '@mui/material';

const limit = 30;

const TransactionsHistoryTable = () => {
  const { t } = useTranslation('transactions-history');
  const type = null;
  const transactionsEndpoint = useTransactionsHistory({
    limit,
    type,
  });
  const coinsEndpoint = useExchangeCoinsList();

  const columnHelper = createColumnHelper<TransactionsTableDataType>();
  const columns = [
    columnHelper.accessor('datetime', {
      header: t('tableHeader.date'),
      cell: ({ getValue }) => <DateLabel date={new Date(getValue())} />,
    }),
    columnHelper.accessor('asset', {
      header: t('tableHeader.coin'),
      cell: ({ getValue, row: { original } }) => (
        <CoinLabel coin={getValue()} name={original.assetName ?? '-'} />
      ),
    }),
    columnHelper.accessor('txType', {
      header: t('tableHeader.type'),
      cell: ({ getValue }) => t(transactionTypeName[getValue()]),
    }),
    columnHelper.accessor('amount', {
      header: t('tableHeader.amount'),
      cell: ({ getValue, row: { original } }) => (
        <ZigPriceLabel
          coin={original.asset}
          value={getValue()}
          alwaysShowSign={true}
        />
      ),
    }),
    columnHelper.accessor('fromName', {
      header: t('tableHeader.from'),
      cell: ({ getValue }) => getValue() || '-',
    }),
    columnHelper.accessor('toName', {
      header: t('tableHeader.to'),
      cell: ({ getValue }) => getValue() || '-',
    }),
    columnHelper.accessor('status', {
      header: t('tableHeader.status'),
      cell: ({ getValue, row }) => (
        <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
          <Box display='flex' justifyContent='center' flex={1}>
            <TransactionStateLabel state={getValue()} />
          </Box>
          {row.getIsExpanded() ? <ExpandLess /> : <ExpandMore />}
        </Box>
      ),
    }),
  ];

  const test = [{ a: 'aa' }];
  const columnHelper0 = createColumnHelper<typeof test[number]>();
  const A = () => (
    <ZigTable
      columns={[
        columnHelper0.accessor('a', {
          header: 'Value in USD',
        }),
      ]}
      data={test}
    />
  );

  return (
    <LayoutContentWrapper
      endpoint={[transactionsEndpoint, coinsEndpoint]}
      content={([transactions, coins]: [Transaction[], CoinDetails]) => (
        <InfiniteScroll
          style={{ overflow: 'visible' }}
          dataLength={transactions.length}
          next={transactionsEndpoint.readMore}
          hasMore={transactionsEndpoint.hasMore}
          loader={<TableLoader />}
        >
          <ZigTable
            columns={columns}
            data={transactions.map((transaction) => ({
              ...transaction,
              assetName: coins[transaction.asset]?.name,
            }))}
            initialState={{
              sorting: [
                {
                  id: 'datetime',
                  desc: true,
                },
              ],
            }}
            renderSubComponent={({ row }) => (
              <TransactionDetails transaction={row.original} />
            )}
            pagination={false}
          />
        </InfiniteScroll>
      )}
    />
  );
};

export default TransactionsHistoryTable;
