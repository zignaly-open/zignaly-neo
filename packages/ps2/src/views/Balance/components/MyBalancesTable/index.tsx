import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ZigTable,
  ZigTablePriceLabel,
  createColumnHelper,
  ZigButton,
} from '@zignaly-open/ui';
import { ZigSwapCircleIcon } from '@zignaly-open/ui/icons';
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
import { useOpenWithdrawModal } from '../../../Dashboard/components/ManageInvestmentModals/WithdrawModal';
import { useZModal } from '../../../../components/ZModal/use';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import CoinLabel from 'components/CoinLabel';
import { ROUTE_MY_BALANCES_DEPOSIT_COIN } from '../../../../routes';
import { useBalanceQuery } from 'apis/user/api';
import SwapCoinsModal from '../SwapCoinsModal';
import { useOpenDepositModal } from '../../../Dashboard/components/ManageInvestmentModals/DepositModal';
import { ButtonsWrapper, TableWrapper } from './styles';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useOpenBuyModal } from 'views/Dashboard/components/ManageInvestmentModals/BuyModal';

const MyBalancesTable = (): JSX.Element => {
  const { t } = useTranslation(['my-balances', 'action']);
  const balancesEndpoint = useCoinBalances({ convert: true, refetch: true });
  const coinsEndpoint = useExchangeCoinsList();
  const exchange = useActiveExchange();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const { showModal } = useZModal();
  const openWithdrawModal = useOpenWithdrawModal();
  const showDepositModal = useOpenDepositModal(ROUTE_MY_BALANCES_DEPOSIT_COIN);
  const showBuyModal = useOpenBuyModal();

  // Trigger balance update to be sure that balance widget matches coins data
  useBalanceQuery(
    {
      exchangeInternalId: exchange?.internalId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !exchange?.internalId,
    },
  );
  const getFilteredData = useCallback(
    (coins: CoinDetails, balances: CoinBalances) => {
      // Populate coins that can be deposited
      const depositCoinsBalances: CoinBalances = Object.fromEntries(
        allowedDeposits[exchange?.exchangeType]?.map((coin) => [
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
            allowedDeposits[exchange?.exchangeType]?.includes(coin) ||
            +balance.balanceTotal > 0,
        )
        .map(([coin, balance]) => ({ coin, balance }));
    },
    [exchange?.exchangeType, t],
  );
  const hasNonZeroBalance = useMemo(() => {
    if (coinsEndpoint?.isSuccess && balancesEndpoint?.isSuccess) {
      return getFilteredData(coinsEndpoint?.data, balancesEndpoint?.data).some(
        (coin) =>
          allowedDeposits.spot.includes(coin.coin) &&
          +coin?.balance?.balanceTotal !== 0,
      );
    }
    return true;
  }, [coinsEndpoint?.data, balancesEndpoint?.data]);

  const columnHelper = createColumnHelper<BalanceTableDataType>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('coin', {
        header: t('tableHeader.coin'),
        cell: ({ getValue, row: { original } }) => (
          <Box
            minHeight={'60px'}
            alignItems={'center'}
            display={'flex'}
            maxWidth={'110px'}
            pl={!sm && '7px'}
          >
            <CoinLabel
              coin={getValue()}
              name={original.balance.name}
              id={'balances-table-coins'}
            />
          </Box>
        ),
      }),
      columnHelper.accessor((row) => +row.balance.balanceTotal, {
        id: 'totalBalance',
        header: t(
          md ? 'tableHeader.totalBalance' : 'tableHeader.balance-mobile',
        ),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel
            id={`balances-table-coins__total-balance-${row.original.coin}`}
            coin={row.original.coin}
            value={getValue()}
          />
        ),
      }),
      ...(md
        ? [
            columnHelper.accessor((row) => +row.balance.balanceFree, {
              id: 'balanceFree',
              header: t('tableHeader.availableBalance'),
              cell: ({ getValue, row }) => (
                <ZigTablePriceLabel
                  id={`balances-table-coins__balance-free-${row.original.coin}`}
                  coin={row.original.coin}
                  value={getValue()}
                />
              ),
            }),
          ]
        : []),
      ...(lg
        ? [
            columnHelper.accessor((row) => +row.balance.balanceLocked, {
              id: 'balanceLocked',
              header: t('tableHeader.lockedBalance'),
              cell: ({ getValue, row }) => (
                <ZigTablePriceLabel
                  id={`balances-table-coins__locked-${row.original.coin}`}
                  coin={row.original.coin}
                  value={getValue()}
                />
              ),
            }),
            columnHelper.accessor((row) => +row.balance.balanceTotalBTC, {
              id: 'balanceTotalBTC',
              header: t('tableHeader.valueBTC'),
              cell: ({ getValue, row }) => (
                <ZigTablePriceLabel
                  id={`balances-table-coins__total-btc-${row.original.coin}`}
                  coin='BTC'
                  value={getValue()}
                />
              ),
            }),
          ]
        : []),

      columnHelper.accessor((row) => +row.balance.balanceTotalUSDT, {
        id: 'balanceTotalUSDT',
        header: t(md ? 'tableHeader.valueUSD' : 'tableHeader.valueUSD-mobile'),
        cell: ({ getValue, row }) => (
          <ZigTablePriceLabel
            id={`balances-table-coins__total-usd-${row.original.coin}`}
            usd
            color='neutral100'
            value={getValue()}
          />
        ),
      }),
      ...(sm
        ? [
            columnHelper.display({
              id: 'action',
              cell: ({ row }) => (
                <Box
                  display='flex'
                  justifyContent='flex-end'
                  alignItems={'center'}
                >
                  {!!allowedDeposits[exchange?.exchangeType]?.includes(
                    row.original.coin,
                  ) && (
                    <ZigButton
                      narrow={
                        exchange?.exchangeType === 'spot' && hasNonZeroBalance
                      }
                      tooltip={hasNonZeroBalance && t('deposit')}
                      id={`balance-row__deposit-${row.original.coin}`}
                      onClick={() =>
                        showDepositModal({
                          selectedCoin: row.original.coin,
                        })
                      }
                      variant='outlined'
                      sx={{ maxHeight: '20px', mr: 1 }}
                    >
                      {exchange?.exchangeType === 'futures' ||
                      !hasNonZeroBalance ? (
                        t('deposit')
                      ) : (
                        <Add
                          sx={{ height: '18px', width: '22px' }}
                          color={'neutral300'}
                        />
                      )}
                    </ZigButton>
                  )}
                  {Object.keys(coinsEndpoint?.data || {}).includes(
                    row.original.coin,
                  ) && (
                    <Box>
                      <ZigButton
                        narrow
                        tooltip={t('withdraw')}
                        id={`balance-row__withdrawal-${row.original.coin}`}
                        onClick={() =>
                          openWithdrawModal({
                            selectedCoin: row.original.coin,
                          })
                        }
                        sx={{ maxHeight: '20px', mr: 1 }}
                        variant='outlined'
                      >
                        <Remove
                          sx={{ height: '18px', width: '22px' }}
                          color={'neutral300'}
                        />
                      </ZigButton>
                    </Box>
                  )}
                  {exchange?.exchangeType === 'spot' &&
                    Number(row.original.balance.balanceTotal) > 0 && (
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
          ]
        : []),
    ],
    [
      t,
      exchange?.exchangeType,
      hasNonZeroBalance,
      md,
      sm,
      lg,
      coinsEndpoint?.data,
    ],
  );

  return (
    <LayoutContentWrapper
      unmountOnRefetch={false}
      endpoint={[coinsEndpoint, balancesEndpoint]}
      content={([coins, balances]: [CoinDetails, CoinBalances]) => (
        <TableWrapper>
          <ZigTable
            pagination={!sm ? false : undefined}
            columnVisibility={sm}
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
          {!sm && (
            <ButtonsWrapper>
              <ZigButton
                size={'large'}
                sx={{ padding: '19px 5px' }}
                onClick={() => {
                  showDepositModal({ selectedCoin: 'USDT' });
                }}
              >
                {t('action:deposit')}
              </ZigButton>
              <ZigButton
                variant={'outlined'}
                onClick={() => {
                  openWithdrawModal();
                }}
                sx={{ padding: '5px 0' }}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <ExitToAppIcon />
                  {t('action:withdraw')}
                </Box>
              </ZigButton>
              <ZigButton
                variant={'outlined'}
                onClick={() => showBuyModal()}
                sx={{ padding: '5px 0' }}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <CurrencyExchangeIcon />
                  {t('action:buy-crypto')}
                </Box>
              </ZigButton>
              {exchange?.exchangeType === 'spot' && hasNonZeroBalance && (
                <ZigButton
                  variant={'outlined'}
                  onClick={() => {
                    showModal(SwapCoinsModal, {
                      refetchBalance: balancesEndpoint.refetch,
                    });
                  }}
                  sx={{ padding: '5px 0' }}
                >
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <ZigSwapCircleIcon width={25} height={25} />
                    {t('swap')}
                  </Box>
                </ZigButton>
              )}
            </ButtonsWrapper>
          )}
        </TableWrapper>
      )}
    />
  );
};

export default MyBalancesTable;
