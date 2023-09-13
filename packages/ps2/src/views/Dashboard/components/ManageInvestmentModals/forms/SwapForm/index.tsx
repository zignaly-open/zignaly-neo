import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CoinsSelect } from '../../../../../Balance/components/SwapCoinsModal/types';
import { trimZeros, ZigButton, ZigInputAmount } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { SwapFormProps } from './types';
import { useForm, Controller } from 'react-hook-form';
import ZModal, { Form, ModalActions } from 'components/ZModal';
import { useConvertPreview } from '../../../../../../apis/coin/use';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertAmountValidation } from '../../../../../Balance/components/SwapCoinsModal/validation';
import { useZModal } from '../../../../../../components/ZModal/use';
import SwapCoinsConfirmForm from '../../../../../Balance/components/SwapCoinsModal/SwapCoinsConfirmForm';
import { DialogProps } from '@mui/material/Dialog';

function SwapForm({
  coinSwapTo,
  coinsAllowedSwapFrom,
  internalId,
  closeDepositSwap,
  refetchBalance,
}: SwapFormProps) {
  const { t } = useTranslation('deposit-crypto');
  const { showModal } = useZModal();
  const [confirmationData, setConfirmationData] = useState<{
    fromCoinAmount: number;
    toCoinAmount: number;
    fromCoin: string;
  }>();
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
  const { data: convertPreview, isFetching: isFetchingConvertPreview } =
    useConvertPreview({
      from: selectedFromToken.coin,
      amount,
      to: coinSwapTo.coin,
    });
  useEffect(() => {
    if (convertPreview) {
      setMinAmount(trimZeros((convertPreview?.min).toFixed(8)));
      setConfirmationData({
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
    () => isValid && coinSwapTo.coin && selectedFromToken.coin && amount,
    [isValid, coinSwapTo.coin, selectedFromToken.coin, amount],
  );
  const SwapConfirmModal = ({
    close,
    ...props
  }: { close: () => void } & DialogProps) => {
    return (
      <ZModal
        id={'withdraw-modal'}
        width={720}
        close={close}
        title={t('service-swap.confirm-swap-title')}
        {...props}
      >
        <SwapCoinsConfirmForm
          closeDepositSwap={closeDepositSwap}
          refetchBalance={refetchBalance}
          rate={
            convertPreview?.side === 'buy'
              ? 1 / convertPreview.lastPrice
              : convertPreview.lastPrice
          }
          close={close}
          internalId={internalId}
          toCoin={coinSwapTo.coin}
          {...confirmationData}
        />
      </ZModal>
    );
  };
  const handleTokenChange = useCallback(
    (token: CoinsSelect) => {
      setSelectedFromToken(token);
      setMinAmount(0);
      reset();
    },
    [reset],
  );

  return (
    <Form
      onSubmit={handleSubmit(({ fromCoinAmount }) => {
        setConfirmationData({
          toCoinAmount:
            (convertPreview?.side === 'buy'
              ? 1 / convertPreview.lastPrice
              : convertPreview.lastPrice) * Number(fromCoinAmount),
          fromCoinAmount: Number(fromCoinAmount),
          fromCoin: selectedFromToken.coin,
        });
        showModal(SwapConfirmModal);
      })}
      sx={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start' }}
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
            label={t('service-swap.convert-to-coin', { coin: coinSwapTo.coin })}
            showMaxButton={false}
            selectWidth={115}
            coin={selectedFromToken}
            onTokenChange={handleTokenChange}
            balance={selectedFromToken.available}
            {...fromField}
          />
        )}
      />

      <ModalActions position={'relative'}>
        <ZigButton
          id={'swap-coins-modal__continue'}
          loading={isFetchingConvertPreview}
          size={'large'}
          type={'submit'}
          disabled={!canSubmit}
        >
          {t('service-swap.convert')}
        </ZigButton>
      </ModalActions>
    </Form>
  );
}

export default SwapForm;
