import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ZigAlertMessage,
  ZigButton,
  ZigButtonGroupInput,
  ZigInput,
  ZigModalActions,
  ZigModalForm,
  ZigSelect,
} from '@zignaly-open/ui';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CreateServiceValidation } from '../validations';
import CoinOption, {
  filterOptions,
} from '../../../../../Dashboard/components/ManageInvestmentModals/forms/atoms/CoinOption';
import { useExchangeCoinsList } from '../../../../../../apis/coin/use';
import { ButtonProps, InputAdornment, Tooltip } from '@mui/material';
import { ZigButtonGroupInputWrapper } from '../atoms';
import SuccessFeeInputWrapper from './SuccessFeeInputWrapper';
import { ExchangeType } from '../../../../../../apis/user/types';
import { ServiceFormData } from './types';
import { useTraderServiceTypesInfoQuery } from '../../../../../../apis/service/api';
import { whitelabel } from '../../../../../../whitelabel';

const CreateServiceForm: React.FC<{
  service?: Partial<ServiceFormData>;
  onSubmit: (service: ServiceFormData) => void;
}> = ({ service, onSubmit }) => {
  const { t } = useTranslation('service');
  const { data: coins } = useExchangeCoinsList();

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,
    register,
    formState: { errors },
  } = useForm<ServiceFormData>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(CreateServiceValidation),
    defaultValues: service || {
      serviceName: '',
      baseCurrency: '',
    },
  });

  const exchangeType = watch('serviceType');

  const { data: serviceTypesInfo } = useTraderServiceTypesInfoQuery();

  const coinOptions = useMemo(
    () =>
      exchangeType
        ? Object.keys(serviceTypesInfo?.[exchangeType])
            ?.map((ssc: string) => {
              const name = coins[ssc]?.name || '';
              return {
                value: ssc,
                name,
                label: <CoinOption key={ssc} coin={ssc} name={name} />,
              };
            })
            .filter((coin) => coin.value !== 'BUSD')
        : [],
    [exchangeType],
  );

  const serviceTypes = useMemo(
    () => [
      {
        id: 'create-service__select-type-spot',
        value: 'spot',
        label: t(`create.types.spot`),
        extraProps: {
          size: 'xlarge' as ButtonProps['size'],
          sx: { width: '50%' },
        },
      },
      {
        id: 'create-service__select-type-futures',
        value: 'futures',
        label: t(`create.types.futures`),
        extraProps: {
          size: 'xlarge' as ButtonProps['size'],
          sx: { width: '50%' },
        },
      },
    ],
    [t],
  );

  register('serviceType');

  return (
    <ZigModalForm onSubmit={handleSubmit(onSubmit)}>
      <ZigButtonGroupInputWrapper>
        <ZigButtonGroupInput
          prefixId={'create-service__select-type'}
          value={exchangeType}
          options={serviceTypes}
          error={t(errors.serviceType?.message)}
          onChange={(v) => {
            setValue('serviceType', v as ExchangeType);
            trigger('serviceType');
            setValue('baseCurrency', '');
          }}
          label={t('create.service-type') + '*'}
        />
      </ZigButtonGroupInputWrapper>

      <Controller
        name='baseCurrency'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Tooltip title={!exchangeType ? t('create.select-type-first') : ''}>
            <ZigSelect
              disabled={!exchangeType}
              id={'create-service__base-currency'}
              menuPlacement='auto'
              menuShouldScrollIntoView={false}
              menuPosition='fixed'
              menuShouldBlockScroll
              label={t('create.base-currency') + ':*'}
              placeholder={t('create.base-currency')}
              options={coinOptions}
              error={t(errors.baseCurrency?.message)}
              filterOption={filterOptions}
              width={240}
              {...field}
            />
          </Tooltip>
        )}
      />

      <Controller
        name='serviceName'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ZigInput
            wide
            id={'create-service__service-name'}
            label={t('create.service-name') + ':'}
            placeholder={t('create.service-name')}
            error={t(errors.serviceName?.message)}
            {...field}
          />
        )}
      />

      <Controller
        name='successFee'
        control={control}
        render={({ field }) => (
          <SuccessFeeInputWrapper
            zglyFee={whitelabel.defaultSuccessFee}
            prefixId={'create-service__service-fee'}
            value={watch('successFee') || 0}
            showZeroFeeExplainer
          >
            <ZigInput
              id={'create-service__service-fee'}
              type='number'
              InputProps={{
                endAdornment: <InputAdornment position='end'>%</InputAdornment>,
              }}
              label={t('create.total-fee')}
              labelInline={true}
              fullWidth={false}
              error={t(errors.successFee?.message)}
              {...field}
            />
          </SuccessFeeInputWrapper>
        )}
      />
      <ZigAlertMessage
        id={'create-service__alert-message'}
        text={t('create.please-verify')}
        warning
      />

      <ZigModalActions>
        <ZigButton
          variant='contained'
          type='submit'
          id={'create-service__create-1st-step'}
          size='xlarge'
        >
          {t('create.next-step')}
        </ZigButton>
      </ZigModalActions>
    </ZigModalForm>
  );
};

export default CreateServiceForm;
