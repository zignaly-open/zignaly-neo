import { AccountCircle, ChevronRight, ExpandLess, Menu, } from '@mui/icons-material';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Drawer, IconButton, Collapse, ListItemIcon, } from '@mui/material';
import { Avatar, UserIcon, ZigButton, ZigTypography, GlobeLanguages, } from '@zignaly-open/ui';
import { useFirstOwnedService } from 'apis/service/use';
import { useChangeLocale, useCurrentUser, useIsAuthenticated, useLogout, } from 'apis/user/use';
import { useZModal } from 'components/ZModal/use';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_SIGNUP, ROUTE_TRADING_SERVICE_MANAGE, ROUTE_BECOME_TRADER, ROUTE_WALLET, ROUTE_PROFIT_SHARING, } from 'routes';
import theme from 'theme';
import { HELP_URL } from 'util/constants';
import { supportedLanguages } from 'util/i18next';
import { LocalizationLanguages } from 'util/languages';
import socialNetworksLinks from 'util/socialNetworks';
import Enable2FAModal from 'views/Settings/Enable2FAModal';
import UpdatePasswordModal from 'views/Settings/UpdatePasswordModal';
import { NavLink, Networks } from '../ExtraNavigationDropdown/styles';
import { DropdownExchangeAccount } from './atoms';
var drawerWidth = 250;
var ZigDrawer = function () {
    var _a, _b, _c;
    var _d = useState(false), mobileOpen = _d[0], setMobileOpen = _d[1];
    var handleDrawerToggle = function () {
        setMobileOpen(function (prevState) { return !prevState; });
    };
    var logout = useLogout();
    var _e = useTranslation('common'), t = _e.t, i18n = _e.i18n;
    var isAuthenticated = useIsAuthenticated();
    var _f = useState(false), settingsOpen = _f[0], setSettingsOpen = _f[1];
    var _g = useState(false), languageOpen = _g[0], setLanguageOpen = _g[1];
    var showModal = useZModal().showModal;
    var service = useFirstOwnedService();
    var _h = useCurrentUser(), exchanges = _h.exchanges, email = _h.email, imageUrl = _h.imageUrl;
    var location = useLocation();
    var changeLocale = useChangeLocale();
    var languageMap = supportedLanguages
        ? supportedLanguages.map(function (x) { return LocalizationLanguages[x]; })
        : Object.values(LocalizationLanguages);
    var handleSelectLanguage = function (locale) {
        changeLocale(locale);
        handleDrawerToggle();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { color: 'inherit', "aria-label": 'open drawer', edge: 'start', onClick: handleDrawerToggle, sx: { mr: 2, display: { sm: 'none' } } },
            React.createElement(Menu, null)),
        React.createElement(Box, { component: 'nav' },
            React.createElement(Drawer, { variant: 'temporary', open: mobileOpen, onClose: handleDrawerToggle, ModalProps: {
                    keepMounted: true,
                }, sx: {
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                } },
                React.createElement(Box, { display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 2, flex: 1 },
                    isAuthenticated ? (React.createElement(React.Fragment, null,
                        React.createElement(Box, { sx: { my: 2 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 },
                            imageUrl ? (React.createElement(Avatar, { image: imageUrl, size: 'xlarge' })) : (React.createElement(AccountCircle, { sx: { width: 55, height: 55 } })),
                            React.createElement(ZigTypography, { variant: 'caption' }, email)),
                        (exchanges === null || exchanges === void 0 ? void 0 : exchanges.length) && React.createElement(DropdownExchangeAccount, null))) : (React.createElement(Box, { mt: 3, mb: 2, display: 'flex', flexDirection: 'column', gap: 2, onClick: handleDrawerToggle },
                        React.createElement(Link, { to: ROUTE_LOGIN, state: { redirectTo: location } },
                            React.createElement(ZigButton, { id: 'drawer__login', variant: 'text', startIcon: React.createElement(UserIcon, { color: theme.palette.neutral300, width: '16px', height: '16px' }), color: 'secondary' }, t('account-menu.isAuth-button-logIn'))),
                        React.createElement(Link, { to: ROUTE_SIGNUP, state: { redirectTo: location } },
                            React.createElement(ZigButton, { id: 'drawer__signup', variant: 'contained' }, t('account-menu.isAuth-button-signUp'))))),
                    React.createElement(Divider, null),
                    React.createElement(List, null,
                        isAuthenticated ? (React.createElement(React.Fragment, null,
                            React.createElement(ListItem, { disablePadding: true, onClick: handleDrawerToggle },
                                React.createElement(ListItemButton, { id: 'drawer__wallet', to: ROUTE_WALLET, component: Link },
                                    React.createElement(ListItemText, { primary: t('account-menu.notAuth-dropdown-link-wallet') }))),
                            React.createElement(ListItemButton, { onClick: function () { return setSettingsOpen(!settingsOpen); } },
                                React.createElement(ListItemText, { primary: t('account-menu.notAuth-dropdown-link-settings') }),
                                settingsOpen ? React.createElement(ExpandLess, null) : React.createElement(ChevronRight, null)),
                            React.createElement(Collapse, { in: settingsOpen, timeout: 'auto', unmountOnExit: true },
                                React.createElement(List, { component: 'div', disablePadding: true, onClick: handleDrawerToggle },
                                    React.createElement(ListItemButton, { sx: { pl: 4 }, onClick: function () { return showModal(UpdatePasswordModal); } },
                                        React.createElement(ListItemText, { primary: t('account-menu.notAuth-dropdown-link-password') })),
                                    React.createElement(ListItemButton, { onClick: function () { return showModal(Enable2FAModal); }, sx: { pl: 4 } },
                                        React.createElement(ListItemText, { primary: t('account-menu.notAuth-dropdown-link-2fa') })))),
                            React.createElement(ListItem, { disablePadding: true, onClick: handleDrawerToggle },
                                React.createElement(ListItemButton, { id: 'drawer__become-trader', to: ROUTE_BECOME_TRADER, component: Link },
                                    React.createElement(ListItemText, { primary: t('navigation-menu.become-trader') }))),
                            service && (React.createElement(ListItem, { disablePadding: true, onClick: handleDrawerToggle },
                                React.createElement(ListItemButton, { id: 'drawer__for-trading', to: generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                                        serviceId: (_a = service.serviceId) === null || _a === void 0 ? void 0 : _a.toString(),
                                    }), component: Link },
                                    React.createElement(ListItemText, { primary: t('main-menu.dropdown-link-forTrading') })))))) : (React.createElement(ListItem, { disablePadding: true, onClick: handleDrawerToggle },
                            React.createElement(ListItemButton, { to: ROUTE_PROFIT_SHARING, component: Link, id: 'drawer__ps' },
                                React.createElement(ListItemText, { primary: t('navigation-menu.profit-sharing') })))),
                        React.createElement(ListItem, { disablePadding: true, onClick: handleDrawerToggle },
                            React.createElement(ListItemButton, { target: '_blank', href: HELP_URL },
                                React.createElement(ListItemText, { primary: t('main-menu.dropdown-link-helpDocs') })))),
                    React.createElement(List, null,
                        React.createElement(ListItem, { disablePadding: true },
                            React.createElement(ListItemButton, { onClick: function () { return setLanguageOpen(!languageOpen); } },
                                React.createElement(ListItemIcon, { sx: { minWidth: '48px' } },
                                    React.createElement(GlobeLanguages, { color: theme.palette.neutral300, width: '26px', height: '26px' })),
                                React.createElement(ListItemText, { primary: (_c = LocalizationLanguages[(_b = i18n.language) === null || _b === void 0 ? void 0 : _b.split('_')[0]]) === null || _c === void 0 ? void 0 : _c.label }),
                                languageOpen ? React.createElement(ExpandLess, null) : React.createElement(ChevronRight, null))),
                        React.createElement(Collapse, { in: languageOpen, timeout: 'auto', unmountOnExit: true },
                            React.createElement(List, { component: 'div', disablePadding: true }, languageMap.map(function (language, index) { return (React.createElement(ListItemButton, { sx: { pl: 4 }, key: language.locale, onClick: function () { return handleSelectLanguage(language.locale); }, id: "drawer-languages__".concat(index.toString()) },
                                React.createElement(ListItemText, { primary: language.label }))); })))),
                    isAuthenticated && (React.createElement(ZigButton, { onClick: function () {
                            logout();
                            handleDrawerToggle();
                        }, variant: 'outlined', sx: { mx: 4, mY: 1 } }, t('account-menu.notAuth-button-logOut'))),
                    React.createElement(ZigTypography, { mt: 2, variant: 'caption', marginTop: 'auto' }, t('follow-us')),
                    React.createElement(Box, { display: 'flex', justifyContent: 'center', mt: -1, mb: 1 },
                        React.createElement(Networks, null, socialNetworksLinks.map(function (socialNetwork, index) {
                            var IconComponent = socialNetwork.image;
                            return (React.createElement(NavLink, { onClick: handleDrawerToggle, href: socialNetwork.path, key: "--social-network-nav-link-".concat(index.toString()), id: "drawer__social-network-".concat(index.toString()), target: '_blank' },
                                React.createElement(IconComponent, { height: '22px', width: '22px' })));
                        }))))))));
};
export default ZigDrawer;
//# sourceMappingURL=index.js.map