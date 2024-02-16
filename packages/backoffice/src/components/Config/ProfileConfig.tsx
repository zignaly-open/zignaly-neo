import React, { useMemo } from 'react';
import {
  CoinLabel,
  ZigButton,
  ZigCheckBox,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from './styled';
import { Grid, InputAdornment } from '@mui/material';
import { GridUrlInput, SectionHeader, SettingEnableSection } from './atoms';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useCurrentWlConfig } from './use';
import { WhitelabelConfig } from '../../apis/config/types';
import { Box } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProfileConfigValidation } from './validations';
import { ZScoreIcon } from '@zignaly-open/ui/icons';
import { useSaveConfig } from './util';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HelpIcon from '@mui/icons-material/Help';
// TODO: sort pout the types
// import { Features } from '@zignaly-open/ps2/src/whitelabel/type';

// TODO: import from a package
const currenciesConfiguredForMin = ['USDT', 'ETH', 'BNB', 'BTC'];

const grayscaleIconStyle = {
  filter: 'grayscale(100%)',
  opacity: 0.5,
};

// TODO: import from a package
const languagesWeSupport = ['en', 'es', 'pt', 'tr', 'ru', 'vi'];

export default function ProfileConfig() {
  const { t } = useTranslation('config');
  const { data } = useCurrentWlConfig() as unknown as {
    data: WhitelabelConfig;
  };

  const defaultValues = useMemo(
    () => ({
      name: data.name,
      privacyPolicy: data.privacyPolicy,
      tos: data.tos,
      tools: data.tools || {},
      languagesMap: languagesWeSupport.reduce((memo, cur) => {
        memo[cur] = data.languages?.includes(cur);
        return memo;
      }, {}),
    }),
    [data],
  );

  const formMethods = useForm<
    Partial<WhitelabelConfig> & { languagesMap: Record<string, boolean> }
  >({
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
        {t('navigation.profile-config')}
      </ZigTypography>
      <form onSubmit={handleSubmit(submit)}>
        <FormProvider {...formMethods}>
          <ZigTypography variant={'h2'} sx={{ mb: 2 }}>
            {t('profile.profile')}
          </ZigTypography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={'name'}
                control={control}
                render={({ field }) => (
                  <ZigInput
                    error={t(errors.name?.message)}
                    id={'profile_wl-name'}
                    wide
                    placeholder={t('profile.name')}
                    label={t('profile.name')}
                    disabled={isLoading}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={'tools.google_tag_manager'}
                control={control}
                render={({ field }) => (
                  <ZigInput
                    error={t(errors.tools?.google_tag_manager?.message)}
                    id={'profile_wl-gtm'}
                    wide
                    placeholder={t('profile.gtm-placeholder')}
                    label={t('profile.gtm')}
                    disabled={isLoading}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={'supportHelpCenter'}
                control={control}
                render={({ field }) => (
                  <GridUrlInput
                    error={t(errors.supportHelpCenter?.message)}
                    id={'socials_support-help-center'}
                    image={<HelpIcon fill={'#fff'} />}
                    label={t('socials.support-help-center')}
                    disabled={isLoading}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>

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

          <SectionHeader
            title={t('profile.language-title')}
            description={t('profile.language-description')}
            sx={{ mb: 0.5, mt: 6 }}
          />

          {languagesWeSupport.map((l) => (
            <Controller
              control={control}
              key={l}
              name={`languagesMap.${l}`}
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <ZigCheckBox
                  wrapperSx={{ alignItems: 'flex-start' }}
                  id={`profile_language-${l}`}
                  onChange={onChange}
                  value={value}
                  variant={'outlined'}
                  label={l}
                />
              )}
            />
          ))}

          <SectionHeader
            title={t('profile.tos')}
            description={t('profile.tos-description')}
            sx={{ mb: 0.5, mt: 6 }}
          />

          <Controller
            name={'tos'}
            control={control}
            render={({ field }) => (
              <GridUrlInput
                sx={{ mt: 2 }}
                error={t(errors.tos?.message)}
                id={'profile_tos'}
                label={t('profile.tos-url')}
                placeholder={t('profile.tos-url')}
                disabled={isLoading}
                {...field}
              />
            )}
          />

          <Controller
            name={'privacyPolicy'}
            control={control}
            render={({ field }) => (
              <GridUrlInput
                error={t(errors.privacyPolicy?.message)}
                id={'profile_privacy-policy'}
                sx={{ mt: 2 }}
                label={t('profile.privacy-url')}
                placeholder={t('profile.privacy-url')}
                disabled={isLoading}
                {...field}
              />
            )}
          />

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
