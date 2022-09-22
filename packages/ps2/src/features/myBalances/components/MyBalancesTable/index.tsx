import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { useMyBalances } from '../../use';
import {
  Table,
  PriceLabel,
  CoinLabel,
  sortByValue,
  Expandable,
  InputText,
  SearchIcon,
} from '@zignaly-open/ui';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { MyBalancesTableDataType } from './types';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import { TableHead } from './styles';
import { AggregatedBalances, CoinBalance, CoinDetail } from '../../types';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';

const initialStateTable = {
  sortBy: [
    {
      id: 'totalBalance',
      desc: false,
    },
  ],
};

const MyBalancesTable = (): JSX.Element => {
  const theme = useTheme() as Theme;
  const { t } = useTranslation('my-balances');
  const balancesEndpoint = useMyBalances();

  const [searchBy, setSearchBy] = useState('');

  const columns: TableProps<MyBalancesTableDataType>['columns'] = useMemo(
    () => [
      {
        Header: t('my-balances.tableHeader.coin'),
        accessor: 'coin',
        Cell: ({ cell: { value } }) => (
          <CoinLabel coin={value.symbol} name={value.name} />
        ),
        sortType: (a, b) => sortByValue(a.values.symbol, b.values.symbol),
      },
      {
        Header: t('my-balances.tableHeader.totalBalance'),
        accessor: 'total',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={value.symbol} value={value.balanceTotal} />
        ),
        sortType: (a, b) =>
          sortByValue(a.values.total.balanceTotal, b.values.total.balanceTotal),
      },
      {
        Header: t('my-balances.tableHeader.availableBalance'),
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
        Header: t('my-balances.tableHeader.lockedBalance'),
        accessor: 'locked',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={value.symbol} value={value.balanceLocked} />
        ),
        sortType: (a, b) =>
          sortByValue(a.values.balanceLocked, b.values.balanceLocked),
      },
      {
        Header: t('my-balances.tableHeader.valueBTC'),
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
        Header: t('my-balances.tableHeader.valueUSD'),
        accessor: 'valueUSD',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={'usd'} value={value.balanceTotalUSDT} />
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
    (balances: AggregatedBalances) =>
      Object.entries<CoinBalance & CoinDetail>(balances || {})
        .filter(
          ([symbol, balance]) =>
            symbol.toLowerCase().includes(searchBy.toLowerCase()) ||
            balance.name.toLowerCase().includes(searchBy.toLowerCase()),
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
    [],
  );

  return (
    <LayoutContentWrapper
      endpoint={[balancesEndpoint]}
      content={(balances: AggregatedBalances) => (
        <>
          <TableHead>
            <Expandable value={searchBy}>
              {({ setExpanded }) => (
                <InputText
                  leftSideElement={
                    <SearchIcon
                      width={14}
                      height={14}
                      color={theme.neutral300}
                    />
                  }
                  minHeight={44}
                  value={searchBy}
                  onBlur={() => setExpanded(false)}
                  onFocus={() => setExpanded(true)}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setSearchBy(e.currentTarget.value)
                  }
                  placeholder={t('my-balances.table-search-placeholder')}
                />
              )}
            </Expandable>
          </TableHead>
          <Table
            type={'pagedWithData'}
            columns={columns}
            data={getFilteredData(balances)}
            initialState={initialStateTable}
            hideOptionsButton={false}
            isUserTable={false}
          />
        </>
      )}
    />
  );
};

export default MyBalancesTable;
