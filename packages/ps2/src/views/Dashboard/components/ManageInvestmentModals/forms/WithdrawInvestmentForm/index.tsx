import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldErrorsImpl, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { WithdrawActions } from '../../styles';
import {
  Button,
  InputAmountAdvanced,
  InputAmountAdvancedValueType,
  SliderInput,
  Typography,
} from '@zignaly-open/ui';
import BigNumber from 'bignumber.js';
import {
  useInvestmentDetails,
  useSelectedInvestment,
  useWithdrawInvestment,
} from '../../../../../../apis/investment/use';
import {
  EditInvestmentValidation,
  EditInvestmentValidationOwner,
} from './validations';
import { WithdrawInvestmentFormFormData } from './types';
import { ChangeViewFn, EditInvestmentViews } from '../../types';
import { useToast } from '../../../../../../util/hooks/useToast';
import CenteredLoader from '../../../../../../components/CenteredLoader';
import { useTraderServiceTypesInfoQuery } from '../../../../../../apis/service/api';
import { useServiceDetails } from '../../../../../../apis/service/use';

const WithdrawInvestmentForm: React.FC<{ setView: ChangeViewFn }> = ({
  setView,
}) => {
  const { isLoading, withdraw } = useWithdrawInvestment();
  const { serviceId, ssc } = useSelectedInvestment();
  const { isLoading: isLoadingDetails, data: service } =
    useInvestmentDetails(serviceId);
  const { data: serviceInfo } = useServiceDetails(serviceId);

  const coin = useMemo(
    () => ({
      id: ssc,
      balance: new BigNumber(service.invested)
        .plus(new BigNumber(service.pending))
        .toString(),
    }),
    [service],
  );

  const { data: serviceTypesInfo } = useTraderServiceTypesInfoQuery();
  const minInvestedAmountOwner =
    serviceTypesInfo?.[serviceInfo.type]?.[coin.id]?.minimum_owner_balance;

  const { t } = useTranslation('withdraw');
  const toast = useToast();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm<WithdrawInvestmentFormFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amountTransfer: {
        value: '',
        token: coin,
      },
    },
    resolver:
      service.accountType === 'owner'
        ? yupResolver(EditInvestmentValidationOwner(minInvestedAmountOwner))
        : yupResolver(EditInvestmentValidation),
  });

  const watchAmountTransfer = watch(
    'amountTransfer',
  ) as WithdrawInvestmentFormFormData['amountTransfer'];
  const onSubmit = async (values: WithdrawInvestmentFormFormData) => {
    await withdraw({
      amount: values.amountTransfer?.value,
      serviceId,
    });
    toast.success(t('edit-investment:withdrawInvestmentSuccess'));
    setView(EditInvestmentViews.WithdrawSuccess);
  };
  const tokenBalance = new BigNumber(coin.balance);
  const amount = new BigNumber(watchAmountTransfer?.value);

  let sliderValue = +amount
    .multipliedBy(new BigNumber(100))
    .div(tokenBalance)
    .dp(2);
  if (isNaN(sliderValue)) sliderValue = 0;
  sliderValue = Math.min(sliderValue, 100);

  if (isLoadingDetails) {
    return <CenteredLoader />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography>{t('replace-existing-amount')}</Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <InputAmountAdvanced
            name={'amountTransfer'}
            control={control}
            label={t('form.label')}
            labelBalance={t('form.labelBalance')}
            showUnit={true}
            placeholder={'0.0'}
            tokens={[coin]}
            error={
              isDirty &&
              t(
                (
                  errors?.amountTransfer as FieldErrorsImpl<InputAmountAdvancedValueType>
                )?.value?.message,
                {
                  minAmount: minInvestedAmountOwner,
                  minAmountCoin: coin.id,
                },
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginTop={5}>
            <SliderInput
              value={sliderValue}
              initialValue={0}
              onChange={(value: number) => {
                if (!watch('amountTransfer')?.value && !value) {
                  // means first render
                  return;
                }
                setValue('amountTransfer', {
                  ...watchAmountTransfer,
                  value: parseFloat(
                    new BigNumber(coin.balance)
                      .multipliedBy(value)
                      .dividedBy(100)
                      .toFixed(8),
                  ),
                });
                trigger('amountTransfer');
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <WithdrawActions>
        <Button
          id={'withdraw__confirm-withdraw'}
          size={'xlarge'}
          disabled={!isValid}
          caption={t('button')}
          loading={isLoading}
        />
      </WithdrawActions>
    </form>
  );
};

export default WithdrawInvestmentForm;
