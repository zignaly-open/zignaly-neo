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
import { FILTERS_TYPE_NAME, transactionStateColor, transactionStateName, } from './types';
import { createColumnHelper, DateLabel, ListGradientIcon, TextButton, ZigCoinIcon, ZigTable, ZigTablePriceLabel, ZigTypography, } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { FILTERS_TYPE } from 'apis/wallet/types';
import { useTransactionsHistory } from 'apis/wallet/use';
import ChainIcon from 'components/ChainIcon';
import { ExpandLess, ExpandMore, OpenInNew } from '@mui/icons-material';
import TransactionDetails from '../TransactionDetails';
import { StyledZigSelect } from './styles';
import { useDownloadTransactionsHistoryMutation } from 'apis/wallet/api';
var WalletTransactions = function () {
    var t = useTranslation('wallet').t;
    var _a = useState('all'), type = _a[0], setType = _a[1];
    var _b = useState([]), filteredData = _b[0], setFilteredData = _b[1];
    var _c = useState({
        pageIndex: 0,
        pageSize: 20,
    }), pagination = _c[0], setPagination = _c[1];
    var pageIndex = pagination.pageIndex, pageSize = pagination.pageSize;
    var transactionsEndpoint = useTransactionsHistory({
        limit: pageSize,
        type: type,
    }, pageIndex);
    useEffect(function () {
        if (transactionsEndpoint.data) {
            var data = transactionsEndpoint.data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
            setFilteredData(data);
        }
    }, [transactionsEndpoint.data, pageIndex]);
    useLayoutEffect(function () {
        if (transactionsEndpoint.page === 1) {
            setPagination(function (p) { return (__assign(__assign({}, p), { pageIndex: 0 })); });
        }
    }, [transactionsEndpoint.page]);
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () { return [
        columnHelper.accessor('createdAt', {
            header: t('transactions.header.date'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return React.createElement(DateLabel, { date: new Date(getValue()) });
            },
            enableSorting: false,
        }),
        columnHelper.accessor('type', {
            header: t('transactions.header.type'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTypography, { color: 'almostWhite' }, t("transactions.type.".concat(getValue().replace(/_/g, '').toLowerCase()))));
            },
            enableSorting: false,
        }),
        columnHelper.accessor('amount', {
            header: t('transactions.header.amount'),
            enableSorting: false,
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(ZigTypography, { color: 'almostWhite' },
                    React.createElement(ZigTablePriceLabel, { alwaysShowSign: true, value: original.type === 'withdraw' ? -getValue() : getValue() })));
            },
        }),
        columnHelper.accessor('currency', {
            header: t('transactions.header.coin'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(React.Fragment, null,
                    React.createElement(ZigTypography, { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 },
                        React.createElement(ZigCoinIcon, { coin: getValue(), size: 'small', bucket: 'coins' }),
                        getValue())));
            },
            enableSorting: false,
        }),
        columnHelper.accessor('network', {
            header: t('transactions.header.network'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return getValue() ? (React.createElement(ZigTypography, { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'almostWhite' },
                    React.createElement(ChainIcon, { network: getValue() }),
                    original.networkName)) : (React.createElement(ZigTypography, { color: 'almostWhite' }, t('transactions.internal')));
            },
            enableSorting: false,
        }),
        columnHelper.accessor('status', {
            header: t('transactions.header.status'),
            cell: function (_a) {
                var getValue = _a.getValue, row = _a.row;
                return (React.createElement(Box, { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 },
                    React.createElement(Box, { display: 'flex', justifyContent: 'center', flex: 1 },
                        React.createElement(ZigTypography, { color: transactionStateColor[getValue()] }, t(transactionStateName[getValue()]))),
                    row.getIsExpanded() ? React.createElement(ExpandLess, null) : React.createElement(ExpandMore, null)));
            },
            enableSorting: false,
        }),
    ]; }, []);
    var _d = useDownloadTransactionsHistoryMutation(), downloadCsv = _d[0], downloadCsvStatus = _d[1];
    var filterOptions = useMemo(function () {
        return Object.entries(FILTERS_TYPE).map(function (_a) {
            var k = _a[0], v = _a[1];
            return ({
                value: v,
                label: t("transactions.type.".concat(FILTERS_TYPE_NAME[k])),
            });
        });
    }, [t]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { display: 'flex', mb: 2, justifyContent: 'space-between' },
            React.createElement(Box, { display: 'flex', gap: 1, alignItems: 'center' },
                React.createElement(ListGradientIcon, { width: 40, height: 40 }),
                React.createElement(ZigTypography, { textTransform: 'uppercase', variant: 'h3' }, t('transactions.walletTransactions'))),
            React.createElement(Box, { display: 'flex', gap: 2 },
                React.createElement(TextButton, { id: 'wallet__export-transactions', rightElement: React.createElement(OpenInNew, { sx: { color: 'links', width: '15px' } }), caption: t('action:export'), onClick: function () { return downloadCsv(); }, loading: downloadCsvStatus.isLoading }),
                React.createElement(StyledZigSelect, { options: filterOptions, value: type, onChange: setType }))),
        React.createElement(ZigTable, { prefixId: 'wallet-transactions', columns: columns, data: filteredData, renderSubComponent: function (_a) {
                var row = _a.row;
                return (React.createElement(TransactionDetails, { transaction: row.original }));
            }, manualPagination: true, pagination: pagination, pageCount: transactionsEndpoint.hasMore ? -1 : transactionsEndpoint.page, onPaginationChange: setPagination, loading: transactionsEndpoint.isFetching, emptyMessage: t('transactions.noData') })));
};
export default WalletTransactions;
//# sourceMappingURL=index.js.map