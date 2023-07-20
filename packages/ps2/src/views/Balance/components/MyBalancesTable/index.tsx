import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ZigTable,
  ZigTablePriceLabel,
  createColumnHelper,
  ZigButton,
  ZigSwapCircleIcon,
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
import WithdrawModal from '../../../Dashboard/components/ManageInvestmentModals/WithdrawModal';
import { useZModal, useZRouteModal } from '../../../../components/ZModal/use';
import { Box } from '@mui/material';
import CoinLabel from 'components/CoinLabel';
import { ROUTE_MY_BALANCES_DEPOSIT_COIN } from '../../../../routes';
import { useBalanceQuery } from 'apis/user/api';
import SwapCoinsModal, { coinsAllowedSwap } from '../SwapCoinsModal';

const MyBalancesTable = (): JSX.Element => {
  const { t } = useTranslation('my-balances');
  const balancesEndpoint = useCoinBalances({ convert: true, refetch: true });
  const coinsEndpoint = useExchangeCoinsList();
  const { exchangeType, internalId } = useActiveExchange();
  const [hasNonZeroBalance, setHasNonZeroBalance] = useState<boolean>(true);
  const { showModal } = useZModal();
  const showDepositModal = useZRouteModal(ROUTE_MY_BALANCES_DEPOSIT_COIN);
  // Trigger balance update to be sure that balance widget matches coins data
  useBalanceQuery(
    {
      exchangeInternalId: internalId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !internalId,
    },
  );

  const columnHelper = createColumnHelper<BalanceTableDataType>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('coin', {
        header: t('tableHeader.coin'),
        cell: ({ getValue, row: { original } }) => (
          <CoinLabel
            coin={getValue()}
            name={original.balance.name}
            id={'balances-table-coins'}
          />
        ),
      }),
      columnHelper.accessor((row) => row.balance.balanceTotal, {
        id: 'totalBalance',
        header: t('tableHeader.totalBalance'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel
            id={`balances-table-coins__total-balance-${row.original.coin}`}
            coin={row.original.coin}
            value={getValue()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceFree, {
        id: 'balanceFree',
        header: t('tableHeader.availableBalance'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel
            id={`balances-table-coins__balance-free-${row.original.coin}`}
            coin={row.original.coin}
            value={getValue()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceLocked, {
        id: 'balanceLocked',
        header: t('tableHeader.lockedBalance'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel
            id={`balances-table-coins__locked-${row.original.coin}`}
            coin={row.original.coin}
            value={getValue()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceTotalBTC, {
        id: 'balanceTotalBTC',
        header: t('tableHeader.valueBTC'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel
            id={`balances-table-coins__total-btc-${row.original.coin}`}
            coin='BTC'
            value={getValue()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => row.balance.balanceTotalUSDT, {
        id: 'balanceTotalUSDT',
        header: t('tableHeader.valueUSD'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel
            id={`balances-table-coins__total-usd-${row.original.coin}`}
            usd
            color='neutral100'
            value={getValue()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.display({
        id: 'action',
        cell: ({ row }) => (
          <Box display='flex' justifyContent='flex-end' alignItems={'center'}>
            {!!allowedDeposits[exchangeType]?.includes(row.original.coin) && (
              <ZigButton
                narrow={exchangeType === 'spot' && hasNonZeroBalance}
                tooltip={t('deposit')}
                id={`balance-row__deposit-${row.original.coin}`}
                onClick={() =>
                  showDepositModal({
                    selectedCoin: row.original.coin,
                  })
                }
                variant='outlined'
                sx={{ maxHeight: '20px', mr: 1 }}
              >
                {exchangeType === 'futures' || !hasNonZeroBalance ? (
                  t('deposit')
                ) : (
                  <Add
                    sx={{ height: '18px', width: '22px' }}
                    color={'neutral300'}
                  />
                )}
              </ZigButton>
            )}
            <Box>
              <ZigButton
                narrow
                tooltip={t('withdraw')}
                id={`balance-row__withdrawal-${row.original.coin}`}
                onClick={() => {
                  showModal(WithdrawModal, {
                    selectedCoin: row.original.coin,
                  });
                }}
                sx={{ maxHeight: '20px', mr: 1 }}
                variant='outlined'
              >
                <Remove
                  sx={{ height: '18px', width: '22px' }}
                  color={'neutral300'}
                />
              </ZigButton>
            </Box>
            {exchangeType === 'spot' &&
              Number(row.original.balance.balanceTotal) > 0 &&
              coinsAllowedSwap.includes(row.original.coin) && (
                <ZigButton
                  id={`balance-row__swap-coins-${row.original.coin}`}
                  onClick={() =>
                    showModal(SwapCoinsModal, {
                      selectedCoin: row.original,
                      refetchBalance: balancesEndpoint.refetch,
                    })
                  }
                  variant='outlined'
                  startIcon={
                    <Box mt={'2px'}>
                      <ZigSwapCircleIcon width={15} height={15} />
                    </Box>
                  }
                >
                  {t('swap')}
                </ZigButton>
              )}
          </Box>
        ),
      }),
    ],
    [t, exchangeType],
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
  useEffect(() => {
    if (coinsEndpoint?.data && balancesEndpoint?.data) {
      setHasNonZeroBalance(
        getFilteredData(coinsEndpoint?.data, balancesEndpoint?.data).some(
          (coin) =>
            coinsAllowedSwap.includes(coin.coin) &&
            +coin?.balance?.balanceTotal !== 0,
        ),
      );
    }
  }, [coinsEndpoint.isFetching, balancesEndpoint.isFetching]);

  return (
    <LayoutContentWrapper
      unmountOnRefetch={false}
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
