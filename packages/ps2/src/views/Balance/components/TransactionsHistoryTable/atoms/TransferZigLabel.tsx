import { ZignalyLogo } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TypographyPanelName } from './TransactionDetails/styles';

const ZignalyAccount = ({ name }: { name?: string }) => {
  const { t } = useTranslation('transactions-history');
  return (
    <>
      <ZignalyLogo width={24} height={24} style={{ marginRight: '16px' }} />
      <TypographyPanelName>{name || t('deleted')}</TypographyPanelName>
    </>
  );
};

export default ZignalyAccount;
