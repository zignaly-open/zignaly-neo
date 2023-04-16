import { Box, Divider } from '@mui/material';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledPopover } from './styles';
var BalanceRow = function (_a) {
    var label = _a.label, amount = _a.amount, coin = _a.coin;
    return (React.createElement(Box, { display: 'flex', justifyContent: 'space-between', width: 1, gap: 1 },
        React.createElement(ZigTypography, null, label),
        React.createElement(ZigPriceLabel, { value: amount, coin: coin.name })));
};
var WalletPopover = function (_a) {
    var anchorEl = _a.anchorEl, handleClose = _a.handleClose, balance = _a.balance, coin = _a.coin, showLocked = _a.showLocked;
    var t = useTranslation('wallet').t;
    return (React.createElement(StyledPopover, { anchorEl: anchorEl, onClose: handleClose, open: Boolean(anchorEl) },
        showLocked && (React.createElement(React.Fragment, null,
            React.createElement(BalanceRow, { label: t('balance.available'), amount: balance.availableBalance, coin: coin }),
            React.createElement(BalanceRow, { label: t('balance.locked'), amount: balance.locked, coin: coin }),
            React.createElement(Divider, { style: {
                    background: '#413ba0',
                    width: '100%',
                    margin: '15px 10px',
                    alignSelf: 'center',
                } }))),
        React.createElement(BalanceRow, { label: t('balance.staked'), amount: balance.staked, coin: coin }),
        React.createElement(BalanceRow, { label: t('balance.unstaking'), amount: balance.unstaking, coin: coin })));
};
export default WalletPopover;
//# sourceMappingURL=index.js.map