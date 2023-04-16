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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useTraderServiceBalanceQuery, useTraderServiceDetailsQuery, useTraderServiceGraphQuery, useTraderServiceInvestorsQuery, useTraderServiceManagementQuery, useTraderServicesQuery, useTraderServiceTransferFundsMutation, useTraderServiceUpdateScaMinimumMutation, } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { format, parse, subDays } from 'date-fns';
import { GraphChartType, GraphTimeframe, GraphTimeframeDayLength, } from './types';
import { useIsAuthenticated } from '../user/use';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { setChartTimeframe, setChartType } from './store';
import { useMemo } from 'react';
import { formatMonthDay } from '../../views/Dashboard/components/MyDashboard/util';
export function useTraderServices() {
    var isAuthenticated = useIsAuthenticated();
    return useTraderServicesQuery(null, {
        skip: !isAuthenticated,
    });
}
export function useIsServiceOwner(serviceId) {
    var isAuthenticated = useIsAuthenticated();
    var traderServices = useTraderServices().data;
    return (isAuthenticated &&
        (traderServices === null || traderServices === void 0 ? void 0 : traderServices.some(function (s) { return s.serviceId === serviceId; })));
}
export function useFirstOwnedService() {
    var traderServices = useTraderServices().data;
    return (traderServices && traderServices[0]) || null;
}
export var useTraderServiceInvestors = useTraderServiceInvestorsQuery;
export var useTraderServiceManagement = useTraderServiceManagementQuery;
export var useServiceDetails = useTraderServiceDetailsQuery;
export var useTraderServiceBalance = useTraderServiceBalanceQuery;
export function useTraderServiceUpdateMinimum(serviceId) {
    var _this = this;
    var _a = useTraderServiceUpdateScaMinimumMutation(), update = _a[0], isLoading = _a[1].isLoading;
    var isLoadingManagement = useTraderServiceManagement(serviceId).isFetching;
    return [
        function (minimum) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, update({ minimum: minimum, serviceId: serviceId }).unwrap()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); },
        { isLoading: isLoading || isLoadingManagement },
    ];
}
export function useTraderServiceTransferFunds(serviceId) {
    var _this = this;
    var _a = useTraderServiceTransferFundsMutation(), update = _a[0], isLoading = _a[1].isLoading;
    var isLoadingManagement = useTraderServiceBalance(serviceId).isFetching;
    return [
        function (payload) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, update(__assign(__assign({}, payload), { serviceId: serviceId })).unwrap()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); },
        { isLoading: isLoading || isLoadingManagement },
    ];
}
export function useTraderServiceTitle(translationKey, serviceId) {
    var service = useServiceDetails(serviceId).data;
    var t = useTranslation('pages').t;
    useTitle(service
        ? t(translationKey, { serviceName: service.name })
        : t('trading-services'));
}
export function useChartConfig() {
    var _a = useSelector(function (store) { return store.service; }), chartType = _a.chartType, chartTimeframe = _a.chartTimeframe;
    var dispatch = useDispatch();
    return {
        chartType: chartType || GraphChartType.pnl_pct_compound,
        chartTimeframe: chartTimeframe || GraphTimeframe['30d'],
        setChartType: function (v) { return dispatch(setChartType(v)); },
        setChartTimeframe: function (v) { return dispatch(setChartTimeframe(v)); },
    };
}
export function useChartData(_a) {
    var service = _a.service, chartType = _a.chartType, chartTimeframe = _a.chartTimeframe;
    var _b = useTraderServiceGraphQuery({
        id: service.id,
        period: chartTimeframe,
        chart: chartType,
    }), data = _b.data, isLoading = _b.isLoading, isFetching = _b.isFetching, isError = _b.isError;
    var chartData = useMemo(function () {
        var chart = __assign({}, ((data === null || data === void 0 ? void 0 : data.data) || {}));
        var now = new Date();
        for (var i = -1 * (GraphTimeframeDayLength[chartTimeframe] || 0); i < 0; i++) {
            var key = format(subDays(now, -1 * i), 'yyyy-MM-dd');
            if (typeof chart[key] !== 'undefined') {
                break;
            }
            else {
                chart[key] = 0;
            }
        }
        var dates = Object.entries(chart).sort(function (_a, _b) {
            var a = _a[0];
            var b = _b[0];
            return a.localeCompare(b);
        });
        var graph = dates === null || dates === void 0 ? void 0 : dates.map(function (_a) {
            var date = _a[0], value = _a[1];
            var dateObj = parse(date, 'yyyy-MM-dd', Date.now());
            return {
                x: formatMonthDay(dateObj),
                date: dateObj,
                y: value,
            };
        });
        return {
            summary: data === null || data === void 0 ? void 0 : data.summary,
            percentDiff: [GraphChartType.investors, GraphChartType.sbt_ssc].includes(chartType)
                ? data === null || data === void 0 ? void 0 : data.summaryPct
                : undefined,
            migrationDate: data === null || data === void 0 ? void 0 : data.migration_date,
            migrationIndex: dates.findIndex(function (_a) {
                var x = _a[0];
                return x === (data === null || data === void 0 ? void 0 : data.migration_date);
            }),
            data: graph,
        };
    }, [data === null || data === void 0 ? void 0 : data.data]);
    return { data: chartData, isLoading: isLoading, isFetching: isFetching, isError: isError };
}
//# sourceMappingURL=use.js.map