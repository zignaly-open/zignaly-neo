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
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { dark, InputText, ErrorMessage, ZignalyQRCode, ZigSelect, CloneIcon, ZigTypography, ZigCoinIcon, } from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { Box, Grid } from '@mui/material';
import CenteredLoader from 'components/CenteredLoader';
import { useToast } from 'util/hooks/useToast';
import { useDepositInfoQuery } from 'apis/wallet/api';
import ChainOption, { filterOptions } from './atoms/ChainOption';
function WalletDepositForm(_a) {
    var _b, _c, _d;
    var coins = _a.coins, selectedCoin = _a.selectedCoin;
    var t = useTranslation(['deposit-crypto', 'wallet']).t;
    var toast = useToast();
    var _e = useForm({
        defaultValues: {},
    }), control = _e.control, watch = _e.watch;
    var network = watch('network');
    var networkOptions = (_c = (_b = coins[selectedCoin]) === null || _b === void 0 ? void 0 : _b.networks) === null || _c === void 0 ? void 0 : _c.map(function (n) { return ({
        label: React.createElement(ChainOption, { network: n.network, name: n.name }),
        value: n.network,
        name: n.name,
    }); });
    var _f = useDepositInfoQuery({
        coin: selectedCoin,
        network: network,
    }, { skip: !network }), loading = _f.isFetching, depositInfo = _f.data;
    var coinObject = coins[selectedCoin];
    var networkObject = network && ((_d = coinObject === null || coinObject === void 0 ? void 0 : coinObject.networks) === null || _d === void 0 ? void 0 : _d.find(function (x) { return x.network === network; }));
    return (React.createElement("form", null,
        React.createElement(Box, { mt: 1, mb: 1 },
            React.createElement(ZigTypography, null, t('deposit.description', {
                coin: selectedCoin,
                ns: 'wallet',
            }))),
        React.createElement(Grid, { container: true },
            React.createElement(Box, { display: 'flex', gap: '11px', pt: 3 },
                React.createElement(ZigCoinIcon, { size: 'small', coin: selectedCoin, name: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name, bucket: 'coins' }),
                React.createElement(ZigTypography, { fontWeight: 600 }, selectedCoin),
                "\u00A0"),
            React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                React.createElement(Controller, { name: 'network', control: control, rules: { required: true }, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(ZigSelect, __assign({ id: 'deposit__select-network', menuPosition: 'fixed', menuShouldBlockScroll: true, menuShouldScrollIntoView: false, label: t('networkSelector.label'), placeholder: t('networkSelector.placeholder') }, field, { options: networkOptions, filterOption: filterOptions })));
                    } })),
            !!network && (networkObject === null || networkObject === void 0 ? void 0 : networkObject.depositEnable) && (React.createElement(React.Fragment, null,
                React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                    React.createElement(InputText, { placeholder: t('depositAddress.placeholder'), label: t('depositAddress.label'), readOnly: true, value: loading ? t('depositAddress.loading') : depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.address, rightSideElement: React.createElement(CloneIcon, { width: 40, height: 40, color: dark.neutral300 }), onClickRightSideElement: function () {
                            copy(depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.address);
                            toast.success(t('depositAddress.copied'));
                        } })),
                React.createElement(ErrorMessage, { text: t('depositAddress.warning', {
                        network: networkObject === null || networkObject === void 0 ? void 0 : networkObject.name,
                        coin: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name,
                    }) }),
                !!(depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.memo) && (React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                    React.createElement(InputText, { label: t('depositMemo.label'), placeholder: t('depositAddress.placeholder'), readOnly: true, value: loading ? t('depositMemo.loading') : depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.memo, rightSideElement: React.createElement(CloneIcon, { width: 40, height: 40, color: dark.neutral300 }), onClickRightSideElement: function () {
                            copy(depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.memo);
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
                    React.createElement(CenteredLoader, null))) : (React.createElement(React.Fragment, null,
                    React.createElement(Box, { sx: {
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            flexDirection: ['column', 'row'],
                            gap: 2,
                        } },
                        React.createElement(ZignalyQRCode, { label: t('depositQR.address', {
                                coin: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name,
                            }), url: depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.address }),
                        (depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.memo) && (React.createElement(ZignalyQRCode, { label: t('depositQR.memo', { coin: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name }), url: depositInfo === null || depositInfo === void 0 ? void 0 : depositInfo.memo })))))))),
            !!network && !(networkObject === null || networkObject === void 0 ? void 0 : networkObject.depositEnable) && (React.createElement(ErrorMessage, { text: t('no-network') })))));
}
export default WalletDepositForm;
//# sourceMappingURL=WalletDepositForm.js.map