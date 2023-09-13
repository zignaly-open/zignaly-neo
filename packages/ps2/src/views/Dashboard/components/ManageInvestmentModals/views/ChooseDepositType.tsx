import React, { useMemo } from 'react';
import {
  CenteredLoader,
  ZigArrowOutIcon,
  ZigButton,
  ZigPlusIcon,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { BUY_CRYPTO_URL } from '../../../../../util/constants';
import { ChooseDepositTypeViews } from '../types';
import ChooseBetweenTwo from './ChooseBetweenTwo';
import { useCoinBalances } from '../../../../../apis/coin/use';
import CoinOption from '../forms/atoms/CoinOption';
import { allowedDeposits } from '../../../../../util/coins';
import { useActiveExchange } from '../../../../../apis/user/use';
import { CoinsSelect } from '../../../../Balance/components/SwapCoinsModal/types';
import SwapForm from '../forms/SwapForm';
import { Box, useTheme } from '@mui/material';

const ChooseDepositType: React.FC<{
  coin: string;
  refetchBalance: () => void;
  setView: (view: ChooseDepositTypeViews) => void;
  close: () => void;
}> = ({ coin, setView, close, refetchBalance }) => {
  const { t } = useTranslation('deposit-crypto');
  const theme = useTheme();
  const { exchangeType, internalId } = useActiveExchange();
  const { data: balances, isLoading: isLoadingBalances } = useCoinBalances({
    convert: true,
  });
  const coinOptionsAllowedSwapFrom = useMemo(() => {
    if (!balances) return [];

    return Object.entries(balances)
      .map(([c, balance]) => ({
        value: c,
        coin: c,
        available: balance?.balanceFree || 0,
        availableInUsd: balance?.balanceFreeUSDT || 0,
        label: <ZigTypography>{c}</ZigTypography>,
      }))
      .filter((c) => c.available > 0 && allowedDeposits.spot.includes(c.coin));
  }, [balances]);
  const coinSwapTo = useMemo(() => {
    if (!balances) return {} as CoinsSelect;
    return Object.entries(balances)
      .map(([c, balance]) => ({
        value: c,
        coin: c,
        available: balance?.balanceFree || 0,
        availableInUsd: balance?.balanceFreeUSDT || 0,
        label: (
          <CoinOption
            key={c}
            coin={c}
            name={''}
            prefixId={'swap-coins-modal'}
          />
        ),
      }))
      .find((c) => c.coin === coin);
  }, [balances]);
  if (isLoadingBalances) {
    return <CenteredLoader />;
  }
  const showSwap =
    exchangeType === 'spot' &&
    coinOptionsAllowedSwapFrom.some((el) => el.availableInUsd < 10);

  return (
    <>
      <ChooseBetweenTwo
        leftOptionSize={!showSwap ? 6 : 5}
        rightOptionSize={!showSwap ? 4 : 5}
        leftOption={
          !showSwap && (
            <SwapForm
              refetchBalance={refetchBalance}
              closeDepositSwap={close}
              coinSwapTo={coinSwapTo}
              coinsAllowedSwapFrom={coinOptionsAllowedSwapFrom}
              internalId={internalId}
            />
          )
        }
        rightOption={
          !showSwap && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <ZigTypography whiteSpace={'nowrap'}>
                {t('service-swap.deposit-purchase', { coin })}
              </ZigTypography>
              <ZigButton
                onClick={() => setView(ChooseDepositTypeViews.DepositView)}
                id={'modal-choose-deposit-type__deposit'}
                variant={'outlined'}
                sx={{ minWidth: '133px' }}
                size={'large'}
                startIcon={
                  <ZigPlusIcon
                    width={'9px'}
                    height={'9px'}
                    style={{ marginBottom: '4px' }}
                    color={theme.palette.neutral300}
                  />
                }
              >
                {t('service-deposit.buttons.deposit', { coin })}
              </ZigButton>
              <ZigButton
                size={'large'}
                variant={'outlined'}
                href={BUY_CRYPTO_URL}
                id={'modal-choose-deposit-type__purchase'}
                endIcon={
                  <ZigArrowOutIcon
                    width={'9px'}
                    height={'9px'}
                    style={{ marginBottom: '4px' }}
                    color={theme.palette.neutral300}
                  />
                }
                sx={{ padding: '8px 20px' }}
              >
                {t('service-deposit.buttons.purchase', { coin })}
              </ZigButton>
            </Box>
          )
        }
        description={t(
          !showSwap
            ? 'service-swap.description'
            : 'service-deposit.description',
          { coin },
        )}
        descriptionProps={{ id: 'modal-choose-deposit-type__description' }}
        cta1={t('service-deposit.buttons.deposit', { coin })}
        cta2={t('service-deposit.buttons.purchase', { coin })}
        button1Props={{
          id: 'modal-choose-deposit-type__deposit',
          onClick: () => setView(ChooseDepositTypeViews.DepositView),
        }}
        button2Props={{
          href: BUY_CRYPTO_URL,
          id: 'modal-choose-deposit-type__purchase',
          endIcon: (
            <ZigArrowOutIcon
              width={'9px'}
              height={'9px'}
              style={{ marginBottom: '4px' }}
            />
          ),
          sx: { padding: '8px 20px' },
        }}
        explainer1={t('service-deposit.transfer-crypto', { coin })}
        explainer1Props={{ id: 'modal-choose-deposit-type__transfer-crypto' }}
        explainer2={t('service-deposit.buy-crypto', { coin })}
        explainer2Props={{ id: 'modal-choose-deposit-type__buy-crypto' }}
      />
    </>
  );
};

export default ChooseDepositType;
