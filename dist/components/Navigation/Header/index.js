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
import { HeaderLinksContainer, BrandImage } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationLink } from './atoms';
import { ROUTE_BECOME_TRADER, ROUTE_PROFIT_SHARING } from '../../../routes';
import ExtraNavigationDropdown from '../ExtraNavigationDropdown';
import AccountMenu from '../AccountMenu';
import ReferralButton from '../ReferralButton';
import RewardsButton from '../RewardsButton';
import { useIsAuthenticated } from '../../../apis/user/use';
import BalanceButton from '../BalanceButton';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import theme from 'theme';
import { Container, StyledAppBar } from './styles';
import Drawer from '../Drawer';
import { MAIN_APP_URL } from '../../../util/constants';
var Header = function () {
    var t = useTranslation('common').t;
    var isAuthenticated = useIsAuthenticated();
    var sm = useMediaQuery(theme.breakpoints.up('sm'));
    var md = useMediaQuery(theme.breakpoints.up('md'));
    return (React.createElement(Box, { sx: { display: 'flex' } },
        React.createElement(StyledAppBar, null,
            React.createElement(Toolbar, { sx: { flex: 1 } },
                React.createElement(Container, null,
                    sm ? (React.createElement(Box, { display: 'flex', alignItems: 'center', gap: '28px' },
                        React.createElement("a", { href: MAIN_APP_URL, key: 'logo', rel: 'noopener' },
                            React.createElement(BrandImage, { id: 'menu__logo-portfolio', height: '32px', type: 'isotype', width: '32px' })),
                        React.createElement(HeaderLinksContainer, { key: 'links' },
                            React.createElement(NavigationLink, { id: 'menu__marketplace', to: ROUTE_PROFIT_SHARING, key: '--route-ps' }, t('navigation-menu.profit-sharing')),
                            md && (React.createElement(NavigationLink, { id: 'menu__become-trader', to: ROUTE_BECOME_TRADER, key: '--route-bt' }, t('navigation-menu.become-trader')))),
                        React.createElement(ExtraNavigationDropdown, null))) : (React.createElement(Drawer, null)),
                    React.createElement(Box, { alignItems: 'center', display: 'flex', gap: '28px', sx: __assign({}, (isAuthenticated &&
                            !sm && { flex: 1, justifyContent: 'center' })) },
                        isAuthenticated && (React.createElement(React.Fragment, null,
                            React.createElement(BalanceButton, { key: 'balance' }),
                            React.createElement(RewardsButton, { key: 'rewards' }),
                            md && React.createElement(ReferralButton, { key: 'referral' }))),
                        React.createElement(AccountMenu, null)))))));
};
export default Header;
export { HeaderLinksContainer };
//# sourceMappingURL=index.js.map