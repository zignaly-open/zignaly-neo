import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import Marketplace from './components/Marketplace';

const ProfitSharing: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('profit-sharing.title'));
  return (
    <>
      <Marketplace />
    </>
  );
};

export default ProfitSharing;
