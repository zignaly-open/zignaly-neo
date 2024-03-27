import React, { useMemo } from 'react';
import {
  ZigButton,
  ZigCheckBox,
  ZigImageInput,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from '../styled';
import { Grid, Tooltip } from '@mui/material';
import { GridUrlInput, SectionHeader } from '../atoms';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { WhitelabelBackendConfig } from '../../../apis/config/types';
import { Box } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProfileConfigValidation } from '../validations';
import { useSaveConfig } from '../use';
import {
  LocalizationLanguages,
  supportedLanguages,
} from '@zignaly-open/ps2-definitions';
import { useParams } from 'react-router-dom';
import { useWlConfigQuery } from '../../../apis/config/api';

type FormType = Partial<WhitelabelBackendConfig> & {
  name: string;
  languagesMap: Record<string, boolean>;
};

const customNotWorkingUpload = async (file: File) => {
  // eslint-disable-next-line no-console
  console.error(file);
  alert('I do nothing');
  return '';
};

export default function ProfileConfig() {
  const { t } = useTranslation('config');
  const { wl } = useParams();
  const { data } = useWlConfigQuery(wl);

  const defaultValues = useMemo(
    () => ({
      favicon: data.favicon,
      logo: data.logo,
      image: data.image,
      name: data.name,
      description: data.description,
      title: data.title,
      privacyPolicy: data.privacyPolicy,
      tos: data.tos,
      tools: data.tools || ({} as typeof data.tools),
      languagesMap: supportedLanguages.reduce(
        (memo: Record<string, boolean>, cur: string) => {
          memo[cur] = data.languages?.includes(cur);
          return memo;
        },
        {},
      ),
    }),
    [data],
  );

  const formMethods = useForm<FormType>({
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

  const { submit, isLoading } = useSaveConfig(wl, (payload) => {
    // since we're making the languagesMap as a separate type
    const { languagesMap, ...v } = payload as unknown as FormType;
    return {
      ...v,
      languages: Object.entries(languagesMap)
        .filter((e) => e[1])
        .map(([x]) => x),
    };
  });

  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 2 }} variant={'h1'}>
        {t('navigation.profile-config')}
      </ZigTypography>
      <form onSubmit={handleSubmit(submit)}>
        <FormProvider {...formMethods}>
          <ZigTypography variant={'h2'} sx={{ mb: 2, mt: '19px' }}>
            {t('profile.profile')}
          </ZigTypography>
          <Grid container spacing={7.5}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={'logo'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ZigImageInput
                    label={t('profile.dark-logo')}
                    description={t('profile.dark-logo-explainer')}
                    info={t('profile.optimal-size', { size: '600x100' })}
                    uploadFn={customNotWorkingUpload}
                    disabled
                    buttonTooltip={t('profile.uploads-not-ready')}
                    renderer={(url: string) => (
                      <img src={url} height={50} alt={''} />
                    )}
                    error={t(errors.image?.message as string)}
                    value={value && value + '/original'}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>

            {/*We do not have the light logo lol*/}
            {/*<Grid item xs={12} sm={6} md={4}>*/}
            {/*  <Controller*/}
            {/*    name={'image'}*/}
            {/*    control={control}*/}
            {/*    render={({ field: { value, onChange } }) => (*/}
            {/*      <ZigImageInput*/}
            {/*        label={t('profile.light-logo')}*/}
            {/*        description={t('profile.light-logo-explainer')}*/}
            {/*        info={t('profile.optimal-size', { size: '1200x627' })}*/}
            {/*        uploadFn={async (file: File) => {*/}
            {/*          // eslint-disable-next-line no-console*/}
            {/*          console.error(file);*/}
            {/*          alert('I do nothing');*/}
            {/*          return '';*/}
            {/*        }}*/}
            {/*        disabled*/}
            {/*        buttonTooltip={t('profile.uploads-not-ready')}*/}
            {/*        renderer={(url: string) => (*/}
            {/*          <img src={url} width={200} height={105} alt={''} />*/}
            {/*        )}*/}
            {/*        error={t(errors.image?.message as string)}*/}
            {/*        value={value && value + '/banner'}*/}
            {/*        onChange={onChange}*/}
            {/*      />*/}
            {/*    )}*/}
            {/*  />*/}
            {/*</Grid>*/}

            <Grid item xs={12} sm={6} md={8}>
              <Controller
                name={'favicon'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ZigImageInput
                    label={t('profile.favicon')}
                    description={t('profile.favicon-explainer')}
                    info={t('profile.optimal-size', { size: '512x512' })}
                    uploadFn={customNotWorkingUpload}
                    disabled
                    buttonTooltip={t('profile.uploads-not-ready')}
                    size={50}
                    error={t(errors.image?.message as string)}
                    value={value && value + '/512x512'}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={'name'}
                control={control}
                render={({ field }) => (
                  <ZigInput
                    error={t(errors.name?.message as string)}
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
                    error={t(
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      errors.tools?.google_tag_manager?.message as string,
                    )}
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
              <ZigTypography>{t('profile.subdomain')}</ZigTypography>
              <ZigTypography variant={'body2'} component={'p'}>
                {t('profile.subdomain-explainer')}
              </ZigTypography>
              <Tooltip title={t('contact-support-to-change')}>
                <ZigTypography
                  variant={'body1'}
                  component={'p'}
                  sx={{ fontSize: '16px', mt: 1 }}
                  color={'neutral400'}
                >
                  {data.domain}
                </ZigTypography>
              </Tooltip>
            </Grid>
          </Grid>

          <SectionHeader title={t('profile.meta')} sx={{ mb: 0.5, mt: 8 }} />

          <Grid container spacing={7.5}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={'image'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ZigImageInput
                    label={t('profile.meta-image')}
                    description={t('profile.meta-image-explainer')}
                    info={t('profile.optimal-size', { size: '1200x627' })}
                    uploadFn={customNotWorkingUpload}
                    disabled
                    buttonTooltip={t('profile.uploads-not-ready')}
                    renderer={(url: string) => (
                      <img src={url} width={200} height={105} alt={''} />
                    )}
                    error={t(errors.image?.message as string)}
                    value={value && value + '/banner'}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Controller
                name={'title'}
                control={control}
                render={({ field }) => (
                  <ZigInput
                    error={t(errors.title?.message as string, { max: 100 })}
                    id={'profile_wl-title'}
                    wide
                    placeholder={t('profile.meta-title')}
                    label={
                      <>
                        <ZigTypography>
                          {t('profile.meta-title')}
                          <ZigTypography variant={'body2'} component={'div'}>
                            {t('profile.meta-title-description')}
                          </ZigTypography>
                        </ZigTypography>
                      </>
                    }
                    disabled={isLoading}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <Controller
                name={'description'}
                control={control}
                render={({ field }) => (
                  <ZigInput
                    error={t(errors.description?.message as string, {
                      max: 500,
                    })}
                    multiline
                    rows={3}
                    id={'profile_wl-title'}
                    wide
                    placeholder={t('profile.meta-description')}
                    label={
                      <>
                        <ZigTypography>
                          {t('profile.meta-description')}
                          <ZigTypography variant={'body2'} component={'div'}>
                            {t('profile.meta-description-description')}
                          </ZigTypography>
                        </ZigTypography>
                      </>
                    }
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
            sx={{ mb: 0.5, mt: 8 }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {supportedLanguages.map((l: string) => (
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
            sx={{ mb: 0.5, mt: 8 }}
          />

          <Controller
            name={'tos'}
            control={control}
            render={({ field }) => (
              <GridUrlInput
                sx={{ mt: 2 }}
                error={t(errors.tos?.message as string)}
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
                error={t(errors.privacyPolicy?.message as string)}
                id={'profile_privacy-policy'}
                sx={{ mt: 2 }}
                label={t('profile.privacy-url')}
                placeholder={t('profile.privacy-url')}
                disabled={isLoading}
                {...field}
              />
            )}
          />

          <Box sx={{ textAlign: 'right', mt: 10 }}>
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
