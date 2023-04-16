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
import { useDispatch, useSelector } from 'react-redux';
import { useInvestmentsQuery, useInvestmentDetailsQuery, useUpdateTakeProfitMutation, useUpdateTakeProfitAndInvestMoreMutation, useWithdrawInvestmentMutation, useInvestedAmountQuery, useInvestInServiceMutation, } from './api';
import { setSelectedInvestment } from './store';
import { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useCoinBalances } from '../coin/use';
import { useActiveExchange, useIsAuthenticated } from '../user/use';
import { serviceToInvestmentServiceDetail } from './util';
export var useInvestments = useInvestmentsQuery;
export function useInvestmentDetails(serviceId) {
    var exchange = useActiveExchange();
    return useInvestmentDetailsQuery({
        exchangeInternalId: exchange === null || exchange === void 0 ? void 0 : exchange.internalId,
        serviceId: serviceId,
    });
}
export function useSetSelectedInvestment() {
    var dispatch = useDispatch();
    return function (service) { return dispatch(setSelectedInvestment(service)); };
}
export function useSelectInvestment(service) {
    var dispatch = useDispatch();
    useEffect(function () {
        service &&
            dispatch(setSelectedInvestment('serviceId' in service
                ? service
                : serviceToInvestmentServiceDetail(service)));
        return function () {
            dispatch(setSelectedInvestment(null));
        };
    }, [service]);
}
export function useSelectedInvestment() {
    var _a;
    return (_a = useSelector(function (state) { return state.investment; })) === null || _a === void 0 ? void 0 : _a.selectedInvestment;
}
export function useIsInvestedInService(serviceId, options) {
    var isAuthenticated = useIsAuthenticated();
    var exchange = useActiveExchange();
    var _a = useInvestedAmountQuery(serviceId, {
        skip: !isAuthenticated || !(exchange === null || exchange === void 0 ? void 0 : exchange.internalId) || (options === null || options === void 0 ? void 0 : options.skip),
    }), isLoading = _a.isLoading, data = _a.data, refetch = _a.refetch, isFetching = _a.isFetching;
    var invested = isAuthenticated && (data === null || data === void 0 ? void 0 : data[exchange === null || exchange === void 0 ? void 0 : exchange.internalId]);
    var investedAmount = new BigNumber((invested === null || invested === void 0 ? void 0 : invested.invested) || 0).plus((invested === null || invested === void 0 ? void 0 : invested.pending) || 0);
    return {
        isLoading: isAuthenticated && (isLoading || isFetching),
        refetch: refetch,
        thisAccount: investedAmount.gt(0),
        accounts: data,
        investedAmount: investedAmount.toString(),
    };
}
export function useInvestedAccountsCount(serviceId, options) {
    var isAuthenticated = useIsAuthenticated();
    var isInvested = useIsInvestedInService(serviceId, options);
    return ((isAuthenticated && Object.keys(isInvested.accounts || {}).length) || 0);
}
export function useCurrentBalance(coin) {
    var service = useSelectedInvestment();
    var _a = useCoinBalances(), coins = _a.data, isFetching = _a.isFetching;
    return useMemo(function () {
        var _a;
        return ({
            isFetching: isFetching,
            id: coin || (service === null || service === void 0 ? void 0 : service.ssc),
            balance: ((_a = coins === null || coins === void 0 ? void 0 : coins[coin || (service === null || service === void 0 ? void 0 : service.ssc)]) === null || _a === void 0 ? void 0 : _a.balanceFree) || '0',
        });
    }, [coin, service === null || service === void 0 ? void 0 : service.ssc, coins, isFetching]);
}
export function useUpdateTakeProfitPercentage(serviceId) {
    var _this = this;
    var _a = useUpdateTakeProfitMutation(), update = _a[0], isLoading = _a[1].isLoading;
    var exchange = useActiveExchange();
    return {
        isLoading: isLoading,
        edit: function (_a) {
            var profitPercentage = _a.profitPercentage;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, update({
                                profitPercentage: profitPercentage,
                                serviceId: serviceId,
                                exchangeInternalId: exchange.internalId,
                            }).unwrap()];
                        case 1:
                            _b.sent();
                            return [2];
                    }
                });
            });
        },
    };
}
export function useInvestInService(serviceId) {
    var _this = this;
    var _a = useInvestInServiceMutation(), update = _a[0], isLoading = _a[1].isLoading;
    var refetch = useCoinBalances().refetch;
    var refetchInvestedState = useIsInvestedInService(serviceId).refetch;
    var exchange = useActiveExchange();
    return {
        isLoading: isLoading,
        invest: function (_a) {
            var profitPercentage = _a.profitPercentage, amount = _a.amount;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, update({
                                profitPercentage: profitPercentage,
                                serviceId: serviceId,
                                amount: amount,
                                exchangeInternalId: exchange.internalId,
                            }).unwrap()];
                        case 1:
                            _b.sent();
                            refetchInvestedState();
                            refetch();
                            return [2];
                    }
                });
            });
        },
    };
}
export function useUpdateTakeProfitAndInvestMore(serviceId) {
    var _this = this;
    var _a = useUpdateTakeProfitAndInvestMoreMutation(), update = _a[0], isLoading = _a[1].isLoading;
    var exchange = useActiveExchange();
    var refetch = useCoinBalances().refetch;
    var refetchInvestedState = useIsInvestedInService(serviceId).refetch;
    return {
        isLoading: isLoading,
        edit: function (_a) {
            var profitPercentage = _a.profitPercentage, amount = _a.amount;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, update({
                                profitPercentage: profitPercentage,
                                serviceId: serviceId,
                                exchangeInternalId: exchange.internalId,
                                amount: amount.toString(),
                            }).unwrap()];
                        case 1:
                            _b.sent();
                            refetchInvestedState();
                            refetch();
                            return [2];
                    }
                });
            });
        },
    };
}
export function useWithdrawInvestment() {
    var _this = this;
    var _a = useWithdrawInvestmentMutation(), withdraw = _a[0], isLoading = _a[1].isLoading;
    var exchange = useActiveExchange();
    var service = useSelectedInvestment();
    var refetch = useInvestmentDetails(service.serviceId).refetch;
    return {
        isLoading: isLoading,
        withdraw: function (_a) {
            var serviceId = _a.serviceId, amount = _a.amount;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, withdraw({
                                serviceId: serviceId,
                                exchangeInternalId: exchange.internalId,
                                amount: amount.toString(),
                            }).unwrap()];
                        case 1:
                            _b.sent();
                            return [4, refetch()];
                        case 2:
                            _b.sent();
                            return [2];
                    }
                });
            });
        },
    };
}
//# sourceMappingURL=use.js.map