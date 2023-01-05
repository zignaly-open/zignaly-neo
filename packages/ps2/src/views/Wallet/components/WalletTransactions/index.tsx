import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  transactionStateColor,
  transactionStateName,
  WalletTransactionsProps,
} from './types';
import {
  createColumnHelper,
  DateLabel,
  ListGradientIcon,
  ZigCoinIcon,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { Transaction } from 'apis/wallet/types';
import { useTransactionsHistory } from 'apis/wallet/use';
import ChainIcon from 'components/ChainIcon';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

const WalletTransactions = ({}: WalletTransactionsProps) => {
  const type = 'all';
  const { t } = useTranslation('wallet');
  const [filteredData, setFilteredData] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const { pageIndex, pageSize } = pagination;
  const transactionsEndpoint = useTransactionsHistory({
    type,
  });
  console.log(transactionsEndpoint);

  useEffect(() => {
    if (transactionsEndpoint.data) {
      const data = transactionsEndpoint.data
        .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
        .map((transaction) => ({
          ...transaction,
          // assetName: coinsEndpoint.data[transaction.asset]?.name,
        }));
      setFilteredData(data);
      console.log('filrered', data);
    }
  }, [transactionsEndpoint.data, pageIndex]);

  useLayoutEffect(() => {
    // Reset pagination when infinite query is refreshed from filter change
    if (transactionsEndpoint.page === 1) {
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    }
  }, [transactionsEndpoint.page]);

  const columnHelper = createColumnHelper<Transaction>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('createdAt', {
        header: t('transactions.header.date'),
        cell: ({ getValue }) => <DateLabel date={new Date(getValue())} />,
        enableSorting: false,
      }),
      columnHelper.accessor('type', {
        header: t('transactions.header.type'),
        cell: ({ getValue }) =>
          t(`transactions.type.${getValue().replace(/_/g, '').toLowerCase()}`),
        enableSorting: false,
      }),
      columnHelper.accessor('formattedAmount', {
        header: t('transactions.header.amount'),
        enableSorting: false,
        cell: ({ getValue }) => (
          <NumericFormat
            value={getValue()}
            displayType='text'
            thousandSeparator={true}
          />
        ),
      }),
      columnHelper.accessor('currency', {
        header: t('transactions.header.coin'),
        cell: ({ getValue }) => (
          <>
            <ZigTypography
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap={1}
              fontWeight={600}
            >
              <ZigCoinIcon coin={getValue()} size='small' />
              {getValue()}
            </ZigTypography>
          </>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('network', {
        header: t('transactions.header.network'),
        cell: ({ getValue, row: { original } }) => (
          <ZigTypography
            display='flex'
            alignItems='center'
            justifyContent='center'
            gap={1}
            fontWeight={600}
          >
            <ChainIcon network={getValue()} />
            {original.networkName}
          </ZigTypography>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('status', {
        header: t('transactions.header.status'),
        cell: ({ getValue, row }) => (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap={1}
          >
            <Box display='flex' justifyContent='center' flex={1}>
              <ZigTypography color={transactionStateColor[getValue()]}>
                {t(transactionStateName[getValue()])}
              </ZigTypography>
            </Box>
            {row.getIsExpanded() ? <ExpandLess /> : <ExpandMore />}
          </Box>
        ),
        enableSorting: false,
      }),
    ],
    [],
  );

  // const filterOptions = [
  //   { value: 'all', label: t('transactions-history:filter.all') },
  // ].concat(
  //   Object.entries(TRANSACTION_TYPE).map(([, v]) => {
  //     return {
  //       value: v,
  //       label: t(`transactions-history:${TRANSACTION_TYPE_NAME[v]}`),
  //     };
  //   }),
  // );

  return (
    <>
      <Box display='flex' gap={1} alignItems='center' color='neutral100' mb={2}>
        <ListGradientIcon width={40} height={40} />
        <ZigTypography textTransform='uppercase' variant='h3'>
          {t('transactions.walletTransactions')}
        </ZigTypography>
      </Box>
      <ZigTable
        columns={columns}
        data={filteredData}
        // initialState={{
        //   sorting: [
        //     {
        //       id: 'datetime',
        //       desc: true,
        //     },
        //   ],
        // }}
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
    </>
  );
};

export default WalletTransactions;
