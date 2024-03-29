import React, { useEffect, useMemo, useState } from 'react';
import { SwapCoinsModalProps, CoinsSelect } from './types';
import {
  CenteredLoader,
  trimZeros,
  ZigAlertMessage,
  ZigButton,
  ZigInputAmount,
  ZigModalActions,
  ZigModalForm,
} from '@zignaly-open/ui';
import { ZigSwapCircleIcon } from '@zignaly-open/ui/icons';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import CoinOption from '../../../Dashboard/components/ManageInvestmentModals/forms/atoms/CoinOption';
import {
  useCoinBalances,
  useConvertPreview,
  useQuoteAssetsCoin,
} from '../../../../apis/coin/use';
import { Box } from '@mui/material';
import SwapCoinsConfirmForm from './SwapCoinsConfirmForm';
import { useActiveExchange } from '../../../../apis/user/use';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertAmountValidation } from './validation';
import { allowedDeposits } from '../../../../util/coins';
import { useOpenWithdrawModal } from '../../../Dashboard/components/ManageInvestmentModals/WithdrawModal';

function SwapCoinsForm({
  setStep,
  step,
  selectedCoin,
  refetchBalance,
  close,
}: SwapCoinsModalProps) {
  const { t } = useTranslation(['swap-coins', 'action']);
  const exchange = useActiveExchange();
  const [confirmationData, setConfirmationData] = useState<{
    fromCoinAmount: number;
    toCoinAmount: number;
    fromCoin: string;
    toCoin: string;
  }>();

  const { data: balances, isLoading: isLoadingBalances } = useCoinBalances({
    convert: true,
  });
  const coinOptionsAllowedSwapFrom = useMemo(() => {
    if (!balances) return [];

    return Object.entries(balances)
      .map(([c, balance]) => ({
        value: c,
        coin: c,
        available: +balance?.balanceFree || 0,
        label: (
          <CoinOption
            key={c}
            coin={c}
            name={''}
            prefixId={'swap-coins-modal'}
          />
        ),
      }))
      .filter((c) => c.available > 0);
  }, [balances]);

  const [selectedFromToken, setSelectedFromToken] = useState<CoinsSelect>(
    selectedCoin
      ? coinOptionsAllowedSwapFrom.find(
          (coin) => coin.coin === selectedCoin.coin,
        )
      : coinOptionsAllowedSwapFrom[0],
  );
  const [selectedToToken, setSelectedToToken] = useState<CoinsSelect>(
    {} as CoinsSelect,
  );
  const [minAmount, setMinAmount] = useState<number>(0);
  const openWithdrawModal = useOpenWithdrawModal();

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
    mode: 'all',
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
      to: selectedToToken.coin,
    });
  useEffect(() => {
    if (convertPreview)
      setMinAmount(trimZeros((convertPreview?.min).toFixed(8)));
  }, [convertPreview]);
  useEffect(() => {
    if (amount) {
      trigger('fromCoinAmount');
    }
  }, [minAmount]);

  const { data: allowedCoinsSwapTo, isFetching: isFetchingAssets } =
    useQuoteAssetsCoin(selectedFromToken.coin);
  const coinOptionsAllowedSwapTo = useMemo(() => {
    if (!allowedCoinsSwapTo) return [];

    return allowedCoinsSwapTo
      .filter((c) => allowedDeposits.spot.includes(c))
      .map((c) => ({
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
      }));
  }, [allowedCoinsSwapTo]);

  useEffect(() => {
    if (convertPreview && selectedToToken?.coin) {
      const calculatedValue =
        convertPreview.side === 'buy'
          ? (+amount / convertPreview.lastPrice).toFixed(8)
          : (+amount * convertPreview.lastPrice).toFixed(8);

      setValue('toCoinAmount', trimZeros(calculatedValue).toString());
    }
  }, [amount, convertPreview]);

  if (isLoadingBalances) {
    return <CenteredLoader />;
  }

  if (confirmationData && step === 'confirm') {
    return (
      <SwapCoinsConfirmForm
        refetchBalance={refetchBalance}
        rate={
          convertPreview?.side === 'buy'
            ? 1 / convertPreview.lastPrice
            : convertPreview.lastPrice
        }
        close={close}
        internalId={exchange?.internalId}
        {...confirmationData}
      />
    );
  }
  const canSubmit =
    isValid &&
    selectedToToken.coin &&
    selectedFromToken.coin &&
    amount &&
    watch('toCoinAmount');

  return (
    <ZigModalForm
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
            tokenOptions={coinOptionsAllowedSwapFrom}
            id={'swap-coins-modal__from-input-amount'}
            label={t('from-input.label')}
            wide
            selectSx={{ width: '160px' }}
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
        <ZigSwapCircleIcon
          id={'swap-coins-modal__swap-icon'}
          width={'35px'}
          height={'35px'}
        />
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
            tokenOptions={coinOptionsAllowedSwapTo}
            id={'swap-coins-modal__to-input-amount'}
            label={t('to-input.label')}
            wide
            selectSx={{ width: '160px' }}
            labelInline={false}
            coin={selectedToToken}
            onTokenChange={(token: CoinsSelect) => {
              if (amount) {
                trigger('fromCoinAmount');
                setValue('toCoinAmount', '');
              }
              setSelectedToToken(token);
            }}
            {...field}
          />
        )}
      />
      {!coinOptionsAllowedSwapTo.length && !isFetchingAssets && (
        <Box display={'flex'} gap={'30px'} justifyContent={'center'}>
          <ZigAlertMessage
            text={t('empty-list-warning', { coin: selectedFromToken.coin })}
          />
          <ZigButton
            narrow
            id={`balance-row__withdrawal-${selectedFromToken.coin}`}
            onClick={() =>
              openWithdrawModal({
                selectedCoin: selectedFromToken.coin,
              })
            }
            sx={{ maxHeight: '20px', mr: 1 }}
            variant='outlined'
          >
            {t('action:withdraw')}
          </ZigButton>
        </Box>
      )}

      <ZigModalActions position={'relative'}>
        <ZigButton
          id={'swap-coins-modal__continue'}
          loading={isFetchingConvertPreview}
          size={'large'}
          type={'submit'}
          disabled={!canSubmit}
        >
          {t('continue')}
        </ZigButton>
      </ZigModalActions>
      {step}
    </ZigModalForm>
  );
}

export default SwapCoinsForm;
