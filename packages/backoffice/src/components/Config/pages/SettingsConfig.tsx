import React, { useEffect, useMemo } from 'react';
import {
  CoinLabel,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from '../styled';
import { Grid, InputAdornment } from '@mui/material';
import { SettingEnableSection } from '../atoms';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { WhitelabelBackendConfig } from '../../../apis/config/types';
import { Box } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SettingsConfigValidation } from '../validations';
import { ZScoreIcon } from '@zignaly-open/ui/icons';
import { useSaveConfig } from '../use';
import { allowedDeposits, Features } from '@zignaly-open/ps2-definitions';
import { useParams } from 'react-router-dom';
import { useWlConfigQuery } from '../../../apis/config/api';

const currenciesConfiguredForMin = allowedDeposits.spot;

const grayscaleIconStyle = {
  filter: 'grayscale(100%)',
  opacity: 0.5,
};

const zigInputAmountLike = {
  '.MuiInputBase-root': {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },
  '.MuiInputBase-input': {
    fontSize: '30px !important',
  },
};

export default function SettingsConfig() {
  const { t } = useTranslation('config');
  const { wl } = useParams();
  const { data } = useWlConfigQuery(wl);

  const defaultValues = useMemo(
    () => ({
      settings: data?.settings || {},
      marketplaceMinScore: data?.marketplaceMinScore || 0,
      minInvestment: data?.minInvestment || {},
    }),
    [data],
  );

  const formMethods = useForm<Partial<WhitelabelBackendConfig>>({
    defaultValues,
    resolver: yupResolver(SettingsConfigValidation),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const {
    watch,
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = formMethods;

  const { submit, isLoading } = useSaveConfig(wl, (v) => {
    v.marketplaceMinScore = +v.marketplaceMinScore;
    return v;
  });

  // field revalidation
  useEffect(() => {
    trigger('marketplaceMinScore');
  }, [watch(`settings.${Features.ZScore}`)]);

  useEffect(() => {
    currenciesConfiguredForMin.every((coin) =>
      trigger(`minInvestment.${coin}` as keyof WhitelabelBackendConfig),
    );
  }, [watch(`settings.${Features.MinInvestment}`)]);

  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 2 }} variant={'h1'}>
        {t('navigation.settings-config')}
      </ZigTypography>
      <form onSubmit={handleSubmit(submit)}>
        <FormProvider {...formMethods}>
          <SettingEnableSection
            title={t('settings.referrals')}
            description={t('settings.referrals-description')}
            name={'settings.' + Features.Referrals}
            id={'settings-referrals-toggle'}
          />

          <SettingEnableSection
            title={t('settings.login-only')}
            description={t('settings.login-only-description')}
            name={'settings.' + Features.LoginOnlyAccess}
            id={'settings-login-only-toggle'}
          />

          <SettingEnableSection
            title={t('settings.zscore')}
            description={t('settings.zscore-description')}
            name={'settings.' + Features.ZScore}
            id={'settings-zscore-toggle'}
          />

          <Box sx={{ mt: 1 }}>
            <Controller
              name={'marketplaceMinScore'}
              control={control}
              render={({ field }) => (
                <ZigInput
                  disabled={!watch('settings.zscore')}
                  id={'settings-min-zscore'}
                  placeholder={t('placeholder')}
                  label={t('settings.min-zscore') + ':'}
                  type={'number'}
                  sx={zigInputAmountLike}
                  error={t(errors.marketplaceMinScore?.message)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        sx={watch('settings.zscore') ? {} : grayscaleIconStyle}
                      >
                        <ZScoreIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                />
              )}
            />
          </Box>

          <SettingEnableSection
            title={t('settings.min-investment')}
            description={t('settings.min-investment-description')}
            name={'settings.' + Features.MinInvestment}
            id={'settings-min-investment-toggle'}
          />

          <Grid container spacing={7.5} sx={{ mt: -2, mb: 3 }}>
            {currenciesConfiguredForMin.map((coin) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={`${coin}-min`}>
                <Controller
                  name={
                    `minInvestment.${coin}` as keyof WhitelabelBackendConfig
                  }
                  control={control}
                  render={({ field }) => (
                    <ZigInput
                      sx={zigInputAmountLike}
                      error={t(errors.minInvestment?.[coin]?.message)}
                      id={'settings-min-investment-' + coin}
                      label={
                        t('settings.min-investment-amount', { coin }) + ':'
                      }
                      disabled={isLoading || !watch('settings.minInvestment')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position='end'
                            sx={{ color: (theme) => theme.palette.neutral100 }}
                          >
                            <Box
                              sx={
                                watch('settings.minInvestment')
                                  ? {}
                                  : grayscaleIconStyle
                              }
                            >
                              <CoinLabel coin={coin} name={''} size={24} />
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'right', mt: 4 }}>
            <ZigButton
              disabled={isLoading}
              size='large'
              variant='outlined'
              sx={{ mr: 2 }}
              onClick={() => reset(defaultValues)}
            >
              {t('cancel')}
            </ZigButton>
            <ZigButton
              disabled={isLoading}
              size='large'
              variant='contained'
              type={'submit'}
            >
              {t('save')}
            </ZigButton>
          </Box>
        </FormProvider>
      </form>
    </ConfigWrapper>
  );
}
