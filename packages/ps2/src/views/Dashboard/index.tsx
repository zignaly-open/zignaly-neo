import DashboardComponent from 'features/dashboard/components/MyDashboard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('dashboard'));
  return (
    <>
      <DashboardComponent />
    </>
  );
};

export default Dashboard;
