import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { Box, Grid } from '@mui/material';
import { GridCell, AssetsInPoolWrapper, GridWithBottomBorder } from '../styles';
import AssetsInPool from '../../../../../components/AssetsInPool';
import ServicePercentageInfo from './ServicePercentageInfo';
import { subMonths, subYears } from 'date-fns';
import { numericFormatter } from 'react-number-format';
var SBT_UNLIMITED = 1000000000;
var ServiceSummary = function (_a) {
    var _b, _c;
    var service = _a.service;
    var t = useTranslation(['service', 'marketplace']).t;
    return (React.createElement(Box, null,
        React.createElement(GridWithBottomBorder, { container: true, pb: 2.5, pl: 2, pr: 2, pt: 0 },
            React.createElement(GridCell, { item: true, xs: 6 },
                React.createElement(ZigTypography, { color: 'neutral300' }, t('assets-in-pool')),
                React.createElement(AssetsInPoolWrapper, null,
                    React.createElement(AssetsInPool, { serviceId: service.id, prefixId: 'service-profile', assetsValue: service.investedUSDT, convertedValue: +service.invested, convertedValueCoin: service.ssc }))),
            React.createElement(GridCell, { item: true, xs: 6 },
                React.createElement(ZigTypography, { color: 'neutral300' }, t('investors-count')),
                React.createElement(ZigTypography, { variant: 'h2', color: 'neutral200', id: 'service-profile__investors' }, service.investors))),
        React.createElement(GridWithBottomBorder, { container: true, pb: 2.5, pl: 2, pr: 2, pt: 2.5 },
            React.createElement(GridCell, { item: true, xs: 4, rightBorder: true },
                React.createElement(ServicePercentageInfo, { id: 'service-profile__pnl30t', title: t('marketplace:table.n-months', { count: 1 }), value: service.pnlSsc30t, percent: service.pnlPercent30t, ssc: service.ssc, canShow: +new Date(service.createdAt) < +subMonths(new Date(), 1) })),
            React.createElement(GridCell, { item: true, xs: 4, rightBorder: true },
                React.createElement(ServicePercentageInfo, { id: 'service-profile__pnl90t', title: t('marketplace:table.n-months', { count: 3 }), value: +service.pnlSsc90t, ssc: service.ssc, percent: service.pnlPercent90t, canShow: +new Date(service.createdAt) < +subMonths(new Date(), 3) })),
            React.createElement(GridCell, { item: true, xs: 4 },
                React.createElement(ServicePercentageInfo, { id: 'service-profile__pnl365t', title: t('marketplace:table.n-years', { count: 1 }), value: service.pnlSsc365t, percent: service.pnlPercent365t, ssc: service.ssc, canShow: +new Date(service.createdAt) < +subYears(new Date(), 1) }))),
        React.createElement(Grid, { container: true, p: 2 },
            React.createElement(Grid, { item: true, xs: 6 },
                React.createElement(ZigTypography, { fontSize: 12, color: 'neutral300', sx: { mt: 0.5 }, component: 'p' },
                    t('summary.base-currency'),
                    ' ',
                    React.createElement(ZigTypography, { fontSize: 12, color: 'neutral200', id: 'service-profile__base-currency' }, service.ssc)),
                React.createElement(ZigTypography, { fontSize: 12, color: 'neutral300', sx: { mt: 0.5 }, component: 'p' },
                    t('summary.funds-allocated'),
                    ' ',
                    React.createElement(ZigTypography, { fontSize: 12, color: 'neutral200', id: 'service-profile__funds-allocated' }, service.maximumSbt >= SBT_UNLIMITED
                        ? t('summary.no-max-limit')
                        : t('common:percent', {
                            value: numericFormatter(service.fundsAllocated, {
                                thousandSeparator: true,
                                decimalScale: 2,
                            }),
                        }))),
                React.createElement(ZigTypography, { fontSize: 12, color: 'neutral300', sx: { mt: 0.5 }, component: 'p' },
                    t('summary.success-fee'),
                    ' ',
                    React.createElement(ZigTypography, { fontSize: 12, color: 'neutral200', id: 'service-profile__success-fee' }, t('common:percent', { value: +service.successFee })))),
            React.createElement(Grid, { item: true, xs: 6 },
                React.createElement(ZigTypography, { fontSize: 12, color: 'neutral300', sx: { mt: 0.5 }, component: 'p' },
                    t('summary.tags'),
                    ' ',
                    React.createElement(ZigTypography, { fontSize: 12, color: 'neutral200', id: 'service-profile__tags' }, ((_b = service.tags) === null || _b === void 0 ? void 0 : _b.length) ? (_c = service.tags) === null || _c === void 0 ? void 0 : _c.join(', ') : React.createElement(React.Fragment, null, "\u2014")))))));
};
export default ServiceSummary;
//# sourceMappingURL=ServiceSummary.js.map