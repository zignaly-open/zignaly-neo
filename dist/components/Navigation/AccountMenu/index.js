import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginButton, AccountDropdown, AccountName } from './styles';
import { useMediaQuery, useTheme } from '@mui/material';
import { useActiveExchange, useCurrentUser, useIsAuthenticated, useLogout, useSelectExchange, } from '../../../apis/user/use';
import { Avatar, Button, DropDown, IconButton, Typography, UserIcon, ZigButton, } from '@zignaly-open/ui';
import { ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_SIGNUP, ROUTE_MY_BALANCES, ROUTE_WALLET, ROUTE_REFERRALS, ROUTE_REWARDS, } from '../../../routes';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { getImageOfAccount } from '../../../util/images';
import { useZModal } from 'components/ZModal/use';
import UpdatePasswordModal from 'views/Settings/UpdatePasswordModal';
import Enable2FAModal from 'views/Settings/Enable2FAModal';
import DepositModal from '../../../views/Dashboard/components/ManageInvestmentModals/DepositModal';
import { Add } from '@mui/icons-material';
function AccountMenu() {
    var theme = useTheme();
    var logout = useLogout();
    var t = useTranslation(['common', 'action']).t;
    var isAuthenticated = useIsAuthenticated();
    var activeExchange = useActiveExchange();
    var navigate = useNavigate();
    var exchanges = useCurrentUser().exchanges;
    var selectExchange = useSelectExchange();
    var location = useLocation();
    var showModal = useZModal().showModal;
    var md = useMediaQuery(theme.breakpoints.up('sm'));
    var dropDownRef = useRef(null);
    var onClose = useCallback(function () {
        var _a;
        (_a = dropDownRef.current) === null || _a === void 0 ? void 0 : _a.closeDropDown();
    }, [dropDownRef]);
    var setActiveExchange = function (exchangeInternalId) {
        selectExchange(exchangeInternalId);
    };
    if (!isAuthenticated) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Link, { to: ROUTE_LOGIN, state: { redirectTo: location } },
                React.createElement(LoginButton, { id: 'menu__login' },
                    React.createElement(UserIcon, { color: theme.palette.neutral300, width: '16px', height: '16px' }),
                    React.createElement(Typography, { variant: 'buttonsm', color: 'neutral300' }, t('account-menu.isAuth-button-logIn')))),
            React.createElement(Link, { to: ROUTE_SIGNUP, state: { redirectTo: location } },
                React.createElement(Button, { id: 'menu__signup', caption: t('account-menu.isAuth-button-signUp') }))));
    }
    else if (!md)
        return null;
    return (React.createElement(DropDown, { ref: dropDownRef, component: function (_a) {
            var open = _a.open;
            return (React.createElement(IconButton, { id: 'menu__dropdown-account', variant: 'flat', icon: React.createElement(Avatar, { size: 'medium', image: activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.image }), key: 'user', isFocused: open }));
        }, options: [
            {
                label: (React.createElement(AccountDropdown, null,
                    React.createElement(Avatar, { size: 'medium', image: activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.image }),
                    React.createElement(AccountName, { variant: 'body1', color: 'neutral100' }, activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.internalName))),
                id: 'account-menu-dropdown__account-switcher',
                children: ((exchanges === null || exchanges === void 0 ? void 0 : exchanges.length) > 1 ? exchanges : []).map(function (exchange, index) { return ({
                    onClick: function () { return setActiveExchange(exchange.internalId); },
                    id: "account-switcher-dropdown__account-".concat(index),
                    label: (React.createElement(React.Fragment, null,
                        React.createElement(Avatar, { size: 'medium', image: getImageOfAccount(index) }),
                        React.createElement(AccountName, { variant: 'body1', color: (activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.internalId) === exchange.internalId
                                ? 'highlighted'
                                : 'neutral200' }, exchange.internalName))),
                }); }),
            },
            {
                label: t('account-menu.portfolio'),
                id: 'account-menu-dropdown__portfolio',
                href: generatePath(ROUTE_DASHBOARD),
                onClick: function () { return navigate(ROUTE_DASHBOARD); },
            },
            {
                label: t('account-menu.notAuth-dropdown-link-balances'),
                id: 'account-menu-dropdown__balance',
                href: generatePath(ROUTE_MY_BALANCES),
                onClick: function () { return navigate(ROUTE_MY_BALANCES); },
            },
            {
                label: t('account-menu.notAuth-dropdown-link-wallet'),
                id: 'account-menu-dropdown__wallet',
                href: generatePath(ROUTE_WALLET),
                onClick: function () { return navigate(ROUTE_WALLET); },
            },
            {
                id: 'account-menu-dropdown__settings',
                label: t('account-menu.notAuth-dropdown-link-settings'),
                children: [
                    {
                        id: "menu-dropdown-settings__password",
                        label: t('account-menu.notAuth-dropdown-link-password'),
                        onClick: function () { return showModal(UpdatePasswordModal); },
                    },
                    {
                        id: "menu-dropdown-settings__2fa",
                        label: t('account-menu.notAuth-dropdown-link-2fa'),
                        onClick: function () { return showModal(Enable2FAModal); },
                    },
                ],
            },
            {
                element: (React.createElement(ZigButton, { id: 'account-menu-dropdown__deposit', startIcon: React.createElement(Add, null), sx: { fontWeight: 600, mb: 1 }, variant: 'contained', onClick: function () {
                        onClose();
                        showModal(DepositModal, {
                            ctaId: 'account-menu-deposit',
                        });
                    } }, t('action:deposit'))),
            },
            {
                separator: true,
                label: (React.createElement(React.Fragment, null,
                    React.createElement("img", { width: 24, height: 24, src: '/images/tab-rewards.svg', alt: t('account-menu.rewards') }),
                    t('account-menu.rewards'))),
                id: 'account-menu-dropdown__rewards',
                href: generatePath(ROUTE_REWARDS),
                onClick: function () { return navigate(ROUTE_REWARDS); },
            },
            {
                label: (React.createElement(React.Fragment, null,
                    React.createElement("img", { width: 24, height: 24, src: '/images/tab-referrals.svg', alt: t('account-menu.rewards') }),
                    t('account-menu.referrals'))),
                id: 'account-menu-dropdown__referrals',
                href: generatePath(ROUTE_REFERRALS),
                onClick: function () { return navigate(ROUTE_REFERRALS); },
            },
            {
                separator: true,
                label: React.createElement(React.Fragment, null, t('account-menu.notAuth-button-logOut')),
                id: 'account-menu-dropdown__logout',
                onClick: logout,
            },
        ] }));
}
export default AccountMenu;
//# sourceMappingURL=index.js.map