import React, { useMemo } from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from '../styled';
import { Grid, Tooltip } from '@mui/material';
import { GridUrlInput, SectionHeader } from '../atoms';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { WhitelabelBackendConfig } from '../../../apis/config/types';
import {
  ZigLogoDiscordIcon,
  ZigLogoLinkedInIcon,
  ZigLogoMediumIcon,
  ZigLogoTelegramIcon,
  ZigLogoTwitterIcon,
} from '@zignaly-open/ui/icons';
import InstagramIcon from '@mui/icons-material/Instagram';
import HelpIcon from '@mui/icons-material/Help';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Box } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CommunicationConfigValidation } from '../validations';
import { useSaveConfig } from '../use';
import { useWlConfigQuery } from '../../../apis/config/api';
import { useParams } from 'react-router-dom';

const socialNetworks = [
  {
    key: 'twitter',
    image: <ZigLogoTwitterIcon style={{ fill: '#03A9F4' }} />,
  },
  {
    key: 'telegram',
    image: <ZigLogoTelegramIcon style={{ fill: '#29B6F6' }} />,
  },
  {
    key: 'discord',
    image: <ZigLogoDiscordIcon style={{ fill: '#5865F2' }} />,
  },
  {
    key: 'instagram',
    image: <InstagramIcon style={{ fill: '#fff' }} />,
  },
  {
    key: 'youtube',
    image: <YouTubeIcon style={{ fill: '#F61C0D' }} />,
  },
  {
    key: 'medium',
    image: <ZigLogoMediumIcon style={{ fill: '#fff' }} />,
  },
  {
    key: 'linkedin',
    image: <ZigLogoLinkedInIcon style={{ fill: '#0288D1' }} />,
  },
];

export default function CommunicationConfig() {
  const { t } = useTranslation('config');
  const { wl } = useParams();
  const { data } = useWlConfigQuery(wl);
  const defaultValues = useMemo(
    () => ({
      social: socialNetworks.reduce((memo, { key }) => {
        memo[key] = data?.social?.[key];
        return memo;
      }, {}) as Record<keyof WhitelabelBackendConfig['social'], string>,
      supportUrl: data?.supportUrl,
      supportHelpCenter: data?.supportHelpCenter,
    }),
    [data],
  );

  const formMethods = useForm<Partial<WhitelabelBackendConfig>>({
    defaultValues,
    resolver: yupResolver(CommunicationConfigValidation),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const { submit, isLoading } = useSaveConfig(wl);

  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 2 }} variant={'h1'}>
        {t('navigation.communication-config')}
      </ZigTypography>
      <form onSubmit={handleSubmit(submit)}>
        <FormProvider {...formMethods}>
          <SectionHeader
            sx={{ mt: '19px' }}
            title={t('socials.social')}
            description={t('socials.social-description')}
          />
          <Grid container spacing={7.5}>
            {socialNetworks.map((s) => (
              <Grid item xs={12} sm={6} md={4} key={s.key}>
                <Controller
                  name={('social.' + s.key) as keyof WhitelabelBackendConfig}
                  control={control}
                  render={({ field }) => (
                    <GridUrlInput
                      id={'socials_' + s.key}
                      error={t(errors?.social?.[s.key]?.message)}
                      image={s.image}
                      label={t('socials.networks.' + s.key)}
                      disabled={isLoading}
                      {...field}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
          <SectionHeader
            title={t('socials.support')}
            description={t('socials.support-description')}
          />
          <Grid container spacing={7.5}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name={'supportUrl'}
                control={control}
                render={({ field }) => (
                  <GridUrlInput
                    error={t(errors.supportUrl?.message)}
                    id={'socials_support-url'}
                    image={<ContactSupportIcon fill={'#fff'} />}
                    label={t('socials.support-url')}
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
          <SectionHeader
            title={t('socials.emails')}
            description={t('socials.emails-description')}
          />
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <ZigTypography>{t('socials.email-sent-from')}</ZigTypography>
              <Tooltip title={t('contact-support-to-change')}>
                <ZigTypography
                  variant={'body1'}
                  component={'p'}
                  sx={{ fontSize: '16px', mt: 0.5 }}
                  color={'neutral400'}
                >
                  {data.emailOrigin}
                </ZigTypography>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ZigTypography>{t('socials.email-reply-to')}</ZigTypography>
              <ZigTypography
                variant={'body1'}
                component={'p'}
                sx={{ fontSize: '16px', mt: 0.5 }}
                color={'neutral400'}
              >
                {data.replyTo}
              </ZigTypography>
            </Grid>
          </Grid>

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
