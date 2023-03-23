import DashboardComponent from 'views/Dashboard/components/MyDashboard';
import React, { ComponentType, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import EditInvestmentModal from './components/ManageInvestmentModals/EditInvestmentModal';
import { useParams } from 'react-router-dom';
import { useZModal } from '../../components/ZModal/use';
import { ROUTE_DASHBOARD } from '../../routes';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('dashboard'));
  return (
    <>
      <DashboardComponent />
    </>
  );
};

export const ZModalRouteElement: React.FC<{
  bgRoute: string;
  ctaId?: string;
  component: ComponentType;
}> = ({ bgRoute, component, ctaId }) => {
  const { showModal } = useZModal();
  const params = useParams();
  useEffect(() => {
    showModal(component, { ctaId, ...params });
  }, []);
  return null;
};

export const DashboardModalInvestmentEdit: React.FC = () => (
  <ZModalRouteElement
    bgRoute={ROUTE_DASHBOARD}
    component={EditInvestmentModal}
    ctaId={'edit-investment-dashboard'}
  />
);

export default Dashboard;
