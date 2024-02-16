import React, { useMemo } from 'react';
import {
  CoinLabel,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from './styled';
import { Grid, InputAdornment } from '@mui/material';
import { SettingEnableSection } from './atoms';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useCurrentWlConfig } from './use';
import { WhitelabelConfig } from '../../apis/config/types';
import { Box } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProfileConfigValidation } from './validations';
import { ZScoreIcon } from '@zignaly-open/ui/icons';
import { useSaveConfig } from './util';
// TODO: sort pout the types
// import { Features } from '@zignaly-open/ps2/src/whitelabel/type';

// TODO: import from a package
const currenciesConfiguredForMin = ['USDT', 'ETH', 'BNB', 'BTC'];

const grayscaleIconStyle = {
  filter: 'grayscale(100%)',
  opacity: 0.5,
};

export default function ProfileConfig() {
  const { t } = useTranslation('config');
  const { data } = useCurrentWlConfig() as unknown as {
    data: WhitelabelConfig;
  };

  const defaultValues = useMemo(() => ({}), [data]);

  const formMethods = useForm<Partial<WhitelabelConfig>>({
    defaultValues,
    resolver: yupResolver(ProfileConfigValidation),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const {
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const { submit, isLoading } = useSaveConfig();

  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 2 }} variant={'h1'}>
        {t('navigation.communication-config')}
      </ZigTypography>
      <form onSubmit={handleSubmit(submit)}>
        <FormProvider {...formMethods}>
          <SettingEnableSection
            title={t('settings.referrals')}
            description={t('settings.referrals-description')}
            name={'settings.referrals'}
            id={'settings-referrals-toggle'}
          />

          <SettingEnableSection
            title={t('settings.rewards')}
            description={t('settings.rewards-description')}
            name={'settings.rewards'}
            id={'settings-rewards-toggle'}
          />

          <SettingEnableSection
            title={t('settings.login-only')}
            description={t('settings.login-only-description')}
            name={'settings.loginOnly'}
            id={'settings-login-only-toggle'}
          />

          <SettingEnableSection
            title={t('settings.zscore')}
            description={t('settings.zscore-description')}
            name={'settings.zscore'}
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
            name={'settings.minInvestment'}
            id={'settings-min-investment-toggle'}
          />

          <Grid container spacing={4} sx={{ mt: -2, mb: 3 }}>
            {currenciesConfiguredForMin.map((coin) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={`${coin}-min`}>
                <Controller
                  name={`minInvestment.${coin}` as keyof WhitelabelConfig}
                  control={control}
                  render={({ field }) => (
                    <ZigInput
                      error={t(errors.minInvestment?.[coin]?.message)}
                      id={'settings-min-investment-' + coin}
                      label={
                        t('settings.min-investment-amount', { coin }) + ':'
                      }
                      disabled={isLoading || !watch('settings.minInvestment')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Box
                              sx={
                                watch('settings.minInvestment')
                                  ? {}
                                  : grayscaleIconStyle
                              }
                            >
                              <CoinLabel coin={coin} name={''} />
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
