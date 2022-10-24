import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  PriceLabel,
  CoinLabel,
  sortByValue,
  UsdPriceLabel,
} from '@zignaly-open/ui';
import { MyBalancesTableDataType } from './types';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { allowedDeposits } from 'util/coins';
import {
  useCoinBalances,
  useExchangeCoinsList,
} from '../../../../apis/coin/use';
import {
  CoinBalance,
  CoinDetail,
  CoinBalances,
  CoinDetails,
} from '../../../../apis/coin/types';
import { mergeCoinsAndBalances } from '../../../../apis/coin/util';

const initialStateTable = {
  sortBy: [
    {
      id: 'valueUSD',
      desc: true,
    },
  ],
};

const MyBalancesTable = (): JSX.Element => {
  const { t } = useTranslation('my-balances');
  const balancesEndpoint = useCoinBalances({ convert: true, refetch: true });
  const coinsEndpoint = useExchangeCoinsList();
  const { exchangeType } = useActiveExchange();

  const columns: TableProps<MyBalancesTableDataType>['columns'] = useMemo(
    () => [
      {
        Header: t('tableHeader.coin'),
        accessor: 'coin',
        Cell: ({ cell: { value } }) => (
          <CoinLabel coin={value.symbol} name={value.name} />
        ),
        sortType: (a, b) =>
          a.values.coin?.symbol?.localeCompare(b.values.coin?.symbol),
      },
      {
        Header: t('tableHeader.totalBalance'),
        accessor: 'total',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={value.symbol} value={value.balanceTotal} />
        ),
        sortType: (a, b) =>
          sortByValue(a.values.total.balanceTotal, b.values.total.balanceTotal),
      },
      {
        Header: t('tableHeader.availableBalance'),
        accessor: 'available',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={value.symbol} value={value.balanceFree} />
        ),
        sortType: (a, b) =>
          sortByValue(
            a.values.available.balanceFree,
            b.values.available.balanceFree,
          ),
      },
      {
        Header: t('tableHeader.lockedBalance'),
        accessor: 'locked',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={value.symbol} value={value.balanceLocked} />
        ),
        sortType: (a, b) =>
          sortByValue(a.values.balanceLocked, b.values.balanceLocked),
      },
      {
        Header: t('tableHeader.valueBTC'),
        accessor: 'valueBTC',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={'btc'} value={value.balanceTotalBTC} />
        ),
        sortType: (a, b) =>
          sortByValue(
            a.values.valueBTC.balanceTotalBTC,
            b.values.valueBTC.balanceTotalBTC,
          ),
      },
      {
        Header: t('tableHeader.valueUSD'),
        accessor: 'valueUSD',
        Cell: ({ cell: { value } }) => (
          <UsdPriceLabel value={value.balanceTotalUSDT} />
        ),
        sortType: (a, b) =>
          sortByValue(
            a.values.valueUSD.balanceTotalUSDT,
            b.values.valueUSD.balanceTotalUSDT,
          ),
      },
    ],
    [t],
  );

  const getFilteredData = useCallback(
    (coins: CoinDetails, balances: CoinBalances) =>
      Object.entries<CoinBalance & CoinDetail>(
        mergeCoinsAndBalances(coins, balances),
      )
        .filter(
          ([coin, balance]) =>
            allowedDeposits[exchangeType]?.includes(coin) ||
            +balance.balanceTotal > 0,
        )
        .map(([coin, balance]) => ({
          coin: { symbol: coin, name: balance.name },
          total: {
            symbol: coin,
            balanceTotal: balance.balanceTotal,
          },
          available: {
            symbol: coin,
            balanceFree: balance.balanceFree,
          },
          locked: {
            symbol: coin,
            balanceLocked: balance.balanceLocked,
          },
          valueBTC: {
            balanceTotalBTC: balance.balanceTotalBTC,
          },
          valueUSD: {
            balanceTotalUSDT: balance.balanceTotalUSDT,
          },
        })),
    [exchangeType],
  );

  return (
    <LayoutContentWrapper
      endpoint={[coinsEndpoint, balancesEndpoint]}
      content={([coins, balances]: [CoinDetails, CoinBalances]) => (
        <Table
          type={'pagedWithData'}
          columns={columns}
          data={getFilteredData(coins, balances)}
          initialState={initialStateTable}
          hideOptionsButton={false}
          isUserTable={false}
        />
      )}
    />
  );
};

export default MyBalancesTable;
