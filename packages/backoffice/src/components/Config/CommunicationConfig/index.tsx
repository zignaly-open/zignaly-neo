import React from 'react';
import { ZigInput, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from '../styled';
import { Grid } from '@mui/material';
import { SectionHeader } from '../atoms';
import { useForm } from 'react-hook-form';

export default function CommunicationConfig() {
  const { t } = useTranslation('config');
  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });
  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 4 }} variant={'h1'}>
        {t('navigation.communication-config')}
      </ZigTypography>
      <form>
        <SectionHeader
          title={t('socials.social')}
          description={t('socials.social-description')}
        />
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <ZigInput label={'Telegram'} />
          </Grid>
        </Grid>
        <SectionHeader
          title={t('socials.support')}
          description={t('socials.support-description')}
        />
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <ZigInput label={'Telegram'} />
          </Grid>
        </Grid>
        <SectionHeader
          title={t('socials.emails')}
          description={t('socials.emails-description')}
        />
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <ZigTypography>{t('socials.email-sent-from')}</ZigTypography>
            <ZigTypography>svsdfvsdfvf@ff.fff</ZigTypography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ZigTypography>{t('socials.email-reply-to')}</ZigTypography>
            <ZigTypography>svsdfvsdfvf@ff.fff</ZigTypography>
          </Grid>
        </Grid>
      </form>
    </ConfigWrapper>
  );
}
