import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import Marketplace from './components/Marketplace';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
import DepositModal from '../Dashboard/components/ManageInvestmentModals/DepositModal';
var ProfitSharing = function () {
    var t = useTranslation('pages').t;
    useTitle(t('profit-sharing.title'));
    return (React.createElement(React.Fragment, null,
        React.createElement(Marketplace, null)));
};
export default ProfitSharing;
export var ProfitSharingInvest = createZModalRouteElement({
    component: DepositModal,
    ctaId: 'profit-sharing-url',
});
//# sourceMappingURL=index.js.map