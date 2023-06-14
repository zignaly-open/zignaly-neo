import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { WithdrawActions } from '../../styles';
import {
  ZigButton,
  CenteredLoader,
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
import { withdrawValidation } from './validations';
import { WithdrawInvestmentFormFormData } from './types';
import { ChangeViewFn, EditInvestmentViews } from '../../types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { useTraderServiceTypesInfoQuery } from '../../../../../../apis/service/api';
import { useServiceDetails } from '../../../../../../apis/service/use';
import { trimZeros } from '@zignaly-open/ui';
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
    formState: { errors, isValid },
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

  const onSubmit = async (values: WithdrawInvestmentFormFormData) => {
    await withdraw({
      amount: values.amountTransfer,
      serviceId,
    });
    toast.success(t('edit-investment:withdrawInvestmentSuccess'));
    setView(EditInvestmentViews.WithdrawSuccess);
  };

  const watchAmountTransfer = watch('amountTransfer');
  let sliderValue = +new BigNumber(watchAmountTransfer)
    .multipliedBy(new BigNumber(100))
    .div(new BigNumber(coin.balance))
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
              value={sliderValue}
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
                  { shouldValidate: true },
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
          size={'large'}
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
