import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon, ArrowRightIcon, Button, EditPenIcon, TextButton, Typography, } from '@zignaly-open/ui';
import { BottomContainer, Box, Circle, HorizontalConnection, InlinePriceLabel, Layout, MainPriceLabel, MiddleContainer, TopConnector, TopHorizontalConnection, TradingFunds, } from './styles';
import { useServiceDetails, useTraderServiceBalance, useTraderServiceManagement, } from '../../../../apis/service/use';
import EditMinimumBalanceModal from '../EditMinimumBalanceModal';
import TransferFundsModal from '../TransferFundsModal';
import ManagementHelper from '../ManagementHelper';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useZModal } from '../../../../components/ZModal/use';
import { useTheme } from '@mui/material';
function ServiceManagementsContainer(_a) {
    var serviceId = _a.serviceId;
    var theme = useTheme();
    var endpoints = [
        useServiceDetails(serviceId),
        useTraderServiceManagement(serviceId),
        useTraderServiceBalance(serviceId),
    ];
    var t = useTranslation(['management', 'action']).t;
    var showModal = useZModal().showModal;
    var onClickTransfers = useCallback(function () {
        showModal(TransferFundsModal, {
            serviceId: serviceId,
        });
    }, [serviceId]);
    var onClickMinBalance = function () {
        showModal(EditMinimumBalanceModal, {
            serviceId: serviceId,
        });
    };
    return (React.createElement(Layout, null,
        React.createElement(LayoutContentWrapper, { endpoint: endpoints, content: function (_a) {
                var _b, _c, _d, _e, _f, _g;
                var service = _a[0], management = _a[1], balance = _a[2];
                return (React.createElement(React.Fragment, null,
                    React.createElement(Box, null,
                        React.createElement(Typography, { variant: 'h2', color: 'neutral100' }, t('totalFunds')),
                        React.createElement(MainPriceLabel, { value: parseFloat(balance.sbt), coin: (_b = service === null || service === void 0 ? void 0 : service.ssc) !== null && _b !== void 0 ? _b : 'USDT' })),
                    React.createElement(TopConnector, null),
                    React.createElement(TopHorizontalConnection, null),
                    React.createElement(BottomContainer, null,
                        React.createElement(Box, null,
                            React.createElement(Circle, null),
                            React.createElement(Typography, { variant: 'h2', color: 'neutral100' }, t('tradingFunds')),
                            React.createElement(Typography, { color: 'neutral200' }, t('tradingFunds-desc')),
                            React.createElement(TradingFunds, null,
                                React.createElement(Typography, { color: 'neutral400', variant: 'body2' },
                                    t('availableTrading'),
                                    React.createElement(InlinePriceLabel, { value: parseFloat(balance.staSscFree), coin: (_c = service === null || service === void 0 ? void 0 : service.ssc) !== null && _c !== void 0 ? _c : 'USDT' })),
                                React.createElement(Typography, { color: 'neutral400', variant: 'body2' },
                                    t('allocatedTrading'),
                                    React.createElement(InlinePriceLabel, { value: parseFloat(balance.staSscSum), coin: (_d = service === null || service === void 0 ? void 0 : service.ssc) !== null && _d !== void 0 ? _d : 'USDT' })))),
                        React.createElement(MiddleContainer, null,
                            React.createElement(ArrowLeftIcon, { height: 24, width: 24, color: theme.palette.neutral600 }),
                            React.createElement(HorizontalConnection, null),
                            React.createElement(Button, { id: 'trader-service__transfer', variant: 'secondary', size: 'large', caption: t('transfer.title'), onClick: onClickTransfers }),
                            React.createElement(HorizontalConnection, null),
                            React.createElement(ArrowRightIcon, { height: 24, width: 24, color: theme.palette.neutral600 })),
                        React.createElement(Box, null,
                            React.createElement(Circle, null),
                            React.createElement(Typography, { variant: 'h2', color: 'neutral100' }, t('standbyFunds')),
                            React.createElement(Typography, { color: 'neutral200' }, t('standbyFunds-desc')),
                            React.createElement(TradingFunds, null,
                                React.createElement(Typography, { color: 'neutral400', variant: 'body2' },
                                    t('availableWithdrawals'),
                                    React.createElement(InlinePriceLabel, { value: parseFloat(balance.scaSscSum), coin: (_e = service === null || service === void 0 ? void 0 : service.ssc) !== null && _e !== void 0 ? _e : 'USDT' })),
                                React.createElement(Typography, { color: 'neutral400', variant: 'body2' },
                                    t('neededSnapshot'),
                                    React.createElement(InlinePriceLabel, { value: parseFloat(management.transferOut), coin: (_f = service === null || service === void 0 ? void 0 : service.ssc) !== null && _f !== void 0 ? _f : 'USDT' })),
                                React.createElement(Typography, { color: 'neutral400', variant: 'body2' },
                                    t('minBalance.title'),
                                    React.createElement(InlinePriceLabel, { value: parseFloat(management.minimumSca), coin: (_g = service === null || service === void 0 ? void 0 : service.ssc) !== null && _g !== void 0 ? _g : 'USDT' }),
                                    React.createElement(TextButton, { id: 'trader-service__edit', leftElement: React.createElement(EditPenIcon, { height: 16, width: 16, color: theme.palette.neutral300 }), caption: t('action:edit'), onClick: onClickMinBalance }))))),
                    React.createElement(ManagementHelper, null)));
            } })));
}
export default ServiceManagementsContainer;
//# sourceMappingURL=index.js.map