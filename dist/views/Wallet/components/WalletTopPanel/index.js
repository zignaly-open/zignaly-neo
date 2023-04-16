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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MinText, PanelItem, PercText, Separator, StyledSwitch, SubTitle, SwitchLabel, TooltipIcon, TopPanel, } from './styles';
import { ZigButton, ZignalyIcon, ZigPriceLabel, ZigTypography, } from '@zignaly-open/ui';
import { Box, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import { Add, ChevronRight, Remove } from '@mui/icons-material';
import { useUpdateUserMutation } from 'apis/user/api';
import { ReactComponent as RewardsIcon } from 'images/rewards.svg';
import { useCurrentUser } from 'apis/user/use';
import { useZModal } from 'components/ZModal/use';
import WalletDepositModal from '../../modals/WalletDepositModal';
import BuyZigModal from '../../modals/BuyZigModal';
import WalletWithdrawModal from '../../modals/WalletWithdrawModal';
import WalletPopover from './atoms/WalletPopover';
import { useDispatch } from 'react-redux';
import { setUser } from 'apis/user/store';
var WalletTopPanel = function (_a) {
    var _b, _c, _d, _e, _f;
    var balances = _a.balances, savings = _a.savings, coins = _a.coins;
    var t = useTranslation('wallet').t;
    var balance = (_c = (_b = balances === null || balances === void 0 ? void 0 : balances.ZIG) === null || _b === void 0 ? void 0 : _b.balance) !== null && _c !== void 0 ? _c : 0;
    var showModal = useZModal().showModal;
    var user = useCurrentUser();
    var updateUser = useUpdateUserMutation()[0];
    var rate = coins === null || coins === void 0 ? void 0 : coins.ZIG.usdPrice;
    var dispatch = useDispatch();
    var _g = useState(null), anchorEl = _g[0], setAnchorEl = _g[1];
    var handleChange = function (value, property) {
        var _a, _b;
        dispatch(setUser(__assign(__assign({}, user), (_a = {}, _a[property] = value, _a))));
        updateUser((_b = {}, _b[property] = value, _b)).catch(function () {
            var _a;
            dispatch(setUser(__assign(__assign({}, user), (_a = {}, _a[property] = !value, _a))));
        });
    };
    return (React.createElement(TopPanel, { container: true, direction: 'row' },
        React.createElement(PanelItem, { item: true },
            React.createElement(SubTitle, null, t('totalBalance')),
            React.createElement(Box, { display: 'flex', alignItems: 'center', gap: '12px' },
                React.createElement(ZignalyIcon, { width: 54, height: 54 }),
                React.createElement("div", null,
                    React.createElement(Box, { display: 'flex', alignItems: 'center' },
                        React.createElement(ZigPriceLabel, { value: balance, variant: 'h1', color: 'almostWhite', coin: 'ZIG', coinProps: {
                                color: '#9864EF',
                                fontWeight: 500,
                                variant: 'h3',
                                as: 'span',
                            } }),
                        coins &&
                            [
                                (_d = balances === null || balances === void 0 ? void 0 : balances.ZIG) === null || _d === void 0 ? void 0 : _d.locked,
                                (_e = balances === null || balances === void 0 ? void 0 : balances.ZIG) === null || _e === void 0 ? void 0 : _e.staked,
                                (_f = balances === null || balances === void 0 ? void 0 : balances.ZIG) === null || _f === void 0 ? void 0 : _f.unstaking,
                            ].some(function (v) { return v > 0; }) && (React.createElement(React.Fragment, null,
                            React.createElement(IconButton, { id: 'wallet__coin', onClick: function (e) { return setAnchorEl(e.currentTarget); } },
                                React.createElement(ChevronRight, null)),
                            React.createElement(WalletPopover, { anchorEl: anchorEl, balance: balances === null || balances === void 0 ? void 0 : balances.ZIG, coin: coins.ZIG, handleClose: function () { return setAnchorEl(null); }, showLocked: true })))),
                    React.createElement(Box, { display: 'flex', alignItems: 'center', gap: 1 },
                        React.createElement(ZigPriceLabel, { value: balance * rate, usd: true, color: 'almostWhite', fontWeight: 600, fontSize: 16 }),
                        React.createElement(ZigTypography, { variant: 'h5', color: 'neutral300' },
                            "@", rate === null || rate === void 0 ? void 0 :
                            rate.toFixed(8),
                            "/ZIG")))),
            React.createElement(Box, { display: 'flex', flexDirection: 'row', mt: '20px', gap: 1 },
                React.createElement(ZigButton, { id: 'wallet__buy-zig', variant: 'contained', onClick: function () {
                        showModal(BuyZigModal, {
                            ctaId: 'buy-zig',
                        });
                    } }, t('buy.buy')),
                React.createElement(ZigButton, { id: 'wallet__deposit-zig', variant: 'contained', startIcon: React.createElement(Add, null), onClick: function () {
                        showModal(WalletDepositModal, {
                            ctaId: 'deposit-zig',
                            coins: coins,
                            selectedCoin: 'ZIG',
                        });
                    } }, t('deposit.deposit-zig')),
                React.createElement(ZigButton, { id: 'wallet__withdraw-zig', startIcon: React.createElement(Remove, null), variant: 'outlined', onClick: function () {
                        showModal(WalletWithdrawModal, {
                            ctaId: 'withdraw-zig',
                            coins: coins,
                            selectedCoin: 'ZIG',
                        });
                    } }, t('withdraw')))),
        React.createElement(Separator, null),
        React.createElement(PanelItem, { item: true },
            React.createElement(SubTitle, null, t('savings')),
            React.createElement(Box, { display: 'flex', gap: '12px' },
                React.createElement(RewardsIcon, { width: 48, height: 48 }),
                React.createElement("div", null,
                    React.createElement(ZigPriceLabel, { value: savings, variant: 'h1', color: 'greenGraph', coin: 'ZIG', coinProps: {
                            color: 'almostWhite',
                            fontWeight: 500,
                            variant: 'h3',
                            as: 'span',
                        } }),
                    React.createElement(ZigTypography, { variant: 'h5', color: 'almostWhite' }, t(user.payFeeWithZig || user.tradingFeeDiscount
                        ? 'savingMoney'
                        : 'saveMoney')))),
            React.createElement(Box, { display: 'flex', flexDirection: 'column', mt: '12px', gap: '2px' },
                React.createElement(Box, { display: 'flex', alignItems: 'center' },
                    React.createElement(FormControlLabel, { control: React.createElement(StyledSwitch, { checked: user.payFeeWithZig, onChange: function (e) {
                                return handleChange(e.target.checked, 'payFeeWithZig');
                            } }), label: React.createElement(SwitchLabel, null, t('successFee')) }),
                    React.createElement(MinText, { component: 'span' },
                        t('min'),
                        "\u00A0",
                        React.createElement(PercText, null,
                            "6%",
                            React.createElement(Tooltip, { title: t('successFeeTooltip') },
                                React.createElement(TooltipIcon, null))))),
                React.createElement(Box, { display: 'flex', alignItems: 'center' },
                    React.createElement(FormControlLabel, { control: React.createElement(StyledSwitch, { checked: user.tradingFeeDiscount, onChange: function (e) {
                                return handleChange(e.target.checked, 'tradingFeeDiscount');
                            } }), label: React.createElement(SwitchLabel, null, t('tradingFee')) }),
                    React.createElement(MinText, { component: 'span' },
                        t('min'),
                        "\u00A0",
                        React.createElement(PercText, null,
                            "15%",
                            React.createElement(Tooltip, { title: t('tradingFeeTooltip') },
                                React.createElement(TooltipIcon, null)))))))));
};
export default WalletTopPanel;
//# sourceMappingURL=index.js.map