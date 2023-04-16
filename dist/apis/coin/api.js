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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { isString, pickBy } from 'lodash-es';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';
export var api = injectEndpoints(baseApiPs2, function (builder) { return ({
    coins: builder.query({
        query: function (_a) {
            var exchangeInternalId = _a.exchangeInternalId, _b = _a.convert, convert = _b === void 0 ? false : _b;
            return ({
                url: "user/exchanges/".concat(exchangeInternalId, "/assets"),
                params: {
                    view: 'reduced',
                    convert: convert,
                },
            });
        },
        providesTags: ['Balance'],
    }),
    bulkCoins: builder.query({
        queryFn: function (_a, _queryApi, _extraOptions, fetchWithBQ) {
            var exchangeAccounts = _a.exchangeAccounts;
            return __awaiter(this, void 0, void 0, function () {
                var doFetch, res, e_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            doFetch = function (exchangeInternalId) { return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, fetchWithBQ("user/exchanges/".concat(exchangeInternalId, "/assets?view=reduced&convert=false"))];
                                        case 1:
                                            result = _a.sent();
                                            if (result.error)
                                                throw result.error;
                                            return [2, { exchangeInternalId: exchangeInternalId, balances: result.data }];
                                    }
                                });
                            }); };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4, Promise.all(exchangeAccounts.map(doFetch))];
                        case 2:
                            res = _b.sent();
                            return [2, { data: res }];
                        case 3:
                            e_1 = _b.sent();
                            return [2, { error: e_1 }];
                        case 4: return [2];
                    }
                });
            });
        },
    }),
    allCoins: builder.query({
        query: function (exchangeType) { return ({
            url: "coins/zgly_".concat(exchangeType),
        }); },
    }),
    depositInfo: builder.query({
        query: function (_a) {
            var exchangeId = _a.exchangeId, coinId = _a.coinId, networkId = _a.networkId;
            return ({
                url: "/user/exchanges/".concat(exchangeId, "/deposit_address/").concat(coinId, "?network=").concat(networkId),
            });
        },
    }),
    withdraw: builder.mutation({
        query: function (_a) {
            var exchangeInternalId = _a.exchangeInternalId, rest = __rest(_a, ["exchangeInternalId"]);
            return ({
                url: "/user/exchanges/".concat(exchangeInternalId, "/withdraw"),
                method: 'POST',
                body: rest,
            });
        },
        onQueryStarted: function (_, _a) {
            var dispatch = _a.dispatch, queryFulfilled = _a.queryFulfilled;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, queryFulfilled];
                        case 1:
                            _b.sent();
                            setTimeout(function () {
                                dispatch(api.util.invalidateTags(['Balance']));
                            }, 5000);
                            return [2];
                    }
                });
            });
        },
    }),
    transactionsHistory: builder.query({
        query: function (_a) {
            var _b;
            var exchangeInternalId = _a.exchangeInternalId, params = __rest(_a, ["exchangeInternalId"]);
            var searchParams = new URLSearchParams(pickBy(__assign(__assign({}, params), { limit: (_b = params.limit) === null || _b === void 0 ? void 0 : _b.toString() }), isString));
            return {
                url: "user/exchanges/".concat(exchangeInternalId, "/transactions_history?").concat(searchParams.toString()),
            };
        },
    }),
    transactionsHistoryCsv: builder.mutation({
        query: function (_a) {
            var exchangeInternalId = _a.exchangeInternalId, days = _a.days, type = _a.type;
            return ({
                url: "/user/exchanges/".concat(exchangeInternalId, "/transactions_history_csv"),
                method: 'POST',
                params: __assign({ days: days }, (type && { type: type })),
            });
        },
    }),
}); });
export var useCoinsQuery = api.useCoinsQuery, useBulkCoinsQuery = api.useBulkCoinsQuery, useAllCoinsQuery = api.useAllCoinsQuery, useDepositInfoQuery = api.useDepositInfoQuery, useWithdrawMutation = api.useWithdrawMutation, useTransactionsHistoryCsvMutation = api.useTransactionsHistoryCsvMutation, useTransactionsHistoryQuery = api.useTransactionsHistoryQuery;
//# sourceMappingURL=api.js.map