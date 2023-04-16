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
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoinLabel, createColumnHelper, DateLabel, ZigTable, ZigTablePriceLabel, ZigTypography, } from '@zignaly-open/ui';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { useExchangeCoinsList, useTransactionsHistory } from 'apis/coin/use';
import TransactionStateLabel from './atoms/TransactionStateLabel';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { TRANSACTION_TYPE_NAME } from './types';
import TransactionDetails from './atoms/TransactionDetails';
import { Box } from '@mui/material';
import { getTransactionSideType, truncateAddress } from './util';
import { TRANSACTION_TYPE } from 'apis/coin/types';
import { useActiveExchange } from '../../../../apis/user/use';
var TransactionsHistoryTable = function (_a) {
    var type = _a.type;
    var _b = useState([]), filteredData = _b[0], setFilteredData = _b[1];
    var _c = useState({
        pageIndex: 0,
        pageSize: 30,
    }), pagination = _c[0], setPagination = _c[1];
    var pageIndex = pagination.pageIndex, pageSize = pagination.pageSize;
    var t = useTranslation('transactions-history').t;
    var transactionsEndpoint = useTransactionsHistory({
        limit: pageSize,
        type: type,
    }, pageIndex);
    var coinsEndpoint = useExchangeCoinsList();
    var exchange = useActiveExchange();
    var defineSign = function (typeTransaction, fromId) {
        if ([
            TRANSACTION_TYPE.PS_DEPOSIT,
            TRANSACTION_TYPE.WITHDRAW,
            TRANSACTION_TYPE.BUYZIG,
        ].includes(typeTransaction) ||
            fromId === (exchange === null || exchange === void 0 ? void 0 : exchange.internalId))
            return -1;
        else
            return 1;
    };
    var updateData = function () {
        var data = transactionsEndpoint.data
            .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
            .sort(function (a, b) { return +new Date(b.datetime) - +new Date(a.datetime); })
            .map(function (transaction) {
            var _a;
            return (__assign(__assign({}, transaction), { assetName: (_a = coinsEndpoint.data[transaction.asset]) === null || _a === void 0 ? void 0 : _a.name }));
        });
        setFilteredData(data);
    };
    useEffect(function () {
        if (transactionsEndpoint.data && coinsEndpoint.data) {
            updateData();
        }
    }, [transactionsEndpoint.data, coinsEndpoint.data, pageIndex]);
    useLayoutEffect(function () {
        if (transactionsEndpoint.page === 1) {
            setPagination(function (p) { return (__assign(__assign({}, p), { pageIndex: 0 })); });
        }
    }, [transactionsEndpoint.page]);
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () { return [
        columnHelper.accessor('datetime', {
            header: t('tableHeader.date'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return React.createElement(DateLabel, { date: new Date(getValue()) });
            },
            enableSorting: false,
        }),
        columnHelper.accessor('asset', {
            header: t('tableHeader.coin'),
            cell: function (_a) {
                var _b;
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(CoinLabel, { coin: getValue(), name: (_b = original.assetName) !== null && _b !== void 0 ? _b : '-' }));
            },
            enableSorting: false,
        }),
        columnHelper.accessor('txType', {
            header: t('tableHeader.type'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTypography, { whiteSpace: 'normal', color: 'neutral100', fontWeight: 500 }, t(TRANSACTION_TYPE_NAME[getValue()])));
            },
            enableSorting: false,
        }),
        columnHelper.accessor('amount', {
            header: t('tableHeader.amount'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(ZigTablePriceLabel, { exact: true, coin: original.asset, alwaysShowSign: true, value: defineSign(original.txType, original.from) * getValue() }));
            },
            enableSorting: false,
        }),
        columnHelper.accessor('fromName', {
            header: t('tableHeader.from'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(ZigTypography, { whiteSpace: 'normal', color: 'neutral100', fontWeight: 500 }, getValue() ||
                    (original.txType === TRANSACTION_TYPE.PS_WITHDRAW
                        ? t('psService')
                        : getTransactionSideType(original.txType, 'from') === 'zignaly'
                            ? t('deleted')
                            : t('external'))));
            },
            enableSorting: false,
        }),
        columnHelper.accessor('toName', {
            header: t('tableHeader.to'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(ZigTypography, { whiteSpace: 'normal', color: 'neutral100', fontWeight: 500 }, getValue() ||
                    (original.to
                        ? truncateAddress(original.to)
                        : getTransactionSideType(original.txType, 'to') === 'zignaly'
                            ? t('deleted')
                            : '-')));
            },
            enableSorting: false,
        }),
        columnHelper.accessor('status', {
            header: t('tableHeader.status'),
            cell: function (_a) {
                var getValue = _a.getValue, row = _a.row;
                return (React.createElement(Box, { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 },
                    React.createElement(Box, { display: 'flex', justifyContent: 'center', flex: 1 },
                        React.createElement(TransactionStateLabel, { state: getValue() })),
                    row.getIsExpanded() ? React.createElement(ExpandLess, null) : React.createElement(ExpandMore, null)));
            },
            enableSorting: false,
        }),
    ]; }, []);
    return (React.createElement(LayoutContentWrapper, { endpoint: [transactionsEndpoint, coinsEndpoint], content: function () { return (React.createElement(ZigTable, { prefixId: 'transactions', columns: columns, data: filteredData, initialState: {
                sorting: [
                    {
                        id: 'datetime',
                        desc: true,
                    },
                ],
            }, renderSubComponent: function (_a) {
                var row = _a.row;
                return (React.createElement(TransactionDetails, { transaction: row.original }));
            }, manualPagination: true, pagination: pagination, pageCount: transactionsEndpoint.hasMore ? -1 : transactionsEndpoint.page, onPaginationChange: setPagination, loading: transactionsEndpoint.isFetching, emptyMessage: t('noData') })); } }));
};
export default TransactionsHistoryTable;
//# sourceMappingURL=index.js.map