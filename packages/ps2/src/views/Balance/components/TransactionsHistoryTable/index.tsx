import React, { useEffect, useMemo, useState } from 'react';
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
import TransactionStateLabel from './atoms/TransactionStateLabel';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { TransactionsTableDataType, TRANSACTION_TYPE_NAME } from './types';
import TransactionDetails from './atoms/TransactionDetails';
import { Box } from '@mui/material';
import { PaginationState } from '@tanstack/react-table';

const TransactionsHistoryTable = ({ type }: { type?: string }) => {
  const [filteredData, setFilteredData] = useState<TransactionsTableDataType[]>(
    [],
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const { pageIndex, pageSize } = pagination;
  const { t } = useTranslation('transactions-history');
  const transactionsEndpoint = useTransactionsHistory(
    {
      limit: pageSize,
      type,
    },
    pageIndex,
  );
  const coinsEndpoint = useExchangeCoinsList();

  useEffect(() => {
    if (
      !transactionsEndpoint.isFetching &&
      transactionsEndpoint.data.length > pageIndex * pageSize + 1 &&
      coinsEndpoint.data
    ) {
      const data = transactionsEndpoint.data
        .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
        .map((transaction) => ({
          ...transaction,
          assetName: coinsEndpoint.data[transaction.asset]?.name,
        }));
      setFilteredData(data);
    }
  }, [transactionsEndpoint.data, coinsEndpoint.data, pageIndex]);

  const columnHelper = createColumnHelper<TransactionsTableDataType>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('datetime', {
        header: t('tableHeader.date'),
        cell: ({ getValue }) => <DateLabel date={new Date(getValue())} />,
        enableSorting: false,
      }),
      columnHelper.accessor('asset', {
        header: t('tableHeader.coin'),
        cell: ({ getValue, row: { original } }) => (
          <CoinLabel coin={getValue()} name={original.assetName ?? '-'} />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('txType', {
        header: t('tableHeader.type'),
        cell: ({ getValue }) => t(TRANSACTION_TYPE_NAME[getValue()]),
        enableSorting: false,
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
        enableSorting: false,
      }),
      columnHelper.accessor('fromName', {
        header: t('tableHeader.from'),
        cell: ({ getValue }) => getValue() || '-',
        enableSorting: false,
      }),
      columnHelper.accessor('toName', {
        header: t('tableHeader.to'),
        cell: ({ getValue }) => getValue() || '-',
        enableSorting: false,
      }),
      columnHelper.accessor('status', {
        header: t('tableHeader.status'),
        cell: ({ getValue, row }) => (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap={1}
          >
            <Box display='flex' justifyContent='center' flex={1}>
              <TransactionStateLabel state={getValue()} />
            </Box>
            {row.getIsExpanded() ? <ExpandLess /> : <ExpandMore />}
          </Box>
        ),
        enableSorting: false,
      }),
    ],
    [],
  );

  return (
    <LayoutContentWrapper
      endpoint={[transactionsEndpoint, coinsEndpoint]}
      content={() => (
        <ZigTable
          columns={columns}
          data={filteredData}
          initialState={{
            sorting: [
              {
                id: 'datetime',
                desc: true,
              },
            ],
          }}
          // TODO: why github ci doesn't find the type?
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          renderSubComponent={({ row }) => (
            <TransactionDetails transaction={row.original} />
          )}
          manualPagination={true}
          pagination={pagination}
          pageCount={
            transactionsEndpoint.hasMore ? -1 : transactionsEndpoint.page
          }
          onPaginationChange={setPagination}
          loading={transactionsEndpoint.isFetching}
        />
      )}
    />
  );
};

export default TransactionsHistoryTable;
