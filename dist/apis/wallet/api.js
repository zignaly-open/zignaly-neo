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
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../baseQuery';
export var api = createApi({
    baseQuery: baseQuery(process.env.REACT_APP_WALLET_API),
    reducerPath: 'walletApi',
    tagTypes: ['Balance', 'WalletTransactions'],
    endpoints: function (builder) { return ({
        coins: builder.query({
            query: function () { return ({
                url: process.env.REACT_APP_WALLET_API + '/get-currencies',
            }); },
        }),
        balance: builder.query({
            query: function () { return ({
                url: process.env.REACT_APP_WALLET_API + '/get-balance',
            }); },
            providesTags: ['Balance'],
        }),
        savings: builder.query({
            query: function () { return ({
                url: process.env.REACT_APP_WALLET_API + '/total-savings',
            }); },
        }),
        depositInfo: builder.query({
            query: function (_a) {
                var coin = _a.coin, network = _a.network;
                return ({
                    url: "generate-address/".concat(network, "/currency/").concat(coin),
                    method: 'POST',
                });
            },
        }),
        withdraw: builder.mutation({
            query: function (_a) {
                var network = _a.network, coin = _a.coin, rest = __rest(_a, ["network", "coin"]);
                return ({
                    url: "make-withdraw/".concat(network, "/currency/").concat(coin),
                    body: rest,
                    method: 'POST',
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
                                    dispatch(api.util.invalidateTags(['Balance', 'WalletTransactions']));
                                }, 5000);
                                return [2];
                        }
                    });
                });
            },
        }),
        transactionsHistory: builder.query({
            query: function (params) {
                return {
                    url: '/get-operations',
                    params: params,
                };
            },
            providesTags: ['WalletTransactions'],
        }),
        downloadTransactionsHistory: builder.mutation({
            query: function () { return ({
                url: "history.csv",
                responseHandler: function (response) { return __awaiter(void 0, void 0, void 0, function () {
                    var href, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = URL).createObjectURL;
                                return [4, response.blob()];
                            case 1: return [4, _b.apply(_a, [_c.sent()])];
                            case 2:
                                href = _c.sent();
                                Object.assign(document.createElement('a'), {
                                    href: href,
                                    download: 'transactions.csv',
                                }).click();
                                return [2];
                        }
                    });
                }); },
                cache: 'no-cache',
                headers: {
                    'content-type': '',
                },
            }); },
        }),
        generateBuyPrice: builder.query({
            query: function (params) { return ({
                url: "generate-buy-price",
                method: 'POST',
                body: params,
            }); },
        }),
        buy: builder.mutation({
            query: function (params) { return ({
                url: "buy-coin",
                method: 'POST',
                body: params,
            }); },
            onQueryStarted: function (_, _a) {
                var dispatch = _a.dispatch, queryFulfilled = _a.queryFulfilled;
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, queryFulfilled];
                            case 1:
                                _b.sent();
                                setTimeout(function () {
                                    dispatch(api.util.invalidateTags(['Balance', 'WalletTransactions']));
                                }, 5000);
                                return [2];
                        }
                    });
                });
            },
        }),
        generateWithdrawFee: builder.query({
            query: function (_a) {
                var network = _a.network, coin = _a.coin;
                return ({
                    url: "generate-fee/".concat(network, "/currency/").concat(coin),
                    method: 'POST',
                });
            },
        }),
    }); },
});
export var useBalanceQuery = api.useBalanceQuery, useCoinsQuery = api.useCoinsQuery, useSavingsQuery = api.useSavingsQuery, useTransactionsHistoryQuery = api.useTransactionsHistoryQuery, useDepositInfoQuery = api.useDepositInfoQuery, useGenerateBuyPriceQuery = api.useGenerateBuyPriceQuery, useGenerateWithdrawFeeQuery = api.useGenerateWithdrawFeeQuery, useWithdrawMutation = api.useWithdrawMutation, useBuyMutation = api.useBuyMutation, useDownloadTransactionsHistoryMutation = api.useDownloadTransactionsHistoryMutation;
//# sourceMappingURL=api.js.map