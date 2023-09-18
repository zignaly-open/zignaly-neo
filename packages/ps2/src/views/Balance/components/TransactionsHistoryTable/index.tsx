import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  DateLabel,
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
import { getTransactionSideType, truncateAddress } from './util';
import { TRANSACTION_TYPE } from 'apis/coin/types';
import { useActiveExchange } from '../../../../apis/user/use';
import CoinLabel from 'components/CoinLabel';
import { useBalanceQuery } from 'apis/user/api';
import { useTransactionsHistoryQuery } from '../../../../apis/coin/api';

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
  const exchange = useActiveExchange();
  // Trigger balance update to be sure that balance widget matches transactions data
  useBalanceQuery(
    {
      exchangeInternalId: exchange?.internalId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !exchange?.internalId,
    },
  );

  const defineSign = (typeTransaction: string, fromId: string) => {
    if (
      [
        TRANSACTION_TYPE.PS_DEPOSIT,
        TRANSACTION_TYPE.WITHDRAW,
        TRANSACTION_TYPE.BUYZIG,
      ].includes(typeTransaction) ||
      fromId === exchange?.internalId
    )
      return -1;
    else return 1;
  };

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
        cell: ({ getValue, row }) => (
          <DateLabel
            id={`balances-table-transaction__date-${row.original.txId}`}
            date={new Date(getValue())}
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('asset', {
        header: t('tableHeader.coin'),
        cell: ({ getValue, row: { original } }) => (
          <CoinLabel
            id={`balances-table-transaction__coin-${original.txId}`}
            coin={getValue()}
            name={original.assetName ?? '-'}
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('txType', {
        header: t('tableHeader.type'),
        cell: ({ getValue, row: { original } }) => (
          <ZigTypography
            whiteSpace='normal'
            color='neutral100'
            fontWeight={500}
            id={`balances-table-transaction__type-${original.txId}`}
          >
            {t(TRANSACTION_TYPE_NAME[getValue()])}
          </ZigTypography>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('amount', {
        header: t('tableHeader.amount'),
        cell: ({ getValue, row: { original } }) => (
          <ZigTablePriceLabel
            id={`balances-table-transaction__amount-${original.txId}`}
            exact
            coin={original.asset}
            alwaysShowSign
            value={defineSign(original.txType, original.from) * getValue()}
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('fromName', {
        header: t('tableHeader.from'),
        cell: ({ getValue, row: { original } }) => (
          <ZigTypography
            id={`balances-table-transaction__from-${original.txId}`}
            whiteSpace='normal'
            color='neutral100'
            fontWeight={500}
          >
            {getValue() ||
              (original.txType === TRANSACTION_TYPE.PS_WITHDRAW
                ? t('psService')
                : getTransactionSideType(original.txType, 'from') === 'zignaly'
                ? t('deleted')
                : t('external'))}
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
            id={`balances-table-transaction__to-${original.txId}`}
          >
            {getValue() ||
              (original.to
                ? truncateAddress(original.to)
                : getTransactionSideType(original.txType, 'to') === 'zignaly'
                ? t('deleted')
                : '-')}
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
              <TransactionStateLabel
                state={getValue()}
                id={`balances-table-transaction__status-${row.original.txId}`}
              />
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
        <>
          <ZigTable
            prefixId={'transactions'}
            columns={columns}
            initialState={{
              sorting: [
                {
                  id: 'datetime',
                  desc: true,
                },
              ],
            }}
            renderSubComponent={({ row }) => (
              <TransactionDetails
                transaction={row.original}
                txId={row.original.txId}
              />
            )}
            emptyMessage={t('noData')}
            query={useTransactionsHistoryQuery}
            queryExtraParams={{
              exchangeInternalId: exchange?.internalId,
            }}
          />

          <ZigTable
            prefixId={'transactions'}
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
              <TransactionDetails
                transaction={row.original}
                txId={row.original.txId}
              />
            )}
            manualPagination={true}
            pagination={pagination}
            pageCount={
              transactionsEndpoint.hasMore ? -1 : transactionsEndpoint.page
            }
            onPaginationChange={setPagination}
            loading={transactionsEndpoint.isFetching}
            emptyMessage={t('noData')}
          />
        </>
      )}
    />
  );
};

export default TransactionsHistoryTable;
