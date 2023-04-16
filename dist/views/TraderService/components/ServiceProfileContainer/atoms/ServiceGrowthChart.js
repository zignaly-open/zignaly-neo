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
import { GraphChartType, GraphTimeframe, GraphTimeframeDayLength, } from '../../../../../apis/service/types';
import { getPrecisionForCoin, ZigButtonGroupInput, ZigChart, ZigPriceLabel, ZigSelect, ZigTypography, } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { ChartWrapper, GraphPercentageWrapperBox, SelectWrapperBox, SqueezedButtonGroupWrapper, } from '../styles';
import { useChartConfig, useChartData } from '../../../../../apis/service/use';
import Stub from '../../../../../components/Stub';
import { useTranslation } from 'react-i18next';
import CenteredLoader from '../../../../../components/CenteredLoader';
import PercentChange from './PercentChange';
import { differenceInDays } from 'date-fns';
import { getColorForNumber } from '../../../../../util/numbers';
import { numericFormatter } from 'react-number-format';
import { formatCompactNumber, formatLocalizedDate, } from 'views/Dashboard/components/MyDashboard/util';
var ServiceGrowthChart = function (_a) {
    var service = _a.service;
    var _b = useChartConfig(), chartType = _b.chartType, chartTimeframe = _b.chartTimeframe, setChartTimeframe = _b.setChartTimeframe, setChartType = _b.setChartType;
    var _c = useChartData({
        service: service,
        chartTimeframe: chartTimeframe,
        chartType: chartType,
    }), data = _c.data, isLoading = _c.isLoading, isFetching = _c.isFetching, isError = _c.isError;
    var t = useTranslation(['service', 'marketplace']).t;
    var chartTypeOptions = useMemo(function () { return [
        {
            label: t('chart-options.pnl_pct_compound'),
            value: GraphChartType.pnl_pct_compound,
        },
        {
            label: t('chart-options.pnl_ssc', { coin: service.ssc }),
            value: GraphChartType.pnl_ssc,
        },
        {
            label: t('chart-options.pnl_ssc_percent', { coin: service.ssc }),
            value: GraphChartType.pnl_pct,
        },
        {
            label: t('chart-options.sbt_ssc', { coin: service.ssc }),
            value: GraphChartType.sbt_ssc,
        },
        { label: t('chart-options.investors'), value: GraphChartType.investors },
    ]; }, [t]);
    var serviceStartedDaysAgo = useMemo(function () { return differenceInDays(new Date(), new Date(service.createdAt)); }, [service.createdAt]);
    var events = useMemo(function () {
        var allEvents = [];
        if ((data === null || data === void 0 ? void 0 : data.migrationIndex) > 0) {
            allEvents.push({ x: data === null || data === void 0 ? void 0 : data.migrationIndex, label: t('migrated-to-ps2') });
            return allEvents;
        }
    }, [data === null || data === void 0 ? void 0 : data.migrationIndex]);
    var canShowSummary = typeof (data === null || data === void 0 ? void 0 : data.summary) !== 'undefined' &&
        !isError &&
        !isLoading &&
        !isFetching;
    var value = data === null || data === void 0 ? void 0 : data.summary;
    var isPercent = [
        GraphChartType.pnl_pct_compound,
        GraphChartType.at_risk_pct,
        GraphChartType.pnl_pct,
    ].includes(chartType);
    return (React.createElement(Box, null,
        React.createElement(Box, { sx: {
                mb: 2,
                minHeight: 40,
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            } },
            canShowSummary && (React.createElement(React.Fragment, null,
                React.createElement(Box, { sx: { mr: 2 } },
                    React.createElement(Box, { sx: {
                            display: 'flex',
                            alignItems: 'center',
                        } },
                        ![
                            GraphChartType.pnl_pct_compound,
                            GraphChartType.at_risk_pct,
                            GraphChartType.investors,
                        ].includes(chartType) && (React.createElement(React.Fragment, null,
                            [GraphChartType.pnl_ssc, GraphChartType.pnl_pct].includes(chartType) && (React.createElement(ZigTypography, { color: 'neutral200', variant: 'h1', sx: { mr: 0.5, position: 'relative', top: '1px' } }, t('service:total'))),
                            React.createElement(ZigPriceLabel, { coin: service.ssc, variant: 'bigNumber', shorten: true, color: chartType === GraphChartType.sbt_ssc
                                    ? 'neutral200'
                                    : +value > 0
                                        ? 'greenGraph'
                                        : 'redGraphOrError', value: value }))),
                        [
                            GraphChartType.pnl_pct_compound,
                            GraphChartType.at_risk_pct,
                        ].includes(chartType) && (React.createElement(ZigTypography, { variant: 'bigNumber', sx: { whiteSpace: 'nowrap' }, color: getColorForNumber(value) }, t('common:percent', { value: value }))),
                        GraphChartType.investors === chartType && (React.createElement(ZigTypography, { color: 'neutral200', variant: 'h1', sx: { whiteSpace: 'nowrap' } }, t('marketplace:table:x-investors', {
                            count: +value,
                        }))))),
                typeof (data === null || data === void 0 ? void 0 : data.percentDiff) !== 'undefined' && (React.createElement(GraphPercentageWrapperBox, { sx: { mr: 2 } },
                    React.createElement(PercentChange, { id: 'service-profile__percent-change', colored: true, variant: 'h2', value: data === null || data === void 0 ? void 0 : data.percentDiff }))))),
            React.createElement(Box, { sx: { flex: 1 } }),
            React.createElement(SqueezedButtonGroupWrapper, { sx: { mr: 2 } },
                React.createElement(ZigButtonGroupInput, { options: Object.keys(GraphTimeframe).map(function (v, i, all) {
                        var isDisabled = i > 0 &&
                            GraphTimeframeDayLength[v] > 30 &&
                            GraphTimeframeDayLength[all[i - 1]] > serviceStartedDaysAgo;
                        return {
                            value: v,
                            label: t("periods.".concat(v)),
                            id: "service-profile__choose-period-".concat(v),
                            extraProps: {
                                size: 'small',
                                disabled: isDisabled,
                                tooltip: isDisabled
                                    ? t('service:not-enough-data')
                                    : t("periods.".concat(v, "-full")),
                            },
                        };
                    }), value: chartTimeframe, onChange: function (v) { return setChartTimeframe(v); } })),
            React.createElement(SelectWrapperBox, null,
                React.createElement(ZigSelect, { id: 'service-profile__choose-graph-view', outlined: true, width: 170, small: true, value: chartType, onChange: function (v) { return setChartType(v); }, options: chartTypeOptions }))),
        React.createElement(ChartWrapper, null, isError ? (React.createElement(Stub, { id: 'service-profile__error-load', title: t('chart-error.heading'), description: t('chart-error.description') })) : isLoading || isFetching || !(data === null || data === void 0 ? void 0 : data.data) ? (React.createElement(CenteredLoader, null)) : (React.createElement(ZigChart, { id: 'service-profile__graph', bars: [GraphChartType.pnl_ssc, GraphChartType.pnl_pct].includes(chartType), onlyIntegerTicks: chartType === GraphChartType.investors, events: events, yAxisFormatter: function (v) {
                return "".concat(formatCompactNumber(v, isPercent ? 2 : 8)).concat(isPercent ? "%" : "");
            }, data: data === null || data === void 0 ? void 0 : data.data, tooltipFormatter: function (v) {
                var _a;
                return "".concat(formatLocalizedDate(v.date, 'PP'), "\n").concat(numericFormatter(v.y.toString(), __assign({}, (isPercent
                    ? {
                        decimalScale: 2,
                        suffix: '%',
                    }
                    : {
                        thousandSeparator: true,
                        decimalScale: (_a = getPrecisionForCoin(service.ssc)) !== null && _a !== void 0 ? _a : 8,
                        suffix: chartType === GraphChartType.investors
                            ? ''
                            : " ".concat(service.ssc),
                    }))));
            } })))));
};
export default ServiceGrowthChart;
//# sourceMappingURL=ServiceGrowthChart.js.map