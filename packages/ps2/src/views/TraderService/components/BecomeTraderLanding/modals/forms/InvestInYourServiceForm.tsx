import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InputAmountAdvanced,
  ZigButton,
  ZigTypography,
} from '@zignaly-open/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { InvestInYourServiceValidation } from '../validations';
import { Grid } from '@mui/material';
import { ServiceFormData, ServiceInvestType } from './types';
import InvestorDetailsForService from '../../../../../Dashboard/components/ManageInvestmentModals/views/InvestorDetailsForService';
import { useCurrentBalance } from '../../../../../../apis/ps2/investment/use';
import { CreateServicePayload } from '../../../../../../apis/ps2/service/types';
import {
  useCreateTraderServiceMutation,
  useServiceTypesInfoQuery,
} from '../../../../../../apis/ps2/service/api';
import { useActiveExchange } from '../../../../../../apis/ps2/user/use';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE_MANAGE } from '../../../../../../routes';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';

const InvestInYourServiceForm: React.FC<{
  service?: ServiceFormData;
  goBack: () => void;
}> = ({ service, goBack }) => {
  const { t } = useTranslation(['service', 'edit-investment']);
  const coin = useCurrentBalance(service.baseCurrency);
  const exchange = useActiveExchange();
  const navigate = useNavigate();
  const [createService, { isLoading }] = useCreateTraderServiceMutation();
  const { data: serviceTypesInfo } = useServiceTypesInfoQuery();
  const minValue =
    serviceTypesInfo?.[service.serviceType]?.[service.baseCurrency]
      ?.minimum_owner_balance || 0;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceInvestType>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(InvestInYourServiceValidation),
    defaultValues: {
      amountToInvest: {
        value: '',
        token: {
          ...coin,
          min: minValue,
        },
      },
    },
  });

  const onSubmit = async ({ amountToInvest }: ServiceInvestType) => {
    const result = await createService({
      name: service.serviceName,
      type: service.serviceType.toLocaleUpperCase(),
      amount: amountToInvest.value,
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
          successFee: service.successFee?.toString(),
          serviceName: service.serviceName,
        }}
      />

      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <InputAmountAdvanced
            name={'amountToInvest'}
            control={control}
            disabled={isLoading}
            label={
              <div>
                {t('edit-investment:form.inputAmount.label')}
                <ZigTypography variant='h4' color='neutral400'>
                  {t('create.minimum-balance', {
                    minValue,
                    minValueCoin: coin.id,
                  })}
                </ZigTypography>
              </div>
            }
            labelBalance={t('edit-investment:form.inputAmount.labelBalance')}
            showUnit={true}
            placeholder={'0.0'}
            tokens={[service.baseCurrency]}
            error={t(errors?.amountToInvest?.value?.message, {
              minValue,
              minValueCoin: coin.id,
            })}
          />
        </Grid>
      </Grid>

      <ModalActionsNew>
        <ZigButton
          id={'confirm__back'}
          onClick={goBack}
          variant='outlined'
          size='large'
        >
          {t('common:back')}
        </ZigButton>

        <ZigButton
          variant='contained'
          type='submit'
          loading={isLoading}
          id={'create-service-modal__invest-and-create'}
          size='large'
        >
          {t('create.action')}
        </ZigButton>
      </ModalActionsNew>
    </form>
  );
};

export default InvestInYourServiceForm;
