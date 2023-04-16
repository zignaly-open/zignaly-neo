import React from 'react';
import { useInvestedAccountsCount, useIsInvestedInService, } from '../../../../../apis/investment/use';
import { useZModal } from '../../../../../components/ZModal/use';
import EditInvestmentModal from '../../../../Dashboard/components/ManageInvestmentModals/EditInvestmentModal';
import { useTranslation } from 'react-i18next';
import { BigNumberWrapper, BigNumberWrapperInvested, InvestButtonContainer, StyledPencilIcon, } from '../styles';
import { TextButton, Typography, ZigPriceLabel, ZigTypography, } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import OtherAccountsButton from './OtherAccountsButton';
var BigNumber = function (_a) {
    var ssc = _a.ssc, _b = _a.green, green = _b === void 0 ? false : _b, shorten = _a.shorten, _c = _a.red, red = _c === void 0 ? false : _c, value = _a.value;
    return (React.createElement(BigNumberWrapper, null,
        React.createElement(ZigPriceLabel, { value: value, coin: ssc, shorten: shorten, color: green ? 'greenGraph' : red ? 'redGraphOrError' : undefined })));
};
var InvestedButton = function (_a) {
    var prefixId = _a.prefixId, ctaId = _a.ctaId, service = _a.service;
    var investedAmount = useIsInvestedInService(service.id).investedAmount;
    return (React.createElement(InvestedButtonBase, { prefixId: prefixId, ctaId: ctaId, showMultipleAccountButton: true, service: service, investedAmount: investedAmount }));
};
export var InvestedButtonBase = function (_a) {
    var prefixId = _a.prefixId, service = _a.service, investedAmount = _a.investedAmount, ctaId = _a.ctaId, showMultipleAccountButton = _a.showMultipleAccountButton;
    var showModal = useZModal({ disableAutoDestroy: true }).showModal;
    var investedFromAccounts = useInvestedAccountsCount(service.id, {
        skip: !showMultipleAccountButton,
    });
    var onClickEditInvestment = function () {
        return showModal(EditInvestmentModal, { ctaId: ctaId, serviceId: service.id });
    };
    var t = useTranslation(['service', 'action']).t;
    var showOtherAccounts = investedFromAccounts > 1 && showMultipleAccountButton;
    return (React.createElement(InvestButtonContainer, null,
        React.createElement(Typography, { variant: 'body2', color: 'neutral200' }, t('invested-label')),
        React.createElement(Box, null,
            React.createElement(BigNumberWrapperInvested, { id: prefixId && "".concat(prefixId, "__invested-").concat(service.id) },
                React.createElement(BigNumber, { ssc: service.ssc, value: investedAmount, green: true }))),
        React.createElement(Box, { sx: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
            } },
            React.createElement(TextButton, { id: prefixId && "".concat(prefixId, "__edit-").concat(service.id), leftElement: React.createElement(Box, null,
                    React.createElement(StyledPencilIcon, null)), caption: t('action:edit'), color: 'links', onClick: onClickEditInvestment }),
            showOtherAccounts && (React.createElement(ZigTypography, { color: 'neutral500' }, "|")),
            showOtherAccounts && React.createElement(OtherAccountsButton, { service: service }))));
};
export default InvestedButton;
//# sourceMappingURL=InvestedButton.js.map