var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Box, Grid, Paper } from '@mui/material';
import { createColumnHelper, ZigPriceLabel, ZigSelect, ZigTable, ZigTypography, downloadTableCsv, ZigButton, } from '@zignaly-open/ui';
import { FilterWrapperContainer } from '../styles';
import React, { useMemo, useState } from 'react';
import { RewardType, StatusType } from '../constants';
import { useTranslation } from 'react-i18next';
import { OpenInNew } from '@mui/icons-material';
var ReferralTable = function (_a) {
    var referrals = _a.referrals;
    var t = useTranslation('referrals').t;
    var _b = useState(null), status = _b[0], setStatus = _b[1];
    var statusOptions = useMemo(function () { return __spreadArray([
        { label: t('filter-any'), value: null }
    ], Object.entries(StatusType)
        .map(function (_a) {
        var k = _a[0], v = _a[1];
        return ({
            label: t("statusTypes.".concat(k)),
            value: v,
        });
    })
        .filter(function (_a) {
        var value = _a.value;
        return referrals.some(function (r) { return r.status === value; });
    }), true); }, [t, referrals]);
    var _c = useState(null), rewardType = _c[0], setRewardType = _c[1];
    var rewardTypeOptions = useMemo(function () { return __spreadArray([
        { label: t('filter-any'), value: null }
    ], Object.values(RewardType)
        .map(function (v) { return ({
        label: t("rewardTypes.".concat(v)),
        value: v,
    }); })
        .filter(function (_a) {
        var value = _a.value;
        return referrals.some(function (r) { return r.type === value; });
    }), true); }, [t, referrals]);
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () { return [
        columnHelper.accessor('date', {
            header: t('table.time-and-date'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return React.createElement(ZigTypography, null, getValue());
            },
        }),
        columnHelper.accessor('amount', {
            header: t('common:amount'),
            cell: function (_a) {
                var _b;
                var original = _a.row.original;
                return (React.createElement(Box, { sx: { minWidth: '60px', flexDirection: 'column', display: 'flex' } },
                    React.createElement(ZigPriceLabel, { value: original.amount, coin: original.coin }),
                    !((_b = original.coin) === null || _b === void 0 ? void 0 : _b.includes('USD')) && (React.createElement(ZigPriceLabel, { prefix: '~', variant: 'caption', color: 'neutral300', value: original.usdtAmount, usd: true }))));
            },
        }),
        columnHelper.accessor('email', {
            header: t('table.user-trader'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return React.createElement(ZigTypography, null, getValue());
            },
        }),
        columnHelper.accessor('type', {
            header: t('table.reward-type'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTypography, null, getValue() in RewardType
                    ? t("rewardTypes.".concat(getValue()))
                    : getValue()));
            },
        }),
        columnHelper.accessor('status', {
            header: t('table.filter-status'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTypography, { color: (getValue() === StatusType.Pending && 'yellow') ||
                        (getValue() === StatusType.Completed && 'greenGraph') ||
                        ([StatusType.Failed, StatusType.Cancelled].includes(getValue()) &&
                            'red') ||
                        (getValue() === StatusType.TransferOrdered && 'neutral175') }, getValue() in StatusType
                    ? t("statusTypes.".concat(getValue()))
                    : getValue()));
            },
        }),
    ]; }, []);
    var filteredHistory = useMemo(function () {
        return referrals.filter(function (r) {
            return (!status || r.status === status) &&
                (!rewardType || r.type === rewardType);
        });
    }, [referrals, rewardType, status]);
    var exporter = function () {
        return downloadTableCsv(filteredHistory.map(function (r) { return [
            r.date,
            "".concat(r.amount, " ").concat(r.coin),
            r.email,
            r.type in RewardType ? t("rewardTypes.".concat(r.type)) : r.type,
            r.status in StatusType ? t("statusTypes.".concat(r.status)) : r.status,
        ]; }), [
            t('table.time-and-date'),
            t('common:amount'),
            t('table.user-trader'),
            t('table.reward-type'),
            t('table.filter-status'),
        ], 'commissions.csv');
    };
    return (React.createElement(Box, { sx: { mb: 6, mt: 3 } },
        React.createElement(Grid, { container: true, mb: 3 },
            React.createElement(Grid, { item: true, xs: 12, sm: 4, sx: {
                    display: 'flex',
                    alignItems: 'center',
                } },
                React.createElement(ZigTypography, { sx: {}, variant: 'h2' }, t('table.title'))),
            referrals.length > 0 && (React.createElement(FilterWrapperContainer, { item: true, xs: 12, sm: 8 },
                React.createElement(ZigSelect, { onChange: setRewardType, value: rewardType, small: true, label: t('table.filter-type'), options: rewardTypeOptions }),
                React.createElement(ZigSelect, { onChange: setStatus, value: status, small: true, label: t('table.filter-status'), options: statusOptions }),
                React.createElement(ZigButton, { onClick: exporter, sx: {
                        color: function (theme) { return theme.palette.links; },
                    } },
                    t('export'),
                    " ",
                    React.createElement(OpenInNew, { sx: { ml: 1, width: '15px' } }))))),
        referrals.length ? (React.createElement(ZigTable, { initialState: {
                sorting: [
                    {
                        id: 'date',
                        desc: true,
                    },
                ],
            }, columns: columns, data: filteredHistory, columnVisibility: false, enableSortingRemoval: false, emptyMessage: t('table.no-referrals') })) : (React.createElement(Paper, { sx: { p: 2 } },
            React.createElement(ZigTypography, null, t('table.no-commission-history'))))));
};
export default ReferralTable;
//# sourceMappingURL=ReferralTable.js.map