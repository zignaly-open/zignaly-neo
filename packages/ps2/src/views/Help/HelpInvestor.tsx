import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import ComingSoon from '../../components/Stub/ComingSoon';

const HelpInvestor: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('help'));
  return <ComingSoon />;
};

export default HelpInvestor;
