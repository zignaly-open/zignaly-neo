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
import { allowedDeposits } from '../../../../../../util/coins';
import { useActiveExchange } from '../../../../../../apis/user/use';
import { useExchangeCoinsList } from '../../../../../../apis/coin/use';
import { Box, ButtonProps, InputAdornment } from '@mui/material';
import { ZigButtonGroupInputWrapper } from '../atoms';
import SuccessFeeInputWrapper from './SuccessFeeInputWrapper';

function CreateServiceForm(): React.ReactElement {
  const { t } = useTranslation('service');
  const { exchangeType } = useActiveExchange();
  const { data: coins } = useExchangeCoinsList();
  const isLoading = false;

  const coinOptions = useMemo(
    () =>
      allowedDeposits[exchangeType]?.map((ssc: string) => {
        const name = coins[ssc]?.name || '';
        return {
          value: ssc,
          name,
          label: <CoinOption coin={ssc} name={name} />,
        };
      }),
    [coins, exchangeType],
  );

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<{
    serviceType: 'spot' | 'futures';
    serviceName: string;
    baseCurrency: string;
    successFee: number;
  }>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(CreateServiceValidation),
    defaultValues: {
      serviceName: '',
      baseCurrency: '',
    },
  });

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

  const onSubmit = () => {};
  // Service Type Base currency Service name Success fee
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ZigButtonGroupInputWrapper sx={{ mb: 2 }}>
        <ZigButtonGroupInput
          value={watch('serviceType')}
          options={serviceTypes}
          onChange={(v) => setValue('serviceType', v as 'spot' | 'futures')}
          label={t('create.service-type')}
        />
      </ZigButtonGroupInputWrapper>

      <Controller
        name='baseCurrency'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ZigSelect
            id={'create-service__base-currency'}
            menuPlacement='auto'
            menuShouldScrollIntoView={false}
            menuPosition='fixed'
            menuShouldBlockScroll
            label={t('create.base-currency')}
            placeholder={t('create.base-currency')}
            options={coinOptions}
            filterOption={filterOptions}
            {...field}
          />
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
            disabled={isLoading}
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
}

export default CreateServiceForm;
