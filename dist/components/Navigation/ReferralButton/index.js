import React from 'react';
import { Box } from '@mui/material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_REFERRALS } from '../../../routes';
import { GradientBorderButtonWrapper } from './atoms';
var ReferralButton = function () {
    var t = useTranslation('referrals').t;
    return (React.createElement(Link, { to: generatePath(ROUTE_REFERRALS) },
        React.createElement(GradientBorderButtonWrapper, null,
            React.createElement(ZigButton, { id: 'menu__referral-link', component: 'a', sx: {
                    cursor: 'pointer',
                    pl: 1,
                    pr: 1,
                    pt: 0.5,
                    pb: 0.5,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }, variant: 'outlined' },
                React.createElement("img", { src: '/images/referrals/envelope-mini.png', style: { height: 22, width: 22 }, alt: 'referral' }),
                React.createElement(Box, { component: 'span', sx: {
                        display: 'flex',
                        ml: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    } },
                    React.createElement(ZigTypography, { color: 'primary', sx: {
                            fontSize: '13px',
                            lineHeight: 1,
                            textAlign: 'center',
                        } }, t('header.title')),
                    React.createElement(ZigTypography, { sx: {
                            mt: '1px',
                            fontSize: '12px',
                            lineHeight: 1.3,
                            textAlign: 'center',
                        } }, t('header.description')))))));
};
export default ReferralButton;
//# sourceMappingURL=index.js.map