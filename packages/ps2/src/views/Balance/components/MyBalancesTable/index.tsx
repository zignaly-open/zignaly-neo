import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CoinLabel,
  UsdPriceLabel,
  IconButton,
  ZigTable,
  ZigTablePriceLabel,
  createColumnHelper,
} from '@zignaly-open/ui';
import { BalanceTableDataType } from './types';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { allowedDeposits } from 'util/coins';
import { Add, Remove } from '@mui/icons-material';
import { useCoinBalances, useExchangeCoinsList } from 'apis/coin/use';
import {
  CoinBalance,
  CoinDetail,
  CoinBalances,
  CoinDetails,
} from 'apis/coin/types';
import { mergeCoinsAndBalances } from '../../../../apis/coin/util';
import DepositModal from '../../../Dashboard/components/ManageInvestmentModals/DepositModal';
import WithdrawModal from '../../../Dashboard/components/ManageInvestmentModals/WithdrawModal';
import { useZModal } from '../../../../components/ZModal/use';
import { Box } from '@mui/material';

const MyBalancesTable = (): JSX.Element => {
  const { t } = useTranslation('my-balances');
  const balancesEndpoint = useCoinBalances({ convert: true, refetch: true });
  const coinsEndpoint = useExchangeCoinsList();
  const { exchangeType } = useActiveExchange();
  const { showModal } = useZModal();

  const columnHelper = createColumnHelper<BalanceTableDataType>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('coin', {
        header: t('tableHeader.coin'),
        cell: ({ getValue, row: { original } }) => (
          <CoinLabel coin={getValue()} name={original.balance.name} />
        ),
      }),
      columnHelper.accessor((row) => row.balance.balanceTotal, {
        id: 'totalBalance',
        header: t('tableHeader.totalBalance'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel coin={row.original.coin} value={getValue()} />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceFree, {
        id: 'balanceFree',
        header: t('tableHeader.availableBalance'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel coin={row.original.coin} value={getValue()} />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceLocked, {
        id: 'balanceLocked',
        header: t('tableHeader.lockedBalance'),
        cell: ({ getValue }) => (
          <ZigTablePriceLabel coin='BTC' value={getValue()} />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceTotalBTC, {
        id: 'balanceTotalBTC',
        header: t('tableHeader.valueBTC'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel coin={row.original.coin} value={getValue()} />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceTotalUSDT, {
        id: 'balanceTotalUSDT',
        header: t('tableHeader.valueUSD'),
        cell: ({ getValue }) => <UsdPriceLabel value={getValue()} />,
        sortingFn: 'alphanumeric',
      }),
      columnHelper.display({
        id: 'action',
        cell: ({ row }) => (
          <Box display='flex' justifyContent='flex-end'>
            {!!allowedDeposits[exchangeType]?.includes(row.original.coin) && (
              <IconButton
                icon={<Add color={'neutral300'} />}
                onClick={() =>
                  showModal(DepositModal, {
                    ctaId: 'balances-table-row',
                    selectedCoin: row.original.coin,
                  })
                }
                variant='secondary'
              />
            )}
            {+row.original.balance.balanceTotal > 0 && (
              <IconButton
                icon={<Remove color={'neutral300'} />}
                onClick={() =>
                  showModal(WithdrawModal, {
                    ctaId: 'balances-table-row',
                    selectedCoin: row.original.coin,
                  })
                }
                variant='secondary'
              />
            )}
          </Box>
        ),
      }),
    ],
    [],
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
        .map(([coin, balance]) => ({ coin, balance })),
    [exchangeType, t],
  );

  return (
    <LayoutContentWrapper
      unmountOnRefetch={true}
      endpoint={[coinsEndpoint, balancesEndpoint]}
      content={([coins, balances]: [CoinDetails, CoinBalances]) => (
        <ZigTable
          columns={columns}
          data={getFilteredData(coins, balances)}
          initialState={{
            sorting: [
              {
                id: 'balanceTotalUSDT',
                desc: true,
              },
            ],
          }}
        />
      )}
    />
  );
};

export default MyBalancesTable;
