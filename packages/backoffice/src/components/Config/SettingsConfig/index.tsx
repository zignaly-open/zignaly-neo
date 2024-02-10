import React from 'react';
import { PageContainer, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';

export default function SettingsConfig() {
  const { t } = useTranslation('config');
  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ZigTypography sx={{ mb: 4 }} variant={'h1'}>
        {t('navigation.settings-config')}
      </ZigTypography>
    </PageContainer>
  );
}
