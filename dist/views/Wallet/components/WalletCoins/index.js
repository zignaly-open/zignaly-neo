import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, IconButton, ZigCoinIcon, ZigPriceLabel, ZigTable, ZigTypography, } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useZModal } from 'components/ZModal/use';
import { Remove } from '@mui/icons-material';
import WalletWithdrawModal from 'views/Wallet/modals/WalletWithdrawModal';
import { StyledTable } from './styles';
var WalletCoins = function (_a) {
    var coins = _a.coins, balances = _a.balances;
    var t = useTranslation('wallet').t;
    var showModal = useZModal().showModal;
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () { return [
        columnHelper.accessor('coin', {
            header: t('transactions.header.coin'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTypography, { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 },
                    React.createElement(ZigCoinIcon, { coin: getValue(), size: 'small', bucket: 'coins' }),
                    getValue()));
            },
        }),
        columnHelper.accessor('balance.balance', {
            header: t('transactions.header.amount'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTypography, { color: 'almostWhite' },
                    React.createElement(NumericFormat, { value: getValue(), displayType: 'text', thousandSeparator: true })));
            },
        }),
        columnHelper.accessor(function (row) { return row.balance.balance * coins[row.coin].usdPrice; }, {
            id: 'value',
            header: t('coins.header.value'),
            cell: function (_a) {
                var getValue = _a.getValue, original = _a.row.original;
                return (React.createElement(Box, { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 },
                    React.createElement(ZigPriceLabel, { value: getValue(), usd: true, color: 'almostWhite' }),
                    React.createElement(ZigTypography, { variant: 'h5', color: 'neutral300' },
                        "@",
                        React.createElement(NumericFormat, { value: coins[original.coin].usdPrice, displayType: 'text', decimalScale: 10 }),
                        "/",
                        original.coin)));
            },
        }),
        columnHelper.display({
            id: 'action',
            cell: function (_a) {
                var original = _a.row.original;
                return (React.createElement(Box, { display: 'flex', justifyContent: 'flex-end' },
                    React.createElement(IconButton, { id: 'wallet-table__withdraw', icon: React.createElement(Remove, { color: 'neutral300' }), onClick: function () {
                            return showModal(WalletWithdrawModal, {
                                selectedCoin: original.coin,
                                ctaId: 'wallet-table-row',
                                coins: coins,
                            });
                        }, variant: 'secondary' })));
            },
        }),
    ]; }, []);
    var data = Object.entries(balances)
        .map(function (_a) {
        var coin = _a[0], balance = _a[1];
        return ({
            coin: coin,
            balance: balance,
        });
    })
        .filter(function (_a) {
        var coin = _a.coin, balance = _a.balance;
        return coin !== 'ZIG' && balance.balance > 0;
    });
    if (!data.length) {
        return null;
    }
    return (React.createElement(Box, { mb: '70px' },
        React.createElement(StyledTable, null,
            React.createElement(ZigTable, { prefixId: 'wallet-coins', columns: columns, data: data, initialState: {
                    sorting: [
                        {
                            id: 'value',
                            desc: true,
                        },
                    ],
                } }))));
};
export default WalletCoins;
//# sourceMappingURL=index.js.map