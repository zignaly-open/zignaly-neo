import React from 'react';
import { Inline, PendingTransaction } from '../styles';
import { ArrowRightIcon, RefreshIcon, TextButton, Typography, } from '@zignaly-open/ui';
import { EditInvestmentViews } from '../types';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useInvestmentDetails, useSelectedInvestment, } from '../../../../../apis/investment/use';
var PendingTransactions = function (_a) {
    var setView = _a.setView;
    var theme = useTheme();
    var serviceId = useSelectedInvestment().serviceId;
    var details = useInvestmentDetails(serviceId).data;
    var t = useTranslation('edit-investment').t;
    var pendingTransactionsCount = [
        details === null || details === void 0 ? void 0 : details.pending,
        details === null || details === void 0 ? void 0 : details.transferOut,
        details === null || details === void 0 ? void 0 : details.profitOut,
    ].filter(function (x) { return x && x > 0; }).length;
    return pendingTransactionsCount > 0 ? (React.createElement(PendingTransaction, null,
        React.createElement(Inline, null,
            React.createElement(RefreshIcon, null),
            React.createElement(Typography, { variant: 'body1', color: 'yellow' }, t('pendingTransactions.status', {
                count: pendingTransactionsCount,
            }))),
        React.createElement("div", null,
            React.createElement(TextButton, { rightElement: React.createElement(ArrowRightIcon, { width: '22px', height: '22px', color: theme.palette.links }), caption: t('pendingTransactions.link-label'), onClick: function () { return setView(EditInvestmentViews.PendingTransactions); } })))) : null;
};
export default PendingTransactions;
//# sourceMappingURL=PendingTransactions.js.map