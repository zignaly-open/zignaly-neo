import DashboardComponent from 'views/Dashboard/components/MyDashboard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import EditInvestmentModal from './components/ManageInvestmentModals/EditInvestmentModal';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
var Dashboard = function () {
    var t = useTranslation('pages').t;
    useTitle(t('dashboard'));
    return React.createElement(DashboardComponent, null);
};
export var DashboardModalInvestmentEdit = createZModalRouteElement({
    component: EditInvestmentModal,
    ctaId: 'edit-investment-dashboard',
});
export default Dashboard;
//# sourceMappingURL=index.js.map