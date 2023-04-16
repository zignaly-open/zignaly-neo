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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { isArray } from 'lodash-es';
import { useState, useEffect, useRef } from 'react';
import { useDeepCompareEffect, useUpdateEffect } from 'react-use';
var useInfinitePaginatedQuery = function (useGetDataListQuery, params, pageIndex, hasMetadata) {
    var localParams = useRef(params);
    var _a = localParams.current.limit, limit = _a === void 0 ? 10 : _a;
    var _b = useState({ page: 1, id: '' }), localPage = _b[0], setLocalPage = _b[1];
    var _c = useState([]), combinedData = _c[0], setCombinedData = _c[1];
    var queryResponse = useGetDataListQuery(__assign(__assign(__assign({}, localParams.current), { limit: limit }), (hasMetadata
        ? { from: localPage.id }
        : { offset: (localPage.page - 1) * limit })));
    var data = queryResponse.data
        ? isArray(queryResponse.data)
            ? queryResponse.data
            : queryResponse.data.items
        : [];
    useDeepCompareEffect(function () {
        if (localPage.page === 1)
            setCombinedData(data);
        else
            setCombinedData(function (previousData) { return __spreadArray(__spreadArray([], previousData, true), data, true); });
    }, [data]);
    var refresh = function () {
        setLocalPage({ page: 1, id: '' });
    };
    useUpdateEffect(function () {
        localParams.current = params;
        refresh();
    }, Object.values(params));
    useEffect(function () {
        if (!queryResponse.isFetching && data.length < pageIndex * limit + 1) {
            fetchMore();
        }
    }, [pageIndex]);
    var fetchMore = function () {
        if ((data === null || data === void 0 ? void 0 : data.length) !== limit) {
            return;
        }
        setLocalPage(function (_a) {
            var _b;
            var page = _a.page;
            return {
                page: page + 1,
                id: (_b = queryResponse.data.metadata) === null || _b === void 0 ? void 0 : _b.from,
            };
        });
    };
    return __assign(__assign({}, queryResponse), { data: combinedData, page: localPage.page, hasMore: (data === null || data === void 0 ? void 0 : data.length) === limit, fetchMore: fetchMore, refresh: refresh });
};
export default useInfinitePaginatedQuery;
//# sourceMappingURL=useInfinitePaginatedQuery.js.map