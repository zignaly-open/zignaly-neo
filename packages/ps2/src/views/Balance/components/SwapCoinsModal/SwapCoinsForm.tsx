import React, { useEffect, useMemo, useState } from 'react';
import { SwapCoinsModalProps, CoinsSelect } from './types';
import {
  CenteredLoader,
  trimZeros,
  ZigButton,
  ZigInputAmount,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { Form, ModalActions } from 'components/ZModal';
import CoinOption from '../../../Dashboard/components/ManageInvestmentModals/forms/atoms/CoinOption';
import {
  useCoinBalances,
  useConvertPreview,
  useQuoteAssetsCoin,
} from '../../../../apis/coin/use';
import { SwapHoriz } from '@mui/icons-material';
import { Box } from '@mui/material';
import SwapCoinsConfirmForm from './SwapCoinsConfirmForm';
import { useConvertMutation } from '../../../../apis/coin/api';
import { useActiveExchange } from '../../../../apis/user/use';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertAmountValidation } from './validation';

function SwapCoinsForm({
  setStep,
  step,
  selectedCoin,
  close,
}: SwapCoinsModalProps) {
  const { t } = useTranslation('swap-coins');
  const exchange = useActiveExchange();
  const [confirmationData, setConfirmationData] = useState<{
    fromCoinAmount: number;
    toCoinAmount: number;
    fromCoin: string;
    toCoin: string;
  }>();
  const [convert, convertStatus] = useConvertMutation();
  const handleConvert = async () => {
    await convert({
      exchangeInternalId: exchange?.internalId,
      from: confirmationData.fromCoin,
      qty: confirmationData.fromCoinAmount,
      to: confirmationData.toCoin,
    });
  };
  const { data: balances, isLoading: isLoadingBalances } = useCoinBalances({
    convert: true,
  });
  const coinOptions = useMemo(() => {
    if (!balances) return [];

    return Object.entries(balances).map(([c]) => {
      const balance = balances[c];
      return {
        value: c,
        coin: c,
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
  }, [balances]);

  const [selectedFromToken, setSelectedFromToken] = useState<CoinsSelect>(
    coinOptions.find((coin) => coin.coin === selectedCoin.coin),
  );
  const [selectedToToken, setSelectedToToken] = useState<CoinsSelect>(
    {} as CoinsSelect,
  );
  const [minAmount, setMinAmount] = useState<number>(0);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    // getValues,
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
  const { data: convertPreview, isLoading: isLoadingConvertPreview } =
    useConvertPreview({
      from: selectedFromToken.coin,
      amount,
      to: selectedToToken.coin,
    });
  useEffect(() => {
    if (convertPreview)
      setMinAmount(trimZeros((convertPreview?.min).toFixed(8)));
    if (amount) {
      trigger('fromCoinAmount');
    }
  }, [convertPreview, isLoadingConvertPreview]);

  const { data: allowedCoinsSwapTo, isLoading: isLoadingAssets } =
    useQuoteAssetsCoin(selectedFromToken.coin);
  const coinOptionsSwapTo = useMemo(() => {
    if (!allowedCoinsSwapTo) return [];

    return allowedCoinsSwapTo.map((c) => {
      return {
        value: c,
        coin: c,
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
  }, [allowedCoinsSwapTo]);

  useEffect(() => {
    if (convertPreview && selectedToToken?.coin) {
      setValue(
        'toCoinAmount',
        trimZeros((+amount / convertPreview?.lastPrice).toFixed(8)).toString(),
      );
    }
  }, [amount, convertPreview]);
  const nonZeroBalanceCoinOptions = coinOptions.filter(
    (c) =>
      c.available > 0 && ['BUSD', 'USDT', 'BTC', 'ETH', 'BNB'].includes(c.coin),
  );
  if (isLoadingBalances || isLoadingAssets) {
    return <CenteredLoader />;
  }

  if (confirmationData && step === 'confirm') {
    return (
      <SwapCoinsConfirmForm
        rate={1 / convertPreview.lastPrice}
        action={handleConvert}
        close={close}
        status={convertStatus}
        {...confirmationData}
      />
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(({ fromCoinAmount, toCoinAmount }) => {
        setStep('confirm');
        setConfirmationData({
          toCoinAmount: Number(toCoinAmount),
          fromCoinAmount: Number(fromCoinAmount),
          toCoin: selectedToToken.coin,
          fromCoin: selectedFromToken.coin,
        });
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
            tokenOptions={nonZeroBalanceCoinOptions}
            id={'swap-coins-modal__from-input-amount'}
            label={t('from-input.label')}
            wide
            coin={selectedFromToken}
            onTokenChange={(token: CoinsSelect) => {
              setSelectedFromToken(token);
              setMinAmount(0);
              reset();
              setSelectedToToken({} as CoinsSelect);
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
        name='toCoinAmount'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <ZigInputAmount
            disabled
            showMaxButton={false}
            withCoinSelector
            tokenOptions={coinOptionsSwapTo}
            id={'swap-coins-modal__to-input-amount'}
            label={t('to-input.label')}
            wide
            labelInline={false}
            coin={selectedToToken}
            onTokenChange={(token: CoinsSelect) => {
              if (amount) {
                trigger('fromCoinAmount');
              }
              setSelectedToToken(token);
            }}
            {...field}
          />
        )}
      />

      <ModalActions position={'relative'}>
        <ZigButton
          loading={isLoadingConvertPreview}
          size={'large'}
          type={'submit'}
          disabled={
            !isValid ||
            !selectedToToken.coin ||
            !selectedFromToken.coin ||
            !amount ||
            isLoadingConvertPreview
          }
        >
          {t('continue')}
        </ZigButton>
      </ModalActions>
      {step}
    </Form>
  );
}

export default SwapCoinsForm;
