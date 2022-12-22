import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CoinLabel,
  createColumnHelper,
  DateLabel,
  ZigPriceLabel,
  ZigTable,
  ZigTablePriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { useExchangeCoinsList, useTransactionsHistory } from 'apis/coin/use';
import TransactionStateLabel from './atoms/TransactionStateLabel';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { TransactionsTableDataType, TRANSACTION_TYPE_NAME } from './types';
import TransactionDetails from './atoms/TransactionDetails';
import { Box } from '@mui/material';
import { PaginationState } from '@tanstack/react-table';
import { truncateAddress } from './util';

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

  const updateData = () => {
    const data = transactionsEndpoint.data
      .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
      .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
      .map((transaction) => ({
        ...transaction,
        assetName: coinsEndpoint.data[transaction.asset]?.name,
      }));
    setFilteredData(data);
  };

  useEffect(() => {
    if (transactionsEndpoint.data && coinsEndpoint.data) {
      updateData();
    }
  }, [transactionsEndpoint.data, coinsEndpoint.data, pageIndex]);

  useLayoutEffect(() => {
    // Reset pagination when infinite query is refreshed from filter change
    if (transactionsEndpoint.page === 1) {
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    }
  }, [transactionsEndpoint.page]);

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
        cell: ({ getValue }) => (
          <ZigTypography
            whiteSpace='normal'
            color='neutral100'
            fontWeight={500}
          >
            {t(TRANSACTION_TYPE_NAME[getValue()])}
          </ZigTypography>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('amount', {
        header: t('tableHeader.amount'),
        cell: ({ getValue, row: { original } }) => (
          <ZigTablePriceLabel coin={original.asset} value={getValue()} />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('fromName', {
        header: t('tableHeader.from'),
        cell: ({ getValue }) => (
          <ZigTypography
            whiteSpace='normal'
            color='neutral100'
            fontWeight={500}
          >
            {getValue() || t('external')}
          </ZigTypography>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('toName', {
        header: t('tableHeader.to'),
        cell: ({ getValue, row: { original } }) => (
          <ZigTypography
            whiteSpace='normal'
            color='neutral100'
            fontWeight={500}
          >
            {getValue() || truncateAddress(original.to)}
          </ZigTypography>
        ),
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
