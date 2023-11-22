import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import BecomeTraderLanding from './components/BecomeTraderLanding';

const BecomeTrader: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('become-trader'));
  return <BecomeTraderLanding />;
};

export default BecomeTrader;
