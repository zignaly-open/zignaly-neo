import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../components/common/Page';
import Profile from '../components/Onboarding/Profile';

function ProfilePage() {
  const { t } = useTranslation('balance');
  return (
    <Page title={t('buy-bids')}>
      <Profile />
    </Page>
  );
}

export default ProfilePage;
