import React, { useMemo } from 'react';
import { Box, Divider } from '@mui/material';
import { ZigButton, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../../routes';
import { useBalanceQuery } from 'apis/user/api';
import { useActiveExchange } from 'apis/user/use';
import { ChevronRight } from '@mui/icons-material';
import { useInvestmentsQuery } from 'apis/investment/api';
import { BalanceStatus } from './types';
import { useZModal } from 'components/ZModal/use';
import DepositModal from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';
import { GradientBorderButtonWrapper } from '../ReferralButton/atoms';
var BalanceButton = function () {
    var t = useTranslation('common').t;
    var internalId = useActiveExchange().internalId;
    var investments = useInvestmentsQuery(internalId).data;
    var balance = useBalanceQuery(internalId).data;
    var showModal = useZModal().showModal;
    var investedAmount = useMemo(function () {
        return investments === null || investments === void 0 ? void 0 : investments.reduce(function (total, investment) {
            return total + +investment.investedUSDT + +investment.pendingUSDT;
        }, 0);
    }, [investments]);
    var balanceStatus = useMemo(function () {
        if (!investments || !balance)
            return null;
        if (!investedAmount) {
            return +balance.totalFreeUSDT
                ? BalanceStatus.NoInvestments
                : BalanceStatus.NoFunds;
        }
        return BalanceStatus.Invested;
    }, [investments, balance]);
    if (!balanceStatus)
        return null;
    var linkWrap = function (v) {
        return balanceStatus === BalanceStatus.NoFunds ? (React.createElement("div", { onClick: function () {
                return showModal(DepositModal, {
                    ctaId: 'balance-add-funds-button',
                });
            } }, v)) : (React.createElement(Link, { to: generatePath(balanceStatus === BalanceStatus.NoInvestments
                ? ROUTE_PROFIT_SHARING
                : ROUTE_DASHBOARD) }, v));
    };
    return linkWrap(React.createElement(GradientBorderButtonWrapper, null,
        React.createElement(ZigButton, { id: 'menu__balance-link', component: 'a', sx: {
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                px: 1,
                py: 0.5,
            }, variant: 'outlined' },
            React.createElement(Box, { display: 'flex', alignItems: 'center' },
                React.createElement(Box, { sx: {
                        display: 'flex',
                        ml: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    } },
                    React.createElement(Box, { gap: 1, display: 'flex', justifyContent: 'space-between' },
                        React.createElement(ZigTypography, { variant: 'body2', color: 'neutral300', fontSize: '12px' }, t('balance.total')),
                        React.createElement(ZigPriceLabel, { usd: true, value: investedAmount + balance.totalFreeUSDT, color: 'neutral100', variant: 'body2', fontSize: '12px' })),
                    React.createElement(Box, { gap: 1, display: 'flex', justifyContent: 'space-between' },
                        React.createElement(ZigTypography, { variant: 'body2', color: 'neutral300', fontSize: '12px' }, t('balance.available')),
                        React.createElement(ZigPriceLabel, { usd: true, value: balance.totalFreeUSDT, color: 'neutral100', variant: 'body2', fontSize: '12px' }))),
                React.createElement(Divider, { variant: 'middle', orientation: 'vertical', sx: {
                        borderColor: function (theme) { return theme.palette.neutral600; },
                        mx: 1.5,
                        my: 0,
                    }, flexItem: true }),
                React.createElement(Box, { display: 'flex', sx: {
                        maxWidth: 113,
                    }, alignItems: 'center' },
                    React.createElement(ZigTypography, { variant: 'body2', color: 'neutral300', textAlign: 'center', fontSize: '12px' }, balanceStatus === BalanceStatus.NoFunds
                        ? t('balance.deposit-funds')
                        : balanceStatus === BalanceStatus.NoInvestments
                            ? t('balance.find-traders')
                            : t('balance.my-portfolio')),
                    React.createElement(ChevronRight, null))))));
};
export default BalanceButton;
//# sourceMappingURL=index.js.map