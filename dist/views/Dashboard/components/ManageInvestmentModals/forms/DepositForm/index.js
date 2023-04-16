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
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as BinanceLogo } from '../../../../../../images/binance.svg';
import { dark, InputText, ErrorMessage, ZignalyQRCode, ZigSelect, CloneIcon, Typography, Loader, ZigTypography, } from '@zignaly-open/ui';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../../../../util/hooks/useToast';
import { Box, Grid, Link } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useCoinBalances, useDepositInfo, useExchangeCoinsList, } from '../../../../../../apis/coin/use';
import { allowedDeposits } from '../../../../../../util/coins';
import { useActiveExchange, useCurrentUser, } from '../../../../../../apis/user/use';
import CoinOption, { filterOptions } from '../atoms/CoinOption';
import { trackCta } from '@zignaly-open/tracker';
import { BUY_CRYPTO_URL, DEPOSIT_INFO_URL, } from '../../../../../../util/constants';
import { ExternalLink } from '../../../../../../components/AnchorLink';
function DepositForm(_a) {
    var _b, _c, _d, _e;
    var allowedCoins = _a.allowedCoins, selectedCoin = _a.selectedCoin;
    var t = useTranslation('deposit-crypto').t;
    var balances = useCoinBalances({ convert: true }).data;
    var coins = useExchangeCoinsList().data;
    var exchangeType = useActiveExchange().exchangeType;
    var userId = useCurrentUser().userId;
    var toast = useToast();
    var _f = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {},
    }), handleSubmit = _f.handleSubmit, control = _f.control, watch = _f.watch, setValue = _f.setValue;
    var coin = watch('coin');
    var network = watch('network');
    var coinOptions = useMemo(function () {
        var _a;
        return (_a = allowedDeposits[exchangeType]) === null || _a === void 0 ? void 0 : _a.map(function (ssc) {
            var _a, _b;
            var balance = balances[ssc];
            var name = ((_a = coins[ssc]) === null || _a === void 0 ? void 0 : _a.name) || '';
            return {
                value: ssc,
                name: name,
                label: React.createElement(CoinOption, { key: ssc, coin: ssc, name: name }),
                inOrders: (balance === null || balance === void 0 ? void 0 : balance.balanceLocked) || 0,
                balance: (balance === null || balance === void 0 ? void 0 : balance.balanceTotal) || 0,
                available: (balance === null || balance === void 0 ? void 0 : balance.balanceFree) || 0,
                networks: (_b = coins[ssc].networks) === null || _b === void 0 ? void 0 : _b.map(function (n) { return (__assign({ label: n.name, value: n.network }, n)); }),
            };
        });
    }, [coins, allowedCoins, exchangeType]);
    var _g = useDepositInfo(coin, network), loading = _g.isFetching, depositInfo = _g.data;
    var coinObject = coin && (coinOptions === null || coinOptions === void 0 ? void 0 : coinOptions.find(function (x) { return x.value === coin; }));
    var networkObject = network && ((_b = coinObject === null || coinObject === void 0 ? void 0 : coinObject.networks) === null || _b === void 0 ? void 0 : _b.find(function (x) { return x.value === network; }));
    useEffect(function () {
        if (coin) {
            setValue('network', coinObject.networks.length === 1 ? coinObject.networks[0].value : null);
        }
        else if ((coinOptions === null || coinOptions === void 0 ? void 0 : coinOptions.length) === 1) {
            setValue('coin', coinOptions[0].value);
        }
    }, [coin]);
    useEffect(function () {
        if (!coin && coinOptions && selectedCoin) {
            var match = coinOptions.find(function (x) { return x.value === selectedCoin; });
            match && setValue('coin', match === null || match === void 0 ? void 0 : match.value);
        }
    }, []);
    return (React.createElement("form", { onSubmit: handleSubmit(function () { }) },
        React.createElement(Box, { mt: 1, mb: 1 },
            React.createElement(ZigTypography, null,
                React.createElement(Trans, { t: t, i18nKey: 'description' },
                    React.createElement(BinanceLogo, { width: 16, height: 16, style: {
                            verticalAlign: 'middle',
                        } }),
                    React.createElement(ExternalLink, { href: DEPOSIT_INFO_URL, target: '_blank', rel: 'nofollow noreferrer' })))),
        React.createElement(Grid, { container: true },
            React.createElement(Grid, { item: true, xs: 12, md: 6, pt: 3 },
                React.createElement(Controller, { name: 'coin', control: control, rules: { required: true }, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(ZigSelect, __assign({ id: 'deposit__select-coin', menuPlacement: 'auto', menuShouldScrollIntoView: false, menuPosition: 'fixed', menuShouldBlockScroll: true, label: t('coinSelector.label'), placeholder: t('coinSelector.placeholder'), options: coinOptions, filterOption: filterOptions }, field)));
                    } })),
            !!coin && (React.createElement(Grid, { item: true, xs: 12, md: 6, sx: {
                    pt: 6,
                    pl: 6,
                    display: 'flex',
                    flexDirection: 'column',
                } },
                React.createElement(Typography, { variant: 'body2', color: 'neutral200', weight: 'medium' },
                    t('balances.total'),
                    ' ',
                    React.createElement(Typography, { variant: 'body2', color: 'neutral000', weight: 'medium' },
                        React.createElement(NumericFormat, { displayType: 'text', value: (_c = coinObject === null || coinObject === void 0 ? void 0 : coinObject.balance) !== null && _c !== void 0 ? _c : '' })),
                    ' ', coin !== null && coin !== void 0 ? coin : ''),
                React.createElement(Typography, { variant: 'body2', color: 'neutral200', weight: 'medium' },
                    t('balances.balanceLocked'),
                    ' ',
                    React.createElement(Typography, { variant: 'body2', color: 'neutral000', weight: 'medium' },
                        React.createElement(NumericFormat, { value: (_d = coinObject === null || coinObject === void 0 ? void 0 : coinObject.inOrders) !== null && _d !== void 0 ? _d : '', displayType: 'text' })),
                    ' ', coin !== null && coin !== void 0 ? coin : ''),
                React.createElement(Typography, { variant: 'body2', color: 'neutral200', weight: 'medium' },
                    t('balances.balanceFree'),
                    ' ',
                    React.createElement(Typography, { variant: 'body2', color: 'neutral000', weight: 'medium' },
                        React.createElement(NumericFormat, { value: (_e = coinObject === null || coinObject === void 0 ? void 0 : coinObject.available) !== null && _e !== void 0 ? _e : '', displayType: 'text' })),
                    ' ', coin !== null && coin !== void 0 ? coin : ''))),
            React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                React.createElement(Controller, { name: 'network', control: control, rules: { required: true }, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(ZigSelect, __assign({ id: 'deposit__select-network', menuPosition: 'fixed', menuShouldBlockScroll: true, menuShouldScrollIntoView: false, label: t('networkSelector.label'), placeholder: t('networkSelector.placeholder') }, field, { options: coinObject === null || coinObject === void 0 ? void 0 : coinObject.networks })));
                    } })),
            !!network && (networkObject === null || networkObject === void 0 ? void 0 : networkObject.depositEnable) && (React.createElement(React.Fragment, null,
                React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                    React.createElement(InputText, { id: 'deposit__deposit-address', placeholder: t('depositAddress.placeholder'), label: t('depositAddress.label'), readOnly: true, value: loading ? t('depositAddress.loading') : depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.address, rightSideElement: React.createElement(CloneIcon, { width: 40, height: 40, color: dark.neutral300, id: 'deposit-address__copy' }), onClickRightSideElement: function () {
                            trackCta({
                                userId: userId,
                                ctaId: 'copy-deposit-address',
                            });
                            copy(depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.address);
                            toast.success(t('depositAddress.copied'));
                        } })),
                (networkObject === null || networkObject === void 0 ? void 0 : networkObject.label) && (React.createElement(Box, null,
                    React.createElement(ErrorMessage, { text: t('depositAddress.warning', {
                            network: networkObject === null || networkObject === void 0 ? void 0 : networkObject.label,
                            coin: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name,
                        }) }))),
                !!(depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.tag) && (React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                    React.createElement(InputText, { id: 'deposit__deposit-memo', label: t('depositMemo.label'), placeholder: t('depositAddress.placeholder'), readOnly: true, value: loading ? t('depositMemo.loading') : depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.tag, rightSideElement: React.createElement(CloneIcon, { width: 40, height: 40, color: dark.neutral300 }), onClickRightSideElement: function () {
                            trackCta({
                                userId: userId,
                                ctaId: 'copy-deposit-memo',
                            });
                            copy(depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.tag);
                            toast.success(t('depositMemo.copied'));
                        } }))),
                React.createElement(Grid, { item: true, xs: 12, mt: 3, sx: {
                        minHeight: '200px',
                        alignItems: 'center',
                        textAlign: 'center',
                    } }, loading ? (React.createElement(Box, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px',
                    } },
                    React.createElement(Loader, { color: '#fff', width: '40px', height: '40px', ariaLabel: t('loading') }))) : (React.createElement(Box, { sx: {
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexDirection: ['column', 'row'],
                        gap: 2,
                    } },
                    React.createElement(ZignalyQRCode, { label: t('depositQR.address', {
                            coin: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name,
                        }), url: depositInfo.address }),
                    (depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.tag) && (React.createElement(ZignalyQRCode, { label: t('depositQR.memo', {
                            coin: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name,
                        }), url: depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.tag }))))))),
            !!network && !(networkObject === null || networkObject === void 0 ? void 0 : networkObject.depositEnable) && (React.createElement(ErrorMessage, { text: t('no-network') })),
            React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                React.createElement(Typography, { variant: 'body2', color: 'neutral300' },
                    React.createElement(Link, { underline: 'hover', href: BUY_CRYPTO_URL, target: '_blank' },
                        React.createElement(Box, { sx: {
                                display: 'flex',
                                gap: 0.5,
                                alignItems: 'center',
                            } },
                            t('buy-crypto'),
                            React.createElement(NorthEastIcon, { fontSize: 'inherit' }))))))));
}
export default DepositForm;
//# sourceMappingURL=index.js.map