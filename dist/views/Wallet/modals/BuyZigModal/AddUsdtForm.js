import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import ExchangesTooltip from './atoms/ExchangesTooltip';
import { Box, Divider, Grid, Link } from '@mui/material';
import { BUY_CRYPTO_URL } from 'util/constants';
import { useZModal } from 'components/ZModal/use';
import { useTranslation, Trans } from 'react-i18next';
import DepositModal from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';
import NorthEastIcon from '@mui/icons-material/NorthEast';
var AddUsdtForm = function (_a) {
    var close = _a.close;
    var t = useTranslation('wallet').t;
    var showModal = useZModal().showModal;
    return (React.createElement(React.Fragment, null,
        React.createElement(Grid, { container: true, sx: { padding: '10px 0' } },
            React.createElement(Grid, { item: true, xs: 12, sx: { paddingRight: '0px' } },
                React.createElement(ZigTypography, { my: 1, lineHeight: 1.8 },
                    React.createElement(Trans, { i18nKey: 'buy.deposit.description', t: t, values: {
                            coin: 'USDT',
                            max: '5,000',
                        } },
                        React.createElement(ExchangesTooltip, null)))),
            React.createElement(Grid, { item: true, container: true, justifyContent: 'center', sx: { height: '160px', paddingTop: '25px' } },
                React.createElement(Grid, { item: true, xs: 12, md: 5 },
                    React.createElement(Box, { sx: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            padding: '0 55px',
                        } },
                        React.createElement(Box, { sx: {
                                textAlign: 'center',
                                height: '90px',
                                paddingTop: '10px',
                                lineHeight: 2,
                            } },
                            React.createElement(ZigTypography, { variant: 'h3', letterSpacing: 0.9, color: 'neutral100' }, t('buy.deposit.external'))),
                        React.createElement(ZigButton, { variant: 'contained', id: 'choose-deposit-type__deposit', size: 'large', onClick: function () {
                                close();
                                setTimeout(function () {
                                    return showModal(DepositModal, {
                                        selectedCoin: 'USDT',
                                    });
                                });
                            } },
                            React.createElement(ZigTypography, { variant: 'h4', fontWeight: 600, letterSpacing: 1.1 }, t('buy.deposit.depositCoin', { coin: 'USDT' }))))),
                React.createElement(Grid, { item: true, container: true, xs: false, md: 1, justifyContent: 'center' },
                    React.createElement(Divider, { sx: { border: '1px solid #A8A8A830' }, orientation: 'vertical', flexItem: true, role: 'presentation' })),
                React.createElement(Grid, { item: true, xs: 12, md: 5 },
                    React.createElement(Box, { sx: {
                            width: '100%',
                            padding: '0 0',
                            display: 'flex',
                            flexDirection: 'column',
                        } },
                        React.createElement(Box, { textAlign: 'center', height: 90, paddingTop: '10px' },
                            React.createElement(ZigTypography, { variant: 'h3', letterSpacing: 0.9, color: 'neutral100' }, t('buy.deposit.noCrypto'))),
                        React.createElement(Link, { href: BUY_CRYPTO_URL, target: '_blank', display: 'flex', justifyContent: 'center', underline: 'none' },
                            React.createElement(ZigButton, { variant: 'contained', id: 'choose-deposit-type__purchase', size: 'large' },
                                React.createElement(ZigTypography, { variant: 'h4', fontWeight: 600, letterSpacing: 1.1 }, t('buy.deposit.buyCoin', { coin: 'USDT' })),
                                React.createElement(NorthEastIcon, { fontSize: 'small', sx: {
                                        marginLeft: '3px',
                                        marginTop: '-3px',
                                    } })))))))));
};
export default AddUsdtForm;
//# sourceMappingURL=AddUsdtForm.js.map