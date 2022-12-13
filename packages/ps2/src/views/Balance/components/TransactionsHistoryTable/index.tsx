import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CoinLabel,
  DateLabel,
  ZigPriceLabel,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { useExchangeCoinsList, useTransactionsHistory } from 'apis/coin/use';
import { CoinDetails, Transaction, TransactionType } from 'apis/coin/types';
import TransactionStateLabel from '../TransactionStateLabel';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  TableLoader,
  TransactionPanel,
  TypographyAddress,
  TypographyPanelLabel,
} from './styles';
import { Box } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import ChainIcon from './atoms/ChainIcon';
import ServiceLink from './atoms/ProviderLink';
import ZignalyAccount from './atoms/TransferZigLabel';
import { Side, transactionTypeName } from './types';
import { getTransactionSideType } from './utils';

const initialStateTable = {
  sortBy: [
    {
      id: 'datetime',
      desc: true,
    },
  ],
};

const limit = 30;

const TransactionsHistoryTable = () => {
  const { t } = useTranslation('transactions-history');
  const type = null;
  const transactionsEndpoint = useTransactionsHistory({
    limit,
    type,
  });
  const coinsEndpoint = useExchangeCoinsList();

  const columns: TableProps<Transaction & { assetName: string }>['columns'] =
    useMemo(
      () => [
        {
          Header: t('tableHeader.date'),
          accessor: 'datetime',
          Cell: ({ cell: { value } }) => <DateLabel date={new Date(value)} />,
        },
        {
          Header: t('tableHeader.coin'),
          accessor: 'asset',
          Cell: ({ cell: { value, row } }) => (
            <CoinLabel coin={value} name={row.original.assetName ?? '-'} />
          ),
        },
        {
          Header: t('tableHeader.type'),
          accessor: 'txType',
          Cell: ({ cell: { value } }) => <>{t(transactionTypeName[value])}</>,
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
          Cell: ({ cell: { value } }) => (
            <TransactionStateLabel state={value} />
          ),
        },
      ],
      [t],
    );

  const FromTo = useCallback(
    ({ transaction, side }: { transaction: Transaction; side: Side }) => {
      const { from, to, fromName, toName, network, txType } = transaction;
      const idAddress = side === 'to' ? to : from;
      const name = side === 'to' ? toName : fromName;
      const sideType = getTransactionSideType(txType, side);

      return sideType === 'service' ? (
        <ServiceLink serviceId={idAddress} serviceName={name} />
      ) : sideType === 'external' ? (
        <>
          <Box mr={2}>
            <ChainIcon network={network} />
          </Box>
          <ZigTypography>{idAddress}</ZigTypography>
        </>
      ) : (
        <ZignalyAccount name={name} />
      );
    },
    [],
  );

  const renderRowSubComponent = useCallback((row) => {
    return (
      <TransactionPanel>
        <Box display='flex' justifyContent='center'>
          <TypographyPanelLabel>{t('details.from')}</TypographyPanelLabel>
          <FromTo side='from' transaction={row.original} />
          <ArrowRightAlt style={{ margin: '0 21px' }} />
          <TypographyPanelLabel>{t('details.to')}</TypographyPanelLabel>
          <FromTo side='to' transaction={row.original} />
        </Box>
        <Box display='flex' alignItems='center'>
          <TypographyPanelLabel>{t('details.txHash')}</TypographyPanelLabel>
          <TypographyAddress>{row.original.txId}</TypographyAddress>
        </Box>
        {row.original.note && (
          <Box display='flex' alignItems='center'>
            <TypographyPanelLabel>{t('details.note')}</TypographyPanelLabel>
            <TypographyAddress>{row.original.note}</TypographyAddress>
          </Box>
        )}
      </TransactionPanel>
    );
  }, []);

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
            initialState={initialStateTable}
            hideOptionsButton={false}
            renderRowSubComponent={renderRowSubComponent}
            pagination={false}
          />
        </InfiniteScroll>
      )}
    />
  );
};

export default TransactionsHistoryTable;
