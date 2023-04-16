import { BottomNavigationAction, BottomNavigation, Paper, Box, useMediaQuery, } from '@mui/material';
import { useIsAuthenticated } from 'apis/user/use';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useLocation, matchPath } from 'react-router-dom';
import { ROUTE_PROFIT_SHARING, ROUTE_DASHBOARD, ROUTE_REFERRALS, ROUTE_MY_BALANCES, } from 'routes';
import theme from 'theme';
import { ReactComponent as BalanceIcon } from 'images/tab-balance.svg';
import { ReactComponent as MarketplaceIcon } from 'images/tab-marketplace.svg';
import { ReactComponent as PortfolioIcon } from 'images/tab-portfolio.svg';
import { ReactComponent as RewardsIcon } from 'images/tab-rewards.svg';
import { Link } from 'react-router-dom';
var tabs = [
    ROUTE_DASHBOARD,
    ROUTE_PROFIT_SHARING,
    ROUTE_REFERRALS,
    ROUTE_MY_BALANCES,
];
var ZigBottomNavigation = function () {
    var location = useLocation();
    var t = useTranslation('common').t;
    var _a = useState(location.pathname), tabValue = _a[0], setTabValue = _a[1];
    var isAuthenticated = useIsAuthenticated();
    var xs = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(function () {
        var match = tabs.find(function (tab) {
            return matchPath({ path: tab, end: false }, location.pathname);
        });
        if (match) {
            setTabValue(match);
        }
    }, [location.pathname]);
    if (!isAuthenticated || !xs)
        return null;
    return (React.createElement(Box, { height: '58px' },
        React.createElement(Paper, { sx: {
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                border: 'none',
            }, elevation: 3 },
            React.createElement(BottomNavigation, { sx: { backgroundColor: 'neutral800' }, showLabels: true, value: tabValue, onChange: function (event, newValue) {
                    setTabValue(newValue);
                } },
                React.createElement(BottomNavigationAction, { label: t('account-menu.marketplace'), icon: React.createElement(MarketplaceIcon, null), to: generatePath(ROUTE_PROFIT_SHARING), component: Link, value: ROUTE_PROFIT_SHARING }),
                React.createElement(BottomNavigationAction, { label: t('portfolio'), icon: React.createElement(PortfolioIcon, null), to: generatePath(ROUTE_DASHBOARD), component: Link, value: ROUTE_DASHBOARD }),
                React.createElement(BottomNavigationAction, { label: t('account-menu.referrals'), icon: React.createElement(RewardsIcon, null), to: generatePath(ROUTE_REFERRALS), component: Link, value: ROUTE_REFERRALS }),
                React.createElement(BottomNavigationAction, { label: t('account-menu.balance'), icon: React.createElement(BalanceIcon, null), to: generatePath(ROUTE_MY_BALANCES), component: Link, value: ROUTE_MY_BALANCES })))));
};
export default ZigBottomNavigation;
//# sourceMappingURL=index.js.map