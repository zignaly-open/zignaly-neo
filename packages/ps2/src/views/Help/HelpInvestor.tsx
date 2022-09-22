import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ComingSoon from '../../components/ComingSoon';

const HelpInvestor: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('help'));
  return <ComingSoon />;
};

export default HelpInvestor;
