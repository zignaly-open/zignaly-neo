import React, { useMemo, useState } from 'react';
import { SwapCoinsModalProps, CoinsSelect } from './types';
import { CenteredLoader, ZigButton, ZigInputAmount } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { Form, ModalActions } from 'components/ZModal';
import CoinOption from '../../../Dashboard/components/ManageInvestmentModals/forms/atoms/CoinOption';
import {
  useCoinBalances,
  useExchangeCoinsList,
  useQuoteAssetsCoin,
} from '../../../../apis/coin/use';
import { SwapHoriz } from '@mui/icons-material';
import { Box } from '@mui/material';

function SwapCoinsForm({ setStep, step, selectedCoin }: SwapCoinsModalProps) {
  const { t } = useTranslation('swap-coins');

  const {
    // handleSubmit,
    control,
    // watch,
    // setValue,
    // getValues,
    // trigger,
    // formState: { isValid, errors },
  } = useForm();
  const { data: coins, isLoading: isLoadingCoins } = useExchangeCoinsList();
  const { data: balances, isLoading: isLoadingBalances } = useCoinBalances({
    convert: true,
  });
  const coinOptions = useMemo(() => {
    if (!balances || !coins) return [];

    return Object.entries(balances).map(([c]) => {
      const balance = balances[c];
      const name = coins[c]?.name || '';
      return {
        coin: c,
        name,
        available: balance?.balanceFree || 0,
        label: (
          <CoinOption
            key={c}
            coin={c}
            name={''}
            prefixId={'swap-coins-modal'}
          />
        ),
      };
    });
  }, [balances, coins]);

  const [selectedFromToken, setSelectedFromToken] = useState<CoinsSelect>(
    coinOptions.find((coin) => coin.coin === selectedCoin.coin),
  );
  const { data: allowedCoinsToSwap, isLoading: isLoadingAssets } =
    useQuoteAssetsCoin(selectedFromToken.coin);
  const coinOptions2 = useMemo(() => {
    if (!balances || !coins || !allowedCoinsToSwap) return [];

    return allowedCoinsToSwap.map((c) => {
      const balance = balances[c];
      const name = coins[c]?.name || '';
      return {
        coin: c,
        name,
        available: balance?.balanceFree || 0,
        label: (
          <CoinOption
            key={c}
            coin={c}
            name={''}
            prefixId={'swap-coins-modal'}
          />
        ),
      };
    });
  }, [balances, coins, allowedCoinsToSwap]);
  const [selectedToToken, setSelectedToToken] = useState<CoinsSelect>(
    {} as CoinsSelect,
  );
  const nonZeroBalanceCoinOptions = coinOptions.filter((c) => c.available > 0);
  if (isLoadingCoins || isLoadingBalances || isLoadingAssets) {
    return <CenteredLoader />;
  }

  return (
    <Form>
      <Controller
        name='fromCoin'
        control={control}
        defaultValue=''
        render={({ field: fromField }) => (
          <ZigInputAmount
            labelInline={false}
            withCoinSelector
            tokenOptions={nonZeroBalanceCoinOptions}
            id={'swap-coins-modal__from-input-amount'}
            label={t('from-input.label')}
            wide
            coin={selectedFromToken}
            onTokenChange={(token: typeof selectedFromToken) => {
              setSelectedFromToken(token);
              setSelectedToToken({} as typeof selectedToToken);
            }}
            balance={selectedFromToken.available}
            {...fromField}
          />
        )}
      />
      <Box margin={'0 auto'}>
        <SwapHoriz sx={{ width: '30px', height: '30px' }} />
      </Box>

      <Controller
        name='toCoin'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <ZigInputAmount
            disabled={!selectedToToken?.coin}
            showMaxButton={false}
            withCoinSelector
            tokenOptions={coinOptions2}
            id={'swap-coins-modal__to-input-amount'}
            label={t('to-input.label')}
            wide
            labelInline={false}
            coin={selectedToToken}
            onTokenChange={(token: typeof selectedToToken) => {
              setSelectedToToken(token);
            }}
            {...field}
          />
        )}
      />

      <ModalActions position={'relative'}>
        <ZigButton
          size={'large'}
          onClick={() => {
            setStep('confirm');
          }}
        >
          {t('continue')}
        </ZigButton>
      </ModalActions>
      {step}
    </Form>
  );
}

export default SwapCoinsForm;
