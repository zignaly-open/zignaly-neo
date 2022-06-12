import React from 'react';
import { useTranslation } from 'react-i18next';
import HowItWorksInner from '../components/Onboarding/HowItWorks';
import Page from '../components/common/Page';

function HowItWorksPage() {
  const { t } = useTranslation('how-it-works');
  return (
    <Page title={t('how-it-works')}>
      <HowItWorksInner />
    </Page>
  );
}

export default HowItWorksPage;
