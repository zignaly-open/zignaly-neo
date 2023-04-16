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
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, ZigTable, ZigTablePriceLabel, createColumnHelper, ZigTypography, ZigButton, } from '@zignaly-open/ui';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { allowedDeposits } from 'util/coins';
import { Remove } from '@mui/icons-material';
import { useCoinBalances, useExchangeCoinsList } from 'apis/coin/use';
import { mergeCoinsAndBalances } from '../../../../apis/coin/util';
import WithdrawModal from '../../../Dashboard/components/ManageInvestmentModals/WithdrawModal';
import { useZModal, useZRouteModal } from '../../../../components/ZModal/use';
import { Box, Tooltip } from '@mui/material';
import CoinLabel from 'components/CoinLabel';
import { ROUTE_MY_BALANCES_DEPOSIT_COIN } from '../../../../routes';
var MyBalancesTable = function () {
    var t = useTranslation('my-balances').t;
    var balancesEndpoint = useCoinBalances({ convert: true, refetch: true });
    var coinsEndpoint = useExchangeCoinsList();
    var exchangeType = useActiveExchange().exchangeType;
    var showModal = useZModal().showModal;
    var showDepositModal = useZRouteModal(ROUTE_MY_BALANCES_DEPOSIT_COIN);
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () { return [
        columnHelper.accessor('coin', {
            header: t('tableHeader.coin'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(CoinLabel, { coin: getValue(), name: original.balance.name }));
            },
        }),
        columnHelper.accessor(function (row) { return row.balance.balanceTotal; }, {
            id: 'totalBalance',
            header: t('tableHeader.totalBalance'),
            cell: function (_a) {
                var getValue = _a.getValue, row = _a.row;
                return (React.createElement(ZigTablePriceLabel, { coin: row.original.coin, value: getValue() }));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor(function (row) { return row.balance.balanceFree; }, {
            id: 'balanceFree',
            header: t('tableHeader.availableBalance'),
            cell: function (_a) {
                var getValue = _a.getValue, row = _a.row;
                return (React.createElement(ZigTablePriceLabel, { coin: row.original.coin, value: getValue() }));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor(function (row) { return row.balance.balanceLocked; }, {
            id: 'balanceLocked',
            header: t('tableHeader.lockedBalance'),
            cell: function (_a) {
                var getValue = _a.getValue, row = _a.row;
                return (React.createElement(ZigTablePriceLabel, { coin: row.original.coin, value: getValue() }));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor(function (row) { return row.balance.balanceTotalBTC; }, {
            id: 'balanceTotalBTC',
            header: t('tableHeader.valueBTC'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTablePriceLabel, { coin: 'BTC', value: getValue() }));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor(function (row) { return row.balance.balanceTotalUSDT; }, {
            id: 'balanceTotalUSDT',
            header: t('tableHeader.valueUSD'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTablePriceLabel, { usd: true, color: 'neutral100', value: getValue() }));
            },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.display({
            id: 'action',
            cell: function (_a) {
                var _b;
                var row = _a.row;
                return (React.createElement(Box, { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' },
                    !!((_b = allowedDeposits[exchangeType]) === null || _b === void 0 ? void 0 : _b.includes(row.original.coin)) && (React.createElement(ZigButton, { id: 'balance-row__deposit', onClick: function () {
                            return showDepositModal({
                                selectedCoin: row.original.coin,
                            });
                        }, variant: 'outlined', sx: { maxHeight: '20px' } },
                        React.createElement(ZigTypography, null, t('deposit')))),
                    React.createElement(Tooltip, { title: t('withdraw') },
                        React.createElement(Box, null,
                            React.createElement(IconButton, { id: 'balance-row__withdrawal', icon: React.createElement(Remove, { color: 'neutral300' }), onClick: function () {
                                    return showModal(WithdrawModal, {
                                        selectedCoin: row.original.coin,
                                        ctaId: 'balances-table-row',
                                    });
                                }, variant: 'secondary' })))));
            },
        }),
    ]; }, [t]);
    var getFilteredData = useCallback(function (coins, balances) {
        var depositCoinsBalances = Object.fromEntries(allowedDeposits[exchangeType].map(function (coin) { return [
            coin,
            {
                balanceFree: '',
                balanceFreeBTC: '',
                balanceFreeUSDT: '',
                balanceLocked: '',
                balanceLockedBTC: '',
                balanceLockedUSDT: '',
                balanceTotal: '',
                balanceTotalBTC: '',
                balanceTotalExchCoin: '',
                balanceTotalUSDT: '',
                exchCoin: '',
                maxWithdrawAmount: '',
            },
        ]; }));
        return Object.entries(mergeCoinsAndBalances(coins, __assign(__assign({}, depositCoinsBalances), balances)))
            .filter(function (_a) {
            var _b;
            var coin = _a[0], balance = _a[1];
            return ((_b = allowedDeposits[exchangeType]) === null || _b === void 0 ? void 0 : _b.includes(coin)) ||
                +balance.balanceTotal > 0;
        })
            .map(function (_a) {
            var coin = _a[0], balance = _a[1];
            return ({ coin: coin, balance: balance });
        });
    }, [exchangeType, t]);
    return (React.createElement(LayoutContentWrapper, { unmountOnRefetch: true, endpoint: [coinsEndpoint, balancesEndpoint], content: function (_a) {
            var coins = _a[0], balances = _a[1];
            return (React.createElement(ZigTable, { prefixId: 'balance', columns: columns, data: getFilteredData(coins, balances), initialState: {
                    sorting: [
                        {
                            id: 'balanceTotalUSDT',
                            desc: true,
                        },
                    ],
                } }));
        } }));
};
export default MyBalancesTable;
//# sourceMappingURL=index.js.map