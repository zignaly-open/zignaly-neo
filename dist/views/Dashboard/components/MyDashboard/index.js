var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { createColumnHelper, PercentageIndicator, ZigTable, ZigTypography, ZigChartMini, ZigTablePriceLabel, ZigButton, } from '@zignaly-open/ui';
import React, { useMemo } from 'react';
import { Heading, Layout, ZigTableWrapper } from './styles';
import { useTranslation } from 'react-i18next';
import { useInvestments } from '../../../../apis/investment/use';
import BigNumber from 'bignumber.js';
import { formatDateFromDays } from './util';
import { BalanceSummary } from '../BalanceSummary';
import { ServiceName } from '../ServiceName';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import { useZModal, useZRouteModal } from '../../../../components/ZModal/use';
import { differenceInDays } from 'date-fns';
import { getColorForNumber } from '../../../../util/numbers';
import InvestingLayout from '../InvestingSteps/InvestingLayout';
import { ROUTE_DASHBOARD_EDIT_INVESTMENT } from '../../../../routes';
import { Add } from '@mui/icons-material';
import DepositModal from '../ManageInvestmentModals/DepositModal';
import { Box } from '@mui/material';
var MyDashboard = function () {
    var t = useTranslation(['my-dashboard', 'table']).t;
    var showModal = useZModal().showModal;
    var exchange = useActiveExchange();
    var investmentsEndpoint = useInvestments(exchange === null || exchange === void 0 ? void 0 : exchange.internalId, {
        skip: !(exchange === null || exchange === void 0 ? void 0 : exchange.internalId),
    });
    useCoinBalances();
    var showEditInvestmentModal = useZRouteModal(ROUTE_DASHBOARD_EDIT_INVESTMENT);
    var onClickEditInvestment = function (service) {
        return showEditInvestmentModal({ serviceId: service.serviceId });
    };
    var calculateServiceAge = function (createdAt) {
        return differenceInDays(new Date(), new Date(createdAt)).toString();
    };
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () { return [
        columnHelper.accessor('invested', {
            header: t('tableHeader.summary.title'),
            meta: { subtitle: t('tableHeader.summary.subtitle') },
            cell: function (_a) {
                var original = _a.row.original;
                var bigNumberInvestment = new BigNumber(original.invested);
                var bigNumberPending = new BigNumber(original.pending);
                var totalValue = bigNumberInvestment.plus(bigNumberPending);
                return (React.createElement(BalanceSummary, { prefixId: 'portfolio-table', serviceId: original.serviceId.toString(), totalValue: totalValue.toFixed(), coin: original.ssc, profit: new BigNumber(original.pnlSumLc).toFixed(), onClickEdit: function () { return onClickEditInvestment(original); } }));
            },
            enableHiding: false,
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor('serviceName', {
            style: {
                justifyContent: 'flex-start',
                marginLeft: '83px',
                textAlign: 'left',
            },
            header: t('tableHeader.serviceName.title'),
            meta: {
                subtitle: t('tableHeader.serviceName.subtitle'),
            },
            cell: function (_a) {
                var original = _a.row.original;
                return (React.createElement(ServiceName, { prefixId: 'portfolio-table', service: original }));
            },
        }),
        columnHelper.accessor('pnl30dPct', {
            header: t('tableHeader.1-mo.title'),
            cell: function (_a) {
                var original = _a.row.original;
                return original.pnl30dPct || Object.keys(original.sparklines).length > 1 ? (React.createElement(React.Fragment, null,
                    React.createElement(ZigChartMini, { id: "portfolio-table__chart-".concat(original.serviceId), midLine: true, data: __spreadArray([0], original.sparklines, true) }),
                    React.createElement(PercentageIndicator, { id: "portfolio-table__chart-percentage-".concat(original.serviceId), normalized: true, value: new BigNumber(original.pnl30dPct).toFixed(), type: 'graph' }))) : (React.createElement(ZigTypography, { variant: 'body2', color: 'neutral400' }, t('tableHeader.1-mo.no-data')));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor('pnlDailyMeanLc', {
            header: t('tableHeader.dailyAvg-title'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(ZigTablePriceLabel, { id: "portfolio-table__dailyAvg-".concat(original.serviceId), coin: original.ssc, value: new BigNumber(getValue()).toFixed(), color: getColorForNumber(getValue()) }));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor('pnl90dPct', {
            header: t('tableHeader.3-mos-title'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(PercentageIndicator, { id: "portfolio-table__pnl90dPct-".concat(original.serviceId), normalized: true, type: 'default', value: new BigNumber(getValue()).toFixed() }));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor('pnl180dPct', {
            header: t('tableHeader.6-mos-title'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(PercentageIndicator, { id: "portfolio-table__pnl180dPct-".concat(original.serviceId), normalized: true, type: 'default', value: new BigNumber(getValue()).toFixed() }));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor('pnlPctLc', {
            header: t('tableHeader.all.title'),
            meta: { subtitle: t('tableHeader.all.subtitle') },
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(PercentageIndicator, { id: "portfolio-table__pnlPctLc-".concat(original.serviceId), type: 'default', normalized: true, value: getValue(), label: formatDateFromDays(calculateServiceAge(original.createdAt)), labelTooltip: t('tooltip-date', {
                        date: new Date(original.createdAt).toLocaleDateString(),
                    }) }));
            },
            sortingFn: 'alphanumeric',
        }),
    ]; }, [t]);
    return (React.createElement(Layout, null,
        React.createElement(LayoutContentWrapper, { unmountOnRefetch: true, endpoint: investmentsEndpoint, content: function (services) {
                var _a;
                return ((_a = investmentsEndpoint === null || investmentsEndpoint === void 0 ? void 0 : investmentsEndpoint.currentData) === null || _a === void 0 ? void 0 : _a.length) ? (React.createElement(React.Fragment, null,
                    React.createElement(Heading, null,
                        React.createElement(Box, { sx: { flex: '0 0 100px' } }),
                        React.createElement(ZigTypography, { variant: 'h1', align: 'center', sx: { flex: 1 }, id: 'my-portfolio__title' }, t('title')),
                        React.createElement(Box, { sx: { flex: '0 0 100px' } },
                            React.createElement(ZigButton, { id: 'my-portfolio__deposit', startIcon: React.createElement(Add, null), sx: { fontWeight: 600, mb: 1 }, variant: 'contained', onClick: function () {
                                    return showModal(DepositModal, {
                                        ctaId: 'account-menu-deposit',
                                    });
                                } }, t('action:deposit')))),
                    React.createElement(ZigTableWrapper, null,
                        React.createElement(ZigTable, { prefixId: 'portfolio', columns: columns, data: services, emptyMessage: t('table-search-emptyMessage'), columnVisibility: true })))) : (React.createElement(InvestingLayout, null));
            } })));
};
export default MyDashboard;
//# sourceMappingURL=index.js.map