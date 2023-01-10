import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import {
  InputAmountAdvanced,
  ZigButton,
  ZignalyExchangeIcon,
  ZigPriceLabel,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { SwapFormData, SwapFormProps } from './types';
import { useGenerateBuyPriceQuery } from 'apis/wallet/api';
import { track } from '@zignaly-open/tracker';
import { SwapValidation } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { differenceInMinutes, fromUnixTime } from 'date-fns';
import { useUpdateEffect } from 'react-use';
import SwapConfirmForm from './SwapConfirmForm';

const SwapForm = ({
  coinFrom = 'USDT',
  coinTo = 'ZIG',
  accountsBalances,
  onDepositMore,
  onDone,
}: SwapFormProps) => {
  const { t } = useTranslation('wallet');
  const [confirm, setConfirm] = useState<SwapFormData>(null);

  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
    watch,
    trigger,
  } = useForm<SwapFormData>({
    mode: 'onChange',
    resolver: (data, context, options) =>
      yupResolver(
        SwapValidation(
          Number(priceInfo?.minAmount),
          Number(priceInfo?.maxAmount),
          coinFrom,
          timeForMaxDiff,
        ),
      )(data, context, options),
  });
  const exchangeOptions = accountsBalances.map((a) => ({
    value: a.exchange.internalId,
    label: (
      <Box display='flex' alignItems='center' gap={1}>
        <ZignalyExchangeIcon width={40} height={40} />
        <ZigTypography>{a.exchange.internalName}</ZigTypography>
      </Box>
    ),
  }));
  const selectedExchangeId = watch('exchangeAccount');
  const selectedExchangeObject =
    selectedExchangeId &&
    accountsBalances?.find((a) => a.exchange.internalId === selectedExchangeId);
  const amountFrom = watch('amount');
  const { data: priceInfo } = useGenerateBuyPriceQuery(
    {
      from: coinFrom,
      to: coinTo,
    },
    { pollingInterval: 20000 },
  );
  const timeForMaxDiff = priceInfo
    ? Math.ceil(
        differenceInMinutes(fromUnixTime(priceInfo.timeForMax), new Date()),
      )
    : 0;
  const amountTo =
    priceInfo && amountFrom ? +amountFrom.value * +priceInfo.price : null;

  useUpdateEffect(() => {
    if (!isValid && amountFrom) {
      // Force refresh validation in case the user entered the amount before we got the price info.
      trigger('amount');
    }
  }, [priceInfo]);

  const submitForm = (data: SwapFormData) => {
    console.log('a');
    setConfirm(data);
  };

  if (confirm) {
    return (
      <SwapConfirmForm
        internalId={confirm.exchangeAccount}
        coinFrom={coinFrom}
        coinTo={coinTo}
        amount={confirm.amount.value.toString()}
        onCancel={() => setConfirm(null)}
        onDone={onDone}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Grid container flexDirection='column'>
        <Grid item pt={3}>
          <Controller
            name='exchangeAccount'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSelect
                menuPlacement='auto'
                menuShouldScrollIntoView={false}
                menuPosition='fixed'
                menuShouldBlockScroll
                label={t('buy.exchangeAccount')}
                placeholder=''
                options={exchangeOptions}
                {...field}
                onChange={(value) => {
                  field.onChange(value);
                  track({ ctaId: 'select-account-zig' });
                }}
              />
            )}
          />
        </Grid>
        {selectedExchangeId && (
          <>
            <Grid item pt={3}>
              <InputAmountAdvanced
                name='amount'
                control={control}
                label={t('buy.swapFrom')}
                showUnit={true}
                placeholder='0.0'
                tokens={[
                  {
                    id: coinFrom,
                    balance:
                      selectedExchangeObject.balances[coinFrom].balanceFree,
                  },
                ]}
                error={t(errors?.amount?.value?.message)}
              />
            </Grid>
            <Grid item pt={3} display='flex' flexDirection='column'>
              <ZigTypography>{t('buy.swapTo')}</ZigTypography>
              <ZigPriceLabel
                variant='h2'
                precision={2}
                value={amountTo}
                coin='ZIG'
              />
            </Grid>
            <Grid
              item
              display='flex'
              flexDirection='column'
              mt='64px'
              alignItems='center'
              gap={1}
            >
              <ZigButton
                type='submit'
                disabled={!isValid || !amountTo}
                variant='contained'
              >
                {t('buy.continue')}
              </ZigButton>
              <ZigButton onClick={onDepositMore} variant='text'>
                {t('buy.deposit.more', { coin: coinFrom })}
              </ZigButton>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};
export default SwapForm;
