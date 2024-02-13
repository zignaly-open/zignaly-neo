import React from 'react';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ConfigWrapper } from '../styled';

export default function CommunicationConfig() {
  const { t } = useTranslation('config');
  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 4 }} variant={'h1'}>
        {t('navigation.communication-config')}
      </ZigTypography>
    </ConfigWrapper>
  );
}
