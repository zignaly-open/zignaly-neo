import React from 'react';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from '../../../../../apis/user/use';
import { useZModal, useZRouteModal, } from '../../../../../components/ZModal/use';
import { useCurrentBalance, useInvestedAccountsCount, } from '../../../../../apis/investment/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../../../../routes';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import OtherAccountsButton from './OtherAccountsButton';
import { Box } from '@mui/material';
import InvestDepositModal from 'views/Dashboard/components/ManageInvestmentModals/IndestDepositModal';
var InvestButton = function (_a) {
    var prefixId = _a.prefixId, modalRoute = _a.modalRoute, service = _a.service, ctaId = _a.ctaId, showMultipleAccountButton = _a.showMultipleAccountButton;
    var t = useTranslation([
        'service',
        'purchase-deposit-crypto',
        'deposit-crypto',
    ]).t;
    var isAuthenticated = useIsAuthenticated();
    var showModal = useZModal({ disableAutoDestroy: true }).showModal;
    var showInvestModal = useZRouteModal(modalRoute);
    var navigate = useNavigate();
    useCurrentBalance(service.ssc);
    var location = useLocation();
    var investedFromAccounts = useInvestedAccountsCount(service.id, {
        skip: !showMultipleAccountButton,
    });
    var onClickMakeInvestment = function () {
        if (isAuthenticated) {
            if (modalRoute) {
                showInvestModal({ serviceId: service.id });
            }
            else {
                showModal(InvestDepositModal, { ctaId: ctaId, serviceId: service.id });
            }
        }
        else {
            var newUser = !localStorage.getItem('hasLoggedIn');
            navigate(newUser ? ROUTE_SIGNUP : ROUTE_LOGIN, {
                state: { redirectTo: location },
            });
        }
    };
    var showOtherAccounts = investedFromAccounts > 1 && showMultipleAccountButton;
    var maxReached = +service.invested + service.pending >= service.maximumSbt;
    return (React.createElement(React.Fragment, null,
        React.createElement(ZigButton, { id: prefixId && "".concat(prefixId, "__invest-").concat(service.id), onClick: onClickMakeInvestment, variant: 'contained', size: 'large', disabled: maxReached, sx: { flexDirection: 'column', minWidth: 165 }, tooltip: maxReached ? t('invest-button.max-reached-tooltip') : null },
            React.createElement(React.Fragment, null,
                React.createElement(ZigTypography, { variant: 'body2', color: 'neutral000', fontWeight: 600, letterSpacing: 1.1 }, t(maxReached
                    ? 'invest-button.max-reached'
                    : 'invest-button.invest-now')),
                !maxReached && (React.createElement(ZigTypography, { variant: 'h5', color: 'neutral150', fontWeight: 500 }, t('invest-button.x-success-fee', {
                    fee: service.successFee,
                }))))),
        showOtherAccounts && (React.createElement(Box, { sx: { pt: 0.5, textAlign: 'center' } },
            React.createElement(OtherAccountsButton, { service: service })))));
};
export default InvestButton;
//# sourceMappingURL=InvestButton.js.map