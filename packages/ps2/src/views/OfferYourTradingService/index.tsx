import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import BecomeTraderLanding from './components/BecomeTraderLanding';

const OfferYourTradingService: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('become-trader'));
  return <BecomeTraderLanding />;
};

export default OfferYourTradingService;
