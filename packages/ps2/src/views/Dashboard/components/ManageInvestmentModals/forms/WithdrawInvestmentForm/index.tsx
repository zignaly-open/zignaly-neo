import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, FieldErrorsImpl, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { WithdrawActions } from '../../styles';
import {
  ZigButton,
  CenteredLoader,
  InputAmountAdvanced,
  InputAmountAdvancedValueType,
  ZigSliderInput,
  ZigTypography,
  ZigInputAmount,
  ZigSlider,
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
  withdrawValidation,
} from './validations';
import { WithdrawInvestmentFormFormData } from './types';
import { ChangeViewFn, EditInvestmentViews } from '../../types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { useTraderServiceTypesInfoQuery } from '../../../../../../apis/service/api';
import { useServiceDetails } from '../../../../../../apis/service/use';
import { trimZeros } from '@zignaly-open/ui';
import { inputAmountValidation } from 'util/validation';
import { Form } from 'components/ZModal';

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
      amountTransfer: '',
    },
    resolver: yupResolver(
      withdrawValidation(
        service.accountType === 'owner' ? minInvestedAmountOwner : undefined,
        coin.id,
        coin.balance,
      ),
    ),
  });

  const watchAmountTransfer = watch(
    'amountTransfer',
  ) as WithdrawInvestmentFormFormData['amountTransfer'];
  const onSubmit = async (values: WithdrawInvestmentFormFormData) => {
    await withdraw({
      amount: values.amountTransfer,
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ZigTypography
        id={'withdraw-modal__replace-amount-text'}
        textAlign='center'
        display='block'
      >
        {t('replace-existing-amount')}
      </ZigTypography>

      <Controller
        name={'amountTransfer'}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ZigInputAmount
            id={'edit-investment-modal__input-amount'}
            label={t('form.label')}
            wide={true}
            coin={coin.id}
            max={coin.balance}
            error={t(errors?.amountTransfer?.message)}
            extraInfo={{
              max: t('form.available'),
            }}
            {...field}
          >
            <ZigSlider
              prefixId={'withdraw-modal-amount-transfer'}
              onChange={(
                _: React.ChangeEvent<HTMLInputElement>,
                value: number,
              ) => {
                setValue(
                  'amountTransfer',
                  trimZeros(
                    new BigNumber(coin.balance)
                      .multipliedBy(value)
                      .dividedBy(100)
                      .toFixed(8),
                  ),
                );
              }}
            />
          </ZigInputAmount>
        )}
      />

      <WithdrawActions>
        <ZigButton
          id={'withdraw-modal__confirm-withdraw'}
          type={'submit'}
          size={'xlarge'}
          disabled={!isValid}
          loading={isLoading}
        >
          {t('button')}
        </ZigButton>
      </WithdrawActions>
    </Form>
  );
};

export default WithdrawInvestmentForm;
