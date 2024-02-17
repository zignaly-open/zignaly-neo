import React, { useMemo } from 'react';
import {
  ZigButton,
  ZigCheckBox,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from './styled';
import { Grid } from '@mui/material';
import { GridUrlInput, SectionHeader } from './atoms';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useCurrentWlConfig } from './use';
import { WhitelabelBackendConfig } from '../../apis/config/types';
import { Box } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProfileConfigValidation } from './validations';
import { useSaveConfig } from './util';
import {
  LocalizationLanguages,
  supportedLanguages,
} from '@zignaly-open/ps2-definitions';

export default function ProfileConfig() {
  const { t } = useTranslation('config');
  const { data } = useCurrentWlConfig() as unknown as {
    data: WhitelabelBackendConfig;
  };

  const defaultValues = useMemo(
    () => ({
      name: data.name,
      privacyPolicy: data.privacyPolicy,
      tos: data.tos,
      tools: data.tools || {},
      languagesMap: supportedLanguages.reduce((memo, cur) => {
        memo[cur] = data.languages?.includes(cur);
        return memo;
      }, {}),
    }),
    [data],
  );

  const formMethods = useForm<
    Partial<WhitelabelBackendConfig> & { languagesMap: Record<string, boolean> }
  >({
    defaultValues,
    resolver: yupResolver(ProfileConfigValidation),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const {
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
          </Grid>

          <SectionHeader
            title={t('profile.language-title')}
            description={t('profile.language-description')}
            sx={{ mb: 0.5, mt: 6 }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {supportedLanguages.map((l) => (
              <Controller
                control={control}
                key={l}
                name={`languagesMap.${l}`}
                defaultValue={false}
                render={({ field: { onChange, value } }) => {
                  const localized = LocalizationLanguages[l];
                  return (
                    <ZigCheckBox
                      wrapperSx={{ alignItems: 'flex-end', mt: 2 }}
                      id={`profile_language-${l}`}
                      onChange={onChange}
                      checked={value}
                      disabled={l === 'en'}
                      variant={'outlined'}
                      label={
                        <ZigTypography
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            top: -5,
                          }}
                        >
                          {!!localized?.country && (
                            <img
                              height={18}
                              src={`https://app.zignaly.com/images/country-flags/${localized?.country}.svg`}
                              alt={localized?.label || l}
                            />
                          )}
                          <ZigTypography sx={{ ml: 1 }}>
                            {localized?.label || l}
                          </ZigTypography>
                        </ZigTypography>
                      }
                    />
                  );
                }}
              />
            ))}
          </Box>

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
