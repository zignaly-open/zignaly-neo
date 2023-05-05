import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ZigTable,
  ZigTablePriceLabel,
  createColumnHelper,
  ZigButton,
} from '@zignaly-open/ui';
import { BalanceTableDataType } from './types';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { allowedDeposits } from 'util/coins';
import { Remove } from '@mui/icons-material';
import { useCoinBalances, useExchangeCoinsList } from 'apis/coin/use';
import {
  CoinBalance,
  CoinDetail,
  CoinBalances,
  CoinDetails,
} from 'apis/coin/types';
import { mergeCoinsAndBalances } from '../../../../apis/coin/util';
import WithdrawModal from '../../../Dashboard/components/ManageInvestmentModals/WithdrawModal';
import { useZModal, useZRouteModal } from '../../../../components/ZModal/use';
import { Box } from '@mui/material';
import CoinLabel from 'components/CoinLabel';
import { ROUTE_MY_BALANCES_DEPOSIT_COIN } from '../../../../routes';

const MyBalancesTable = (): JSX.Element => {
  const { t } = useTranslation('my-balances');
  const balancesEndpoint = useCoinBalances({ convert: true, refetch: true });
  const coinsEndpoint = useExchangeCoinsList();
  const { exchangeType } = useActiveExchange();
  const { showModal } = useZModal();
  const showDepositModal = useZRouteModal(ROUTE_MY_BALANCES_DEPOSIT_COIN);

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
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel coin={row.original.coin} value={getValue()} />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceTotalBTC, {
        id: 'balanceTotalBTC',
        header: t('tableHeader.valueBTC'),
        cell: ({ getValue }) => (
          <ZigTablePriceLabel coin='BTC' value={getValue()} />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceTotalUSDT, {
        id: 'balanceTotalUSDT',
        header: t('tableHeader.valueUSD'),
        cell: ({ getValue }) => (
          <ZigTablePriceLabel usd color='neutral100' value={getValue()} />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.display({
        id: 'action',
        cell: ({ row }) => (
          <Box display='flex' justifyContent='flex-end' alignItems={'center'}>
            {!!allowedDeposits[exchangeType]?.includes(row.original.coin) && (
              <ZigButton
                id={'balance-row__deposit'}
                onClick={() =>
                  showDepositModal({
                    selectedCoin: row.original.coin,
                  })
                }
                variant='outlined'
                sx={{ maxHeight: '20px', mr: 1 }}
              >
                {t('deposit')}
              </ZigButton>
            )}
            <Box>
              <ZigButton
                narrow
                tooltip={t('withdraw')}
                id={'balance-row__withdrawal'}
                onClick={() =>
                  showModal(WithdrawModal, {
                    selectedCoin: row.original.coin,
                    ctaId: 'balances-table-row',
                  })
                }
                variant='outlined'
              >
                <Remove
                  sx={{ height: '18px', width: '22px' }}
                  color={'neutral300'}
                />
              </ZigButton>
            </Box>
          </Box>
        ),
      }),
    ],
    [t],
  );

  const getFilteredData = useCallback(
    (coins: CoinDetails, balances: CoinBalances) => {
      // Populate coins that can be deposited
      const depositCoinsBalances: CoinBalances = Object.fromEntries(
        allowedDeposits[exchangeType].map((coin) => [
          coin,
          {
            balanceFree: '',
            balanceFreeBTC: '',
            balanceFreeUSDT: '',
            balanceLocked: '',
            balanceLockedBTC: '',
            balanceLockedUSDT: '',
            balanceTotal: '',
            balanceTotalBTC: '',
            balanceTotalExchCoin: '',
            balanceTotalUSDT: '',
            exchCoin: '',
            maxWithdrawAmount: '',
          },
        ]),
      );

      return Object.entries<CoinBalance & CoinDetail>(
        mergeCoinsAndBalances(coins, { ...depositCoinsBalances, ...balances }),
      )
        .filter(
          ([coin, balance]) =>
            allowedDeposits[exchangeType]?.includes(coin) ||
            +balance.balanceTotal > 0,
        )
        .map(([coin, balance]) => ({ coin, balance }));
    },
    [exchangeType, t],
  );

  return (
    <LayoutContentWrapper
      unmountOnRefetch={true}
      endpoint={[coinsEndpoint, balancesEndpoint]}
      content={([coins, balances]: [CoinDetails, CoinBalances]) => (
        <ZigTable
          prefixId={'balance'}
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
