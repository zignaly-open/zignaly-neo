import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ErrorMessage,
  ZigButton,
  ZigButtonGroupInput,
  ZigInput,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CreateServiceValidation } from '../validations';
import CoinOption, {
  filterOptions,
} from '../../../../../Dashboard/components/ManageInvestmentModals/forms/atoms/CoinOption';
import { useExchangeCoinsList } from '../../../../../../apis/coin/use';
import { Box, ButtonProps, InputAdornment, Tooltip } from '@mui/material';
import { ZigButtonGroupInputWrapper } from '../atoms';
import SuccessFeeInputWrapper from './SuccessFeeInputWrapper';
import { ExchangeType } from '../../../../../../apis/user/types';
import { ServiceFormData } from './types';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
import { useServiceTypesInfoQuery } from '../../../../../../apis/service/api';

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

  const { data: serviceTypesInfo } = useServiceTypesInfoQuery();

  const coinOptions = useMemo(
    () =>
      exchangeType
        ? Object.keys(serviceTypesInfo?.[exchangeType])?.map((ssc: string) => {
            const name = coins[ssc]?.name || '';
            return {
              value: ssc,
              name,
              label: <CoinOption key={ssc} coin={ssc} name={name} />,
            };
          })
        : [],
    [exchangeType],
  );

  const serviceTypes = useMemo(
    () => [
      {
        value: 'spot',
        label: t(`create.types.spot`),
        extraProps: {
          size: 'large' as ButtonProps['size'],
          sx: { width: '50%' },
        },
      },
      {
        value: 'futures',
        label: t(`create.types.futures`),
        extraProps: {
          size: 'large' as ButtonProps['size'],
          sx: { width: '50%' },
        },
      },
    ],
    [t],
  );

  register('serviceType');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ZigButtonGroupInputWrapper sx={{ mb: 2 }}>
        <ZigButtonGroupInput
          value={exchangeType}
          options={serviceTypes}
          error={t(errors.serviceType?.message)}
          onChange={(v) => {
            setValue('serviceType', v as ExchangeType);
            trigger('serviceType');
          }}
          label={t('create.service-type')}
        />
      </ZigButtonGroupInputWrapper>

      <Controller
        name='baseCurrency'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Tooltip title={!exchangeType ? t('create.select-type-first') : ''}>
            <Box>
              <ZigSelect
                disabled={!exchangeType}
                id={'create-service__base-currency'}
                menuPlacement='auto'
                menuShouldScrollIntoView={false}
                menuPosition='fixed'
                menuShouldBlockScroll
                label={t('create.base-currency')}
                placeholder={t('create.base-currency')}
                options={coinOptions}
                error={t(errors.baseCurrency?.message)}
                filterOption={filterOptions}
                {...field}
              />
            </Box>
          </Tooltip>
        )}
      />

      <Controller
        name='serviceName'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ZigInput
            sx={{
              mt: 2,
              mb: 2,
            }}
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
          <SuccessFeeInputWrapper value={watch('successFee') || 0}>
            <ZigInput
              type='number'
              InputProps={{
                endAdornment: <InputAdornment position='end'>%</InputAdornment>,
              }}
              sx={{
                mb: 2,
              }}
              fullWidth
              label={
                <div>
                  {t('summary.success-fee')}
                  <ZigTypography variant='h4' color='neutral400'>
                    {t('edit.success-fee-desc')}
                  </ZigTypography>
                </div>
              }
              error={t(errors.successFee?.message)}
              {...field}
            />
          </SuccessFeeInputWrapper>
        )}
      />

      <ErrorMessage text={t('create.please-verify')} yellow />

      <ModalActionsNew>
        <ZigButton
          variant='contained'
          type='submit'
          id={'create-service-modal__create-1st-step'}
          size='large'
        >
          {t('create.next-step')}
        </ZigButton>
      </ModalActionsNew>
    </form>
  );
};

export default CreateServiceForm;
