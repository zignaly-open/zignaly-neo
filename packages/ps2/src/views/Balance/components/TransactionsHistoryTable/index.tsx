import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  PriceLabel,
  CoinLabel,
  sortByValue,
  UsdPriceLabel,
  IconButton,
  DateLabel,
  ZigPriceLabel,
} from '@zignaly-open/ui';
import { MyBalancesTableDataType, TransferHistoryTableDataType } from './types';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { allowedDeposits } from 'util/coins';
import AddIcon from '@mui/icons-material/Add';
import {
  useCoinBalances,
  useExchangeCoinsList,
  useTransactions,
} from '../../../../apis/coin/use';
import {
  CoinBalance,
  CoinDetail,
  CoinBalances,
  CoinDetails,
  Transaction,
  Transactions,
} from '../../../../apis/coin/types';
import { mergeCoinsAndBalances } from '../../../../apis/coin/util';
import DepositModal from '../../../Dashboard/components/ManageInvestmentModals/DepositModal';
import { useZModal } from '../../../../components/ZModal/use';
import ConnectionStateLabel from 'views/TraderService/components/ConnectionStateLabel';
import TransactionStateLabel from '../TransactionStateLabel';

const initialStateTable = {
  sortBy: [
    {
      id: 'valueUSD',
      desc: true,
    },
  ],
};

const TransactionsHistoryTable = () => {
  const { t } = useTranslation('transactions-history');
  const transactionsEndpoint = useTransactions();
  const { exchangeType } = useActiveExchange();
  const { showModal } = useZModal();

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
        Cell: ({ cell: { value } }) => value,
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
      content={([transactions]: [Transactions]) => (
        <Table
          type={'pagedWithData'}
          columns={columns}
          data={transactions.transactions}
          initialState={initialStateTable}
          hideOptionsButton={false}
          isUserTable={false}
        />
      )}
    />
  );
};

export default TransactionsHistoryTable;
