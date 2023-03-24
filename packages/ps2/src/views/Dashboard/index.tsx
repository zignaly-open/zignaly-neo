import DashboardComponent from 'views/Dashboard/components/MyDashboard';
import React, { ComponentType, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import EditInvestmentModal from './components/ManageInvestmentModals/EditInvestmentModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useZModal } from '../../components/ZModal/use';
import { ROUTE_DASHBOARD } from '../../routes';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('dashboard'));
  return <DashboardComponent />;
};

export const ZModalRouteElement: React.FC<{
  bgRoute: string;
  ctaId?: string;
  component: ComponentType;
}> = ({ bgRoute, component, ctaId }) => {
  const navigate = useNavigate();
  const { showModal } = useZModal({
    // ideally we should use useMatches fron the latest react-router's api
    // but that would require us to swith to data router. meh.
    customClose: () => navigate(bgRoute),
  });
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
