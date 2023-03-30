import DashboardComponent from 'views/Dashboard/components/MyDashboard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import EditInvestmentModal from './components/ManageInvestmentModals/EditInvestmentModal';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('dashboard'));
  return <DashboardComponent />;
};

export const DashboardModalInvestmentEdit = createZModalRouteElement({
  component: EditInvestmentModal,
  ctaId: 'edit-investment-dashboard',
});

export default Dashboard;
