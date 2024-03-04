import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  DateLabel,
  ZigTable,
  ZigTablePriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { useExchangeCoinsList, useRefetchBalance } from 'apis/coin/use';
import TransactionStateLabel from './atoms/TransactionStateLabel';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { TRANSACTION_TYPE_NAME } from './types';
import TransactionDetails from './atoms/TransactionDetails';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { getTransactionSideType, truncateAddress } from './util';
import { Transaction, TRANSACTION_TYPE } from 'apis/coin/types';
import { useActiveExchange } from '../../../../apis/user/use';
import CoinLabel from 'components/CoinLabel';
import { useTransactionsHistoryQuery } from '../../../../apis/coin/api';
import { TableWrapper } from './styles';

const TransactionsHistoryTable = ({ type }: { type?: string }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation('transactions-history');
  const coinsEndpoint = useExchangeCoinsList();
  const exchange = useActiveExchange();
  useRefetchBalance();

  const defineSign = useCallback(
    (typeTransaction: string, fromId: string, toId: string) => {
      if (
        [
          TRANSACTION_TYPE.PS_DEPOSIT,
          TRANSACTION_TYPE.WITHDRAW,
          TRANSACTION_TYPE.BUYZIG,
        ].includes(typeTransaction) ||
        (fromId === exchange?.internalId && fromId !== toId)
      )
        return -1;
      else return 1;
    },
    [exchange],
  );

  const columnHelper = createColumnHelper<Transaction>();
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
      ...(md
        ? [
            columnHelper.accessor('asset', {
              header: t('tableHeader.coin'),
              cell: ({ getValue, row: { original } }) => (
                <CoinLabel
                  id={`balances-table-transaction__coin-${original.txId}`}
                  coin={getValue()}
                  name={coinsEndpoint.data?.[original.asset]?.name ?? '-'}
                />
              ),
              enableSorting: false,
            }),
            columnHelper.accessor('txType', {
              header: t('tableHeader.type'),
              cell: ({ getValue, row: { original } }) => (
                <Box
                  width={!lg ? '100px' : '100%'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <ZigTypography
                    whiteSpace='normal'
                    color='neutral100'
                    fontWeight={500}
                    id={`balances-table-transaction__type-${original.txId}`}
                  >
                    {t(TRANSACTION_TYPE_NAME[getValue()])}
                  </ZigTypography>
                </Box>
              ),
              enableSorting: false,
            }),
          ]
        : []),

      columnHelper.accessor('amount', {
        header: t('tableHeader.amount'),
        cell: ({ getValue, row: { original } }) => (
          <Box display={'flex'} flexDirection={'column'}>
            <ZigTablePriceLabel
              id={`balances-table-transaction__amount-${original.txId}`}
              exact
              coin={original.asset}
              alwaysShowSign
              value={
                defineSign(original.txType, original.from, original.to) *
                getValue()
              }
            />
            {!md && (
              <ZigTypography
                whiteSpace='normal'
                color='neutral300'
                fontWeight={400}
                fontSize={'10px'}
                lineHeight={'10px'}
                id={`balances-table-transaction__type-${original.txId}`}
              >
                {t(TRANSACTION_TYPE_NAME[original.txType])}
              </ZigTypography>
            )}
          </Box>
        ),
        enableSorting: false,
      }),
      ...(lg
        ? [
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
                      : getTransactionSideType(original.txType, 'from') ===
                        'zignaly'
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
                      : getTransactionSideType(original.txType, 'to') ===
                        'zignaly'
                      ? t('deleted')
                      : '-')}
                </ZigTypography>
              ),
              enableSorting: false,
            }),
          ]
        : []),
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
            {md ? row.getIsExpanded() ? <ExpandLess /> : <ExpandMore /> : null}
          </Box>
        ),
        enableSorting: false,
      }),
    ],
    [t, coinsEndpoint.data, md, lg, sm],
  );

  return (
    <LayoutContentWrapper
      endpoint={[coinsEndpoint]}
      content={() => (
        <TableWrapper>
          <ZigTable
            columnVisibility={md}
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
            renderSubComponent={
              md
                ? ({ row }) => (
                    <TransactionDetails
                      transaction={row.original}
                      txId={row.original.txId}
                    />
                  )
                : undefined
            }
            emptyMessage={t('noData')}
            useInfiniteQuery={useTransactionsHistoryQuery}
            queryExtraParams={{
              exchangeInternalId: exchange?.internalId,
              type,
            }}
          />
        </TableWrapper>
      )}
    />
  );
};

export default TransactionsHistoryTable;
