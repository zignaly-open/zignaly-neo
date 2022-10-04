import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ComingSoon from '../../components/Stub/ComingSoon';

const BecomeTrader: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('become-trader'));
  return <ComingSoon />;
};

export default BecomeTrader;
