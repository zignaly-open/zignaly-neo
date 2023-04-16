var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Layout, InvestorCounts } from './styles';
import { UserIcon, Typography, PriceLabel, PercentageIndicator, ZigTable, createColumnHelper, ZigTablePriceLabel, } from '@zignaly-open/ui';
import { useTraderServiceInvestors, useServiceDetails, useTraderServiceManagement, } from '../../../../apis/service/use';
import ConnectionStateLabel from '../ConnectionStateLabel';
import { YesNo } from './atoms';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { Box } from '@mui/material';
var ServiceInvestorsContainer = function (_a) {
    var serviceId = _a.serviceId;
    var investorsEndpoint = useTraderServiceInvestors(serviceId);
    var serviceDetailsEndpoint = useServiceDetails(serviceId);
    var managementEndpoint = useTraderServiceManagement(serviceId);
    var service = serviceDetailsEndpoint.data;
    var t = useTranslation('investors').t;
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () {
        return [
            columnHelper.accessor('email', {
                header: t('tableHeader.email'),
            }),
            columnHelper.accessor('userId', {
                header: t('tableHeader.userId'),
            }),
            columnHelper.accessor(function (row) { return new BigNumber(row.invested).toFixed(); }, {
                header: function () { return (React.createElement(Box, { display: 'flex', flexDirection: 'column' },
                    t('tableHeader.invested'),
                    React.createElement(Box, { fontSize: '12px', color: 'neutral300' }, t('tableHeader.pending')))); },
                id: 'investment',
                cell: function (props) {
                    var _a, _b;
                    return (React.createElement(Box, { sx: { display: 'flex', flexDirection: 'column' } },
                        React.createElement(ZigTablePriceLabel, { coin: (_a = service === null || service === void 0 ? void 0 : service.ssc) !== null && _a !== void 0 ? _a : 'USDT', value: props.getValue() }),
                        React.createElement(ZigTablePriceLabel, { showApproximate: true, variant: 'caption', coin: (_b = service === null || service === void 0 ? void 0 : service.ssc) !== null && _b !== void 0 ? _b : 'USDT', value: props.row.original.pending, color: 'neutral300' })));
                },
            }),
            columnHelper.accessor('pnlNetLc', {
                header: t('tableHeader.P&L'),
                cell: function (props) {
                    var _a;
                    return (React.createElement(PriceLabel, { coin: (_a = service === null || service === void 0 ? void 0 : service.ssc) !== null && _a !== void 0 ? _a : 'USDT', value: parseFloat(props.getValue()), bottomElement: React.createElement(PercentageIndicator, { value: props.row.original.pnlPctLc }) }));
                },
            }),
            columnHelper.accessor('pnlNetAt', {
                header: t('tableHeader.P&LTotal'),
                cell: function (props) {
                    var _a;
                    return (React.createElement(ZigTablePriceLabel, { coin: (_a = service === null || service === void 0 ? void 0 : service.ssc) !== null && _a !== void 0 ? _a : 'USDT', value: parseFloat(props.getValue()) }));
                },
            }),
            columnHelper.accessor('sfOwnerAt', {
                header: t('tableHeader.totalFeesPaid'),
                cell: function (props) {
                    var _a;
                    return (React.createElement(ZigTablePriceLabel, { coin: (_a = service === null || service === void 0 ? void 0 : service.ssc) !== null && _a !== void 0 ? _a : 'USDT', value: parseFloat(props.getValue()) }));
                },
            }),
            columnHelper.accessor('successFee', {
                header: t('tableHeader.successFee'),
                cell: function (props) { return "".concat(props.getValue(), "%"); },
            }),
            columnHelper.accessor('payZig', {
                header: t('tableHeader.feesZIG'),
                cell: function (props) { return React.createElement(YesNo, { value: props.getValue() }); },
            }),
            columnHelper.accessor('accountType', {
                header: t('tableHeader.status'),
                cell: function (props) { return React.createElement(ConnectionStateLabel, { stateId: props.getValue() }); },
            }),
        ];
    }, []);
    return (React.createElement(Layout, null,
        React.createElement(LayoutContentWrapper, { endpoint: [
                investorsEndpoint,
                managementEndpoint,
                serviceDetailsEndpoint,
            ], content: function (_a) {
                var investors = _a[0], management = _a[1];
                return (React.createElement(React.Fragment, null,
                    React.createElement(InvestorCounts, null,
                        React.createElement(UserIcon, { width: '17px', height: '20px', color: '#65647E' }),
                        React.createElement(Typography, { variant: 'h3', color: 'almostWhite' }, t('number-of-investors', {
                            count: investors === null || investors === void 0 ? void 0 : investors.length,
                        }))),
                    React.createElement(ZigTable, { prefixId: 'investor', columns: columns, data: investors.map(function (inv) { return (__assign(__assign({}, inv), { successFee: inv.accountType === 'owner' ? '0' : management.successFee })); }), emptyMessage: t('no-investors'), enableSortingRemoval: false })));
            } })));
};
export default ServiceInvestorsContainer;
//# sourceMappingURL=index.js.map