import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InputAmountAdvanced,
  SliderInput,
  ZigButton,
  ZigTypography,
} from '@zignaly-open/ui';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { InvestInYourServiceValidation } from '../validations';
import { Box, Grid } from '@mui/material';
import { ServiceFormData, ServiceInvestType } from './types';
import InvestorDetailsForService from '../../../../../Dashboard/components/ManageInvestmentModals/views/InvestorDetailsForService';
import { useCurrentBalance } from '../../../../../../apis/investment/use';
import { CreateServicePayload } from '../../../../../../apis/service/types';
import { useCreateTraderServiceMutation } from '../../../../../../apis/service/api';
import { useActiveExchange } from '../../../../../../apis/user/use';

const InvestInYourServiceForm: React.FC<{
  service?: ServiceFormData;
}> = ({ service }) => {
  const { t } = useTranslation(['service', 'edit-investment']);
  const coin = useCurrentBalance(service.baseCurrency);
  const exchange = useActiveExchange();
  const [createService, { isLoading }] = useCreateTraderServiceMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceInvestType>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(InvestInYourServiceValidation),
    defaultValues: {
      profitPercentage: 30,
      amountToInvest: {
        value: '',
        token: coin,
      },
    },
  });

  const onSubmit = ({
    amountToInvest,
    profitPercentage,
  }: ServiceInvestType) => {
    createService({
      name: service.serviceName,
      type: service.serviceType.toLocaleUpperCase(),
      amount: amountToInvest.value,
      ssc: service.baseCurrency,
      successFee: service.successFee,
      exchangeInternalId: exchange.internalId,
      profitPercentage,
    } as CreateServicePayload);
  };

  // Service Type Base currency Service name Success fee
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InvestorDetailsForService
        service={{
          successFee: service.successFee.toString(),
          serviceName: service.serviceName,
        }}
      />

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <InputAmountAdvanced
            name={'amountToInvest'}
            control={control}
            label={
              <div>
                {t('edit-investment:form.inputAmount.label')}
                <ZigTypography variant='h4' color='neutral400'>
                  {t('create.minimum-balance')}
                </ZigTypography>
              </div>
            }
            labelBalance={t('edit-investment:form.inputAmount.labelBalance')}
            showUnit={true}
            placeholder={'0.0'}
            tokens={[service.baseCurrency]}
            error={t(errors?.amountToInvest?.value?.message)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name='profitPercentage'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SliderInput
                mode={'range'}
                labels={{
                  top: (
                    <div>
                      {t('edit-investment:form.profits.title')}
                      <ZigTypography variant='h4' color='neutral400'>
                        {t('create.profits-explainer')}
                      </ZigTypography>
                    </div>
                  ),
                  left: t('edit-investment:form.profits.left'),
                  right: t('edit-investment:form.profits.right'),
                }}
                value={field.value}
                initialValue={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <ZigButton
          variant='contained'
          type='submit'
          loading={isLoading}
          size='large'
        >
          {t('create.action')}
        </ZigButton>
      </Box>
    </form>
  );
};

export default InvestInYourServiceForm;
