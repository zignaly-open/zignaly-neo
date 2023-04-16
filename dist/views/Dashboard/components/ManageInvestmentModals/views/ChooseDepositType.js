import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Grid, Link } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { BUY_CRYPTO_URL } from '../../../../../util/constants';
import { ChooseDepositTypeViews } from '../types';
var ChooseDepositType = function (_a) {
    var coin = _a.coin, setView = _a.setView;
    var t = useTranslation('purchase-deposit-crypto').t;
    return (React.createElement(React.Fragment, null,
        React.createElement(Grid, { container: true, sx: { padding: '10px 0' } },
            React.createElement(Grid, { item: true, xs: 12, sx: { paddingRight: '38px' } },
                React.createElement(ZigTypography, { variant: 'body2', fontSize: '15px' }, t('description', { coin: coin }))),
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
                            React.createElement(ZigTypography, { variant: 'h3', letterSpacing: 0.9, color: 'neutral100' }, t('transfer-crypto', { coin: coin }))),
                        React.createElement(ZigButton, { variant: 'contained', id: 'choose-deposit-type__deposit', size: 'large', onClick: function () {
                                setView(ChooseDepositTypeViews.DepositView);
                            } },
                            React.createElement(ZigTypography, { variant: 'h4', fontWeight: 600, letterSpacing: 1.1 }, t('buttons.deposit', { coin: coin }))))),
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
                            React.createElement(ZigTypography, { variant: 'h3', letterSpacing: 0.9, color: 'neutral100' }, t('buy-crypto', { coin: coin }))),
                        React.createElement(Link, { href: BUY_CRYPTO_URL, target: '_blank', display: 'flex', justifyContent: 'center', underline: 'none' },
                            React.createElement(ZigButton, { variant: 'contained', id: 'choose-deposit-type__purchase', size: 'large' },
                                React.createElement(ZigTypography, { variant: 'h4', fontWeight: 600, letterSpacing: 1.1 }, t('buttons.purchase', { coin: coin })),
                                React.createElement(NorthEastIcon, { fontSize: 'small', sx: {
                                        marginLeft: '3px',
                                        marginTop: '-3px',
                                    } })))))))));
};
export default ChooseDepositType;
//# sourceMappingURL=ChooseDepositType.js.map