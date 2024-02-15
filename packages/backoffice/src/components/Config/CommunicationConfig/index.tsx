import React, { useMemo } from 'react';
import { useToast, ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from '../styled';
import { Grid, Tooltip } from '@mui/material';
import { GridInput, SectionHeader } from '../atoms';
import { Controller, useForm } from 'react-hook-form';
import { useCurrentWlConfig, useSaveCurrentWlConfig } from '../use';
import { WhitelabelConfig } from '../../../apis/config/types';
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
import { CommunicationConfigValidation } from './validations';

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
  const { data } = useCurrentWlConfig();
  const defaultValues = useMemo(
    () => ({
      social: socialNetworks.reduce((memo, { key }) => {
        memo[key] = data?.social?.[key];
        return memo;
      }, {}) as Record<keyof WhitelabelConfig['social'], string>,
      supportUrl: data?.supportUrl,
      supportHelpCenter: data?.supportHelpCenter,
    }),
    [data],
  );

  const { control, handleSubmit, reset, formState: { errors } } = useForm<Partial<WhitelabelConfig>>({
    defaultValues,
    resolver: yupResolver(CommunicationConfigValidation),
  });

  const [save, { isLoading }] = useSaveCurrentWlConfig();

  // validation

  const toast = useToast();

  const submit = (values: Partial<WhitelabelConfig>) => {
    save(values)
      .unwrap()
      .then(() => {
        toast.success(t('saved'));
      })
      .catch((e) => {
        toast.error(
          t('failed') +
            ' ' +
            (e?.data?.error?.msg
              ? t(`error:error.${e?.data?.error?.msg}`)
              : ''),
        );
      });
  };

  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 2 }} variant={'h1'}>
        {t('navigation.communication-config')}
      </ZigTypography>
      <form onSubmit={handleSubmit(submit)}>
        <SectionHeader
          title={t('socials.social')}
          description={t('socials.social-description')}
        />
        <Grid container spacing={4}>
          {socialNetworks.map((s) => (
            <Grid item xs={12} sm={6} md={4} key={s.key}>
              <Controller
                name={('social.' + s.key) as keyof WhitelabelConfig}
                control={control}
                render={({ field }) => (
                  <GridInput
                    id={'socials_' + s.key}
                    error={t(errors.socials?[s.key])}
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
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name={'supportUrl'}
              control={control}
              render={({ field }) => (
                <GridInput
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
                <GridInput
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
      </form>
    </ConfigWrapper>
  );
}
