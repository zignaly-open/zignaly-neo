import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import { PageContainer, ZignalyLogotype, ZigTypography, } from '@zignaly-open/ui';
import SignupForm from './components/SignupForm';
import { Grid, Link, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
var Signup = function () {
    var t = useTranslation(['pages', 'sign-up']).t;
    var theme = useTheme();
    var matches = useMediaQuery(theme.breakpoints.up('md'));
    useTitle(t('pages:signup'));
    var infoBarItems = useMemo(function () { return [
        {
            title: t('sign-up:info-bar.item1.title'),
            description: t('sign-up:info-bar.item1.description'),
            image: 'person-icon.svg',
        },
        {
            title: t('sign-up:info-bar.item2.title'),
            description: t('sign-up:info-bar.item2.description'),
            image: 'percent-icon.svg',
        },
        {
            title: t('sign-up:info-bar.item3.title'),
            description: t('sign-up:info-bar.item3.description'),
            image: 'dollar-icon.svg',
        },
    ]; }, [t]);
    return (React.createElement(PageContainer, { style: {
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        } },
        React.createElement(Grid, { container: true, direction: 'row', alignItems: 'center', padding: matches ? '0 10%' : '0 3%' },
            React.createElement(Grid, { item: true, xs: 12, md: 6, marginBottom: '85px', order: matches ? 0 : 1, justifyContent: 'center', display: !matches && 'flex' },
                React.createElement(Grid, { container: true, direction: 'column', maxWidth: '450px' },
                    React.createElement(Grid, { item: true, display: !matches && 'none' },
                        React.createElement(Grid, { container: true, direction: 'row', alignItems: 'center', marginBottom: '60px', marginLeft: '-6px' },
                            React.createElement(ZignalyLogotype, { width: '155px', height: '65px' }))),
                    React.createElement(Grid, { item: true, marginBottom: '10px' },
                        React.createElement(ZigTypography, { variant: 'h2', fontSize: '25px', lineHeight: 1.4, color: 'neutral100', textAlign: matches ? 'unset' : 'center' },
                            React.createElement(Trans, { i18nKey: 'sign-up:description', t: t },
                                React.createElement(Link, { href: '/profit-sharing', underline: 'hover', fontWeight: 600, sx: {
                                        backgroundImage: 'linear-gradient(90deg, #3F3BB1, #138EA0)',
                                        backgroundClip: 'text',
                                        color: 'transparent',
                                    } })))),
                    React.createElement(Grid, { item: true, marginBottom: '10px' },
                        React.createElement("img", { src: '/images/signup/official-broker.svg', alt: '' })),
                    infoBarItems.map(function (item, index) { return (React.createElement(Grid, { item: true, key: "--info-bar-item-".concat(index.toString()) },
                        React.createElement(Box, { display: 'flex', paddingTop: '40px' },
                            React.createElement("img", { src: "/images/signup/".concat(item.image), alt: '', width: '53px' }),
                            React.createElement(Box, { sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: '26px',
                                    maxWidth: '300px',
                                } },
                                React.createElement(ZigTypography, { variant: 'h2', fontWeight: 700, fontSize: '22px', lineHeight: 1.5, color: 'neutral100' }, item.title),
                                React.createElement(ZigTypography, { variant: 'body2', fontSize: '18px', lineHeight: 1.3, color: 'neutral300' }, item.description))))); }))),
            React.createElement(Grid, { item: true, xs: 12, md: 6, order: matches ? 1 : 0, marginBottom: !matches && '25px' },
                React.createElement(Grid, { container: true, direction: 'column' },
                    React.createElement(Grid, { item: true },
                        React.createElement(Grid, { container: true, justifyContent: 'center' },
                            React.createElement(SignupForm, null))),
                    React.createElement(Grid, { item: true, container: true, marginTop: '25px', alignItems: 'center', justifyContent: 'center', gap: '18px' },
                        React.createElement(Grid, { item: true },
                            React.createElement("img", { src: '/images/signup/secure-ssh.svg', alt: '' })),
                        React.createElement(Grid, { item: true },
                            React.createElement("img", { src: '/images/signup/funds-protected.svg', alt: '' }))))),
            React.createElement(Grid, { container: true, alignItems: 'center', justifyContent: 'center', marginTop: matches && '75px', gap: '15px', order: 3 },
                React.createElement(Grid, { item: true },
                    React.createElement("img", { src: '/images/signup/secured.svg', alt: '' })),
                React.createElement(Grid, { item: true },
                    React.createElement(ZigTypography, { variant: 'h2', fontSize: '25px', fontWeight: 600, textAlign: matches ? 'unset' : 'center' }, t('sign-up:trusted-by')))),
            React.createElement(Grid, { container: true, alignItems: 'center', justifyContent: 'center', padding: '25px 0', flexDirection: 'column', order: 4 },
                React.createElement(ZigTypography, { fontSize: '20px', textAlign: matches ? 'unset' : 'center' }, t('sign-up:bottom-description')),
                React.createElement(Grid, { item: true, container: true, width: '100%', alignItems: 'center', justifyContent: 'center', gap: '90px', paddingTop: '25px' },
                    React.createElement(Grid, { item: true },
                        React.createElement("img", { src: '/images/signup/forbes.svg', alt: '' })),
                    React.createElement(Grid, { item: true },
                        React.createElement("img", { src: '/images/signup/nasdaq.png', alt: '' })),
                    React.createElement(Grid, { item: true },
                        React.createElement("img", { src: '/images/signup/yahoo.svg', alt: '' })),
                    React.createElement(Grid, { item: true },
                        React.createElement("img", { src: '/images/signup/bitcoin.svg', alt: '' })))))));
};
export default Signup;
//# sourceMappingURL=Signup.js.map