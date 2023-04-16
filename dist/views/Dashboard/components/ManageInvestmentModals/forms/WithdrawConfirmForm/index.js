import React from 'react';
import { AmountContainer } from './styles';
import { Grid } from '@mui/material';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';
import { ZigPriceLabelIcon } from './atoms/ZigPriceLabelIcon';
import ChainIcon from 'components/ChainIcon';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
var WithdrawConfirmForm = function (_a) {
    var action = _a.action, back = _a.back, status = _a.status, address = _a.address, tag = _a.tag, coin = _a.coin, networkName = _a.networkName, networkCoin = _a.networkCoin, amount = _a.amount, fee = _a.fee, _b = _a.feeCoin, feeCoin = _b === void 0 ? coin : _b, close = _a.close, iconBucket = _a.iconBucket;
    var t = useTranslation('withdraw-crypto').t;
    if (status.isSuccess) {
        return (React.createElement(Grid, { container: true, direction: 'column' },
            React.createElement(ZigTypography, { my: 1, color: 'neutral200' }, t('success.description')),
            React.createElement(ModalActions, { align: 'left' },
                React.createElement(ZigButton, { onClick: close, variant: 'outlined', size: 'large' }, t('common:close')))));
    }
    return (React.createElement(Grid, { container: true, direction: 'column' },
        React.createElement(ZigTypography, { my: 1, color: 'neutral200' }, t('confirmation.description')),
        React.createElement(ZigTypography, { mt: 4, color: 'neutral200' }, t('confirmation.network')),
        React.createElement(Grid, { alignItems: 'center', direction: 'row', display: 'flex', gap: 2, mt: '8px' },
            React.createElement(ChainIcon, { network: networkCoin }),
            React.createElement(ZigTypography, { variant: 'h2', color: 'neutral100', sx: { weight: 'medium' } }, networkName)),
        React.createElement(Grid, { mt: 3, gap: 3, display: 'flex', direction: 'column' },
            React.createElement(ZigInput, { label: t('confirmation.address'), InputProps: {
                    readOnly: true,
                }, value: address, fullWidth: true }),
            tag && (React.createElement(ZigInput, { label: t('withdrawMemo.label'), InputProps: {
                    readOnly: true,
                }, value: tag, fullWidth: true }))),
        React.createElement(Grid, { justifyContent: 'center', gap: 2, alignItems: 'center', mt: 4, mb: 2, display: 'flex', direction: 'row', height: '96px' },
            React.createElement(AmountContainer, { sx: { height: '100%', flex: 2 } },
                React.createElement(Grid, { display: 'flex', justifyContent: 'center', direction: 'column' },
                    React.createElement(ZigTypography, { color: 'neutral200', variant: 'h3', fontWeight: 'regular' }, t('confirmation.amount')),
                    React.createElement(ZigPriceLabelIcon, { amount: amount, coin: coin, iconBucket: iconBucket }))),
            React.createElement(AmountContainer, { sx: { height: '100%', flex: 1 } },
                React.createElement(Grid, { direction: 'column', justifyContent: 'center' },
                    React.createElement(ZigTypography, { variant: 'body2', color: 'neutral200', fontWeight: 'medium' }, t('confirmation.networkFee')),
                    React.createElement(ZigPriceLabelIcon, { amount: fee, coin: feeCoin, iconBucket: iconBucket })))),
        React.createElement(AmountContainer, { coloredBorder: true, sx: { height: '120px' } },
            React.createElement(Grid, { gap: 2, justifyContent: 'center', display: 'flex', alignItems: 'center' },
                React.createElement(ZigTypography, { color: 'neutral300', variant: 'h2' }, t('confirmation.receive')),
                React.createElement(ZigPriceLabelIcon, { amount: coin !== feeCoin
                        ? amount
                        : BigNumber(amount).minus(fee).toString(), coin: coin, iconBucket: iconBucket }))),
        React.createElement(ModalActions, { align: 'right' },
            React.createElement(ZigButton, { id: 'confirm__back', onClick: back, variant: 'outlined', size: 'large' }, t('common:back')),
            React.createElement(ZigButton, { id: 'confirm__confirm-withdraw', onClick: action, variant: 'contained', size: 'large', loading: status.isLoading, type: 'submit' }, t('confirmation.withdrawNow')))));
};
export default WithdrawConfirmForm;
//# sourceMappingURL=index.js.map