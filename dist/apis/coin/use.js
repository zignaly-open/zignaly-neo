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
import { useAllCoinsQuery, useCoinsQuery, useDepositInfoQuery, useTransactionsHistoryQuery, } from './api';
import useInfinitePaginatedQuery from 'util/hooks/useInfinitePaginatedQuery';
import { useActiveExchange } from '../user/use';
export function useCoinBalances(options) {
    var _a = options || {}, _b = _a.convert, convert = _b === void 0 ? false : _b, _c = _a.refetch, refetch = _c === void 0 ? false : _c;
    var exchange = useActiveExchange();
    return useCoinsQuery({
        exchangeInternalId: exchange === null || exchange === void 0 ? void 0 : exchange.internalId,
        convert: convert,
    }, { skip: !(exchange === null || exchange === void 0 ? void 0 : exchange.internalId), refetchOnMountOrArgChange: refetch || 30 });
}
export function useExchangeCoinsList() {
    var exchange = useActiveExchange();
    return useAllCoinsQuery(exchange === null || exchange === void 0 ? void 0 : exchange.exchangeType, {
        skip: !(exchange === null || exchange === void 0 ? void 0 : exchange.exchangeType),
    });
}
export function useTransactionsHistory(filters, pageIndex) {
    if (filters === void 0) { filters = {}; }
    if (pageIndex === void 0) { pageIndex = 0; }
    var exchange = useActiveExchange();
    var infinitePaginatedQuery = useInfinitePaginatedQuery(useTransactionsHistoryQuery, __assign({ exchangeInternalId: exchange === null || exchange === void 0 ? void 0 : exchange.internalId }, filters), pageIndex, true);
    return infinitePaginatedQuery;
}
export function useDepositInfo(coinId, networkId) {
    var exchange = useActiveExchange();
    return useDepositInfoQuery({
        coinId: coinId,
        networkId: networkId,
        exchangeId: exchange === null || exchange === void 0 ? void 0 : exchange.internalId,
    }, { skip: !coinId || !networkId || !(exchange === null || exchange === void 0 ? void 0 : exchange.internalId) });
}
//# sourceMappingURL=use.js.map