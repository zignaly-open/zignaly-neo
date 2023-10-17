import DashboardComponent from 'views/Dashboard/components/MyDashboard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import EditInvestmentModal from './components/ManageInvestmentModals/EditInvestmentModal';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('dashboard'));
  return <DashboardComponent />;
};

export const DashboardModalInvestmentEdit = createZModalRouteElement({
  component: EditInvestmentModal,
});

export default Dashboard;
