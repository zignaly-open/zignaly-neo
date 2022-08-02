import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../components/common/Page';
import Deposit from '../components/Onboarding/Deposit';

function DepositPage() {
  const { t } = useTranslation('balance');
  return (
    <Page title={t('buy-bids')}>
      <Deposit />
    </Page>
  );
}

export default DepositPage;
