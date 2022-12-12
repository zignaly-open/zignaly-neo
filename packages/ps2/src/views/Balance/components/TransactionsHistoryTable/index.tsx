import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, CoinLabel, DateLabel, ZigPriceLabel } from '@zignaly-open/ui';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useTransactionsHistory } from '../../../../apis/coin/use';
import { Transaction } from '../../../../apis/coin/types';
import TransactionStateLabel from '../TransactionStateLabel';
import InfiniteScroll from 'react-infinite-scroll-component';
import CenteredLoader from 'components/CenteredLoader';

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

  const columns: TableProps<Transaction>['columns'] = useMemo(
    () => [
      {
        Header: t('tableHeader.date'),
        accessor: 'datetime',
        Cell: ({ cell: { value } }) => <DateLabel date={new Date(value)} />,
      },
      {
        Header: t('tableHeader.coin'),
        accessor: 'asset',
        Cell: ({ cell: { value } }) => <CoinLabel coin={value} name={'what'} />,
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
    ],
    [t],
  );

  return (
    <LayoutContentWrapper
      endpoint={[transactionsEndpoint]}
      content={([transactions]: [Transaction[]]) => (
        <InfiniteScroll
          style={{ overflow: 'visible' }}
          // scrollableTarget={container}
          dataLength={transactions.length}
          next={transactionsEndpoint.readMore}
          hasMore={transactionsEndpoint.hasMore}
          loader={<CenteredLoader />}
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
