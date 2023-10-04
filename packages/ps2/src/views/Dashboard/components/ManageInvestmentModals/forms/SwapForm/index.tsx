import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CoinsSelect } from '../../../../../Balance/components/SwapCoinsModal/types';
import { trimZeros, ZigButton, ZigInputAmount } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { SwapFormProps } from './types';
import { useForm, Controller } from 'react-hook-form';
import { useConvertPreview } from '../../../../../../apis/coin/use';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertAmountValidation } from '../../../../../Balance/components/SwapCoinsModal/validation';
import { Box } from '@mui/material';
import { ChooseDepositTypeViews } from '../../types';

function SwapForm({
  coinSwapTo,
  coinsAllowedSwapFrom,
  setView,
  setConfirmSwapData,
  setConvertPreviewData,
}: SwapFormProps) {
  const { t } = useTranslation('deposit-crypto');
  const [selectedFromToken, setSelectedFromToken] = useState<CoinsSelect>(
    coinsAllowedSwapFrom?.reduce((acc, curr) =>
      acc.availableInUsd > curr.availableInUsd ? acc : curr,
    ),
  );

  const [minAmount, setMinAmount] = useState<number>(0);

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    reset,
    formState: { isValid, errors },
  } = useForm<{ toCoinAmount: string; fromCoinAmount: string }>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      toCoinAmount: '',
      fromCoinAmount: '',
    },
    resolver: yupResolver(
      convertAmountValidation({
        min: minAmount,
        coin: selectedFromToken.coin,
        balance: selectedFromToken.available,
      }),
    ),
  });

  const amount = watch('fromCoinAmount');
  const { data: convertPreview, isFetching: isFetchingConvertPreview } =
    useConvertPreview({
      from: selectedFromToken.coin,
      amount,
      to: coinSwapTo,
    });
  useEffect(() => {
    if (convertPreview) {
      setMinAmount(trimZeros((convertPreview?.min).toFixed(8)));
      setConvertPreviewData(convertPreview);
      setConfirmSwapData({
        toCoinAmount:
          (convertPreview?.side === 'buy'
            ? 1 / convertPreview.lastPrice
            : convertPreview.lastPrice) * Number(amount),
        fromCoinAmount: Number(amount),
        fromCoin: selectedFromToken.coin,
      });
    }

    if (amount) {
      trigger('fromCoinAmount');
    }
  }, [convertPreview, isFetchingConvertPreview, trigger, minAmount]);
  
  const canSubmit = useMemo(
    () => isValid && coinSwapTo && selectedFromToken.coin && amount,
    [isValid, coinSwapTo, selectedFromToken.coin, amount],
  );
  
  const handleTokenChange = useCallback(
    (token: CoinsSelect) => {
      setSelectedFromToken(token);
      setMinAmount(0);
      reset();
    },
    [reset],
  );

  return (
    <form
      onSubmit={handleSubmit(({ fromCoinAmount }) => {
        setConfirmSwapData({
          toCoinAmount:
            (convertPreview?.side === 'buy'
              ? 1 / convertPreview.lastPrice
              : convertPreview.lastPrice) * Number(fromCoinAmount),
          fromCoinAmount: Number(fromCoinAmount),
          fromCoin: selectedFromToken.coin,
        });
        setView(ChooseDepositTypeViews.SwapConfirmView);
      })}
    >
      <Controller
        name='fromCoinAmount'
        control={control}
        defaultValue=''
        rules={{ required: true }}
        render={({ field: fromField }) => (
          <ZigInputAmount
            error={t(errors.fromCoinAmount?.message)}
            labelInline={false}
            withCoinSelector
            tokenOptions={coinsAllowedSwapFrom}
            id={'swap-coins-modal__from-input-amount'}
            label={t('service-swap.convert-to-coin', { coin: coinSwapTo })}
            showMaxButton={false}
            selectSx={{ width: '117px' }}
            coin={selectedFromToken}
            onTokenChange={handleTokenChange}
            balance={selectedFromToken.available}
            extraInfo={{ wrapExtraInfo: true }}
            {...fromField}
          />
        )}
      />

      <Box position={'relative'} mt={1.5} ml={3}>
        <ZigButton
          id={'swap-coins-modal__continue'}
          loading={isFetchingConvertPreview}
          size={'large'}
          type={'submit'}
          disabled={!canSubmit}
        >
          {t('service-swap.convert')}
        </ZigButton>
      </Box>
    </form>
  );
}

export default SwapForm;
