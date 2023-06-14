import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  getPrecisionForCoin,
  ZigButton,
  ZigInputAmount,
  ZigTypography,
} from '@zignaly-open/ui';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { InvestInYourServiceValidation } from '../validations';
import { Grid } from '@mui/material';
import { ServiceFormData, ServiceInvestType } from './types';
import InvestorDetailsForService from '../../../../../Dashboard/components/ManageInvestmentModals/views/InvestorDetailsForService';
import { useCurrentBalance } from '../../../../../../apis/investment/use';
import { CreateServicePayload } from '../../../../../../apis/service/types';
import {
  useCreateTraderServiceMutation,
  useTraderServiceTypesInfoQuery,
} from '../../../../../../apis/service/api';
import { useActiveExchange } from '../../../../../../apis/user/use';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE_MANAGE } from '../../../../../../routes';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';

const InvestInYourServiceForm: React.FC<{
  service?: ServiceFormData;
}> = ({ service }) => {
  const { t } = useTranslation(['service', 'edit-investment']);
  const coin = useCurrentBalance(service.baseCurrency);
  const exchange = useActiveExchange();
  const navigate = useNavigate();
  const [createService, { isLoading }] = useCreateTraderServiceMutation();
  const { data: serviceTypesInfo } = useTraderServiceTypesInfoQuery();
  const minValue =
    serviceTypesInfo?.[service.serviceType]?.[service.baseCurrency]
      ?.minimum_owner_balance || 0;
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ServiceInvestType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(
      InvestInYourServiceValidation({
        maxDecimals: getPrecisionForCoin(coin.id),
        min: minValue,
        coin: coin.id,
        balance: coin.balance,
      }),
    ),
  });

  const onSubmit = async ({ amountToInvest }: ServiceInvestType) => {
    const result = await createService({
      name: service.serviceName,
      type: service.serviceType.toLocaleUpperCase(),
      amount: amountToInvest,
      ssc: service.baseCurrency,
      successFee: service.successFee,
      exchangeInternalId: exchange.internalId,
    } as CreateServicePayload);

    if ('data' in result) {
      navigate(
        generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
          serviceId: result.data.id,
        }),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InvestorDetailsForService
        service={{
          serviceLogo: '',
          successFee: service.successFee?.toString(),
          serviceName: service.serviceName,
        }}
      />

      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <ZigTypography
            variant='h4'
            color='neutral400'
            textAlign={'center'}
            marginBottom={'20px'}
          >
            {t('create.minimum-balance', {
              minValue,
              minValueCoin: coin.id,
            })}
          </ZigTypography>
          <Controller
            name={'amountToInvest'}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigInputAmount
                id={'withdraw-modal__input-amount'}
                label={t('edit-investment:form.inputAmount.label')}
                coin={coin.id}
                placeholder={'0.0'}
                balance={coin.balance}
                min={minValue}
                error={t(errors?.amountToInvest?.message, {
                  minValue,
                  minValueCoin: coin.id,
                })}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>

      <ModalActions>
        <ZigButton
          variant='contained'
          type='submit'
          loading={isLoading}
          disabled={!!errors?.amountToInvest || !watch('amountToInvest')}
          id={'create-service-modal__invest-and-create'}
          size='xlarge'
        >
          {t('create.action')}
        </ZigButton>
      </ModalActions>
    </form>
  );
};

export default InvestInYourServiceForm;
