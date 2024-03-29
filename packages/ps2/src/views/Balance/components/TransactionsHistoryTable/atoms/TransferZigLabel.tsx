import { ZignalyLogo } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TypographyPanelName } from './TransactionDetails/styles';
import { isZignaly } from '../../../../../whitelabel';

const ZignalyAccount = ({ name, id }: { name?: string; id?: string }) => {
  const { t } = useTranslation('transactions-history');
  return (
    <>
      {isZignaly && (
        <ZignalyLogo
          width={24}
          height={24}
          style={{ marginRight: '16px' }}
          className={'balances-table-transaction-expanded__zignaly-logo'}
        />
      )}
      <TypographyPanelName id={id}>{name || t('deleted')}</TypographyPanelName>
    </>
  );
};

export default ZignalyAccount;
