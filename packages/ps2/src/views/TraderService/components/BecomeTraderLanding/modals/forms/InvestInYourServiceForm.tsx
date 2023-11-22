import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  getPrecisionForCoin,
  ZigButton,
  ZigInputAmount,
  ZigModalActions,
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
import { Add } from '@mui/icons-material';
import DepositModal from '../../../../../Dashboard/components/ManageInvestmentModals/DepositModal';
import { useZModal } from '../../../../../../components/ZModal/use';
import { whitelabel } from '../../../../../../whitelabel';

const InvestInYourServiceForm: React.FC<{
  service?: ServiceFormData;
}> = ({ service }) => {
  const { showModal } = useZModal();
  const { t } = useTranslation([
    'service',
    'edit-investment',
    'deposit-crypto',
  ]);
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

  const renderDepositCoin = () => (
    <ZigButton
      id={'invest-in-your-service-modal__deposit'}
      startIcon={<Add sx={{ fill: 'currentColor !important' }} />}
      sx={{
        fontWeight: 400,
        color: 'links',
      }}
      variant={'text'}
      onClick={() =>
        showModal(DepositModal, {
          ctaId: 'invest-modal__deposit',
          selectedCoin: coin.id,
          // Callback to close the modal if user navigates to history from the deposit modal
          onClose: close,
        })
      }
    >
      {t('action:deposit-coin', { coin: coin.id })}
    </ZigButton>
  );

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
        prefixId={'invest-in-your-service-modal'}
        service={{
          serviceLogo: '',
          successFee: service.successFee,
          serviceName: service.serviceName,
          zglyFee: whitelabel.defaultSuccessFee,
        }}
      />

      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <ZigTypography
            variant='h4'
            color='neutral400'
            textAlign={'center'}
            marginBottom={'20px'}
            whiteSpace={'pre-line'}
            id={'invest-in-your-service-modal__minimum-balance-hint'}
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
                id={'invest-in-your-service-modal__input-amount'}
                label={t('edit-investment:form.inputAmount.label')}
                coin={coin.id}
                balance={coin.balance}
                min={minValue}
                error={t(errors?.amountToInvest?.message, {
                  minValue,
                  minValueCoin: coin.id,
                })}
                extraInfo={{
                  wrapExtraInfo: 3,
                  others: [renderDepositCoin()],
                }}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>

      <ZigModalActions>
        <ZigButton
          variant='contained'
          type='submit'
          loading={isLoading}
          disabled={!!errors?.amountToInvest || !watch('amountToInvest')}
          id={'invest-in-your-service-modal__invest-and-create'}
          size='xlarge'
        >
          {t('create.action')}
        </ZigButton>
      </ZigModalActions>
    </form>
  );
};

export default InvestInYourServiceForm;
