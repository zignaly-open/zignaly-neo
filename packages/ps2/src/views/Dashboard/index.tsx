import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('pages.dashboard'));
  return (
    <>
      <ComingSoon />
    </>
  );
};

export default Dashboard;
