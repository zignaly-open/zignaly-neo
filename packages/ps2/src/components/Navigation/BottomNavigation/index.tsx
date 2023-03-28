import {
  BottomNavigationAction,
  BottomNavigation,
  Paper,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useIsAuthenticated } from 'apis/user/use';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useLocation, matchPath } from 'react-router-dom';
import {
  ROUTE_PROFIT_SHARING,
  ROUTE_DASHBOARD,
  ROUTE_REFERRALS,
  ROUTE_MY_BALANCES,
} from 'routes';
import theme from 'theme';
import { ReactComponent as BalanceIcon } from 'images/tab-balance.svg';
import { ReactComponent as MarketplaceIcon } from 'images/tab-marketplace.svg';
import { ReactComponent as PortfolioIcon } from 'images/tab-portfolio.svg';
import { ReactComponent as RewardsIcon } from 'images/tab-rewards.svg';
import { Link } from 'react-router-dom';

const ZigBottomNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation('common');
  const [tabValue, setTabValue] = useState(location.pathname);
  const isAuthenticated = useIsAuthenticated();
  const xs = useMediaQuery(theme.breakpoints.down('sm'));

  const tabs = [
    ROUTE_DASHBOARD,
    ROUTE_PROFIT_SHARING,
    ROUTE_REFERRALS,
    ROUTE_MY_BALANCES,
  ];

  useEffect(() => {
    // On url change, find the matching tab and set it as the active tab
    const match = tabs.find((tab) =>
      matchPath({ path: tab, end: false }, location.pathname),
    );
    if (match) {
      setTabValue(match);
    }
  }, [location.pathname]);

  if (!isAuthenticated || !xs) return null;

  return (
    <Box height='58px'>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={tabValue}
          onChange={(event, newValue) => {
            setTabValue(newValue);
          }}
        >
          <BottomNavigationAction
            label={t('account-menu.marketplace')}
            icon={<MarketplaceIcon />}
            to={generatePath(ROUTE_PROFIT_SHARING)}
            component={Link}
            value={ROUTE_PROFIT_SHARING}
          />
          <BottomNavigationAction
            label={t('account-menu.portfolio')}
            icon={<PortfolioIcon />}
            to={generatePath(ROUTE_DASHBOARD)}
            component={Link}
            value={ROUTE_DASHBOARD}
          />
          <BottomNavigationAction
            label={t('account-menu.referrals')}
            icon={<RewardsIcon />}
            to={generatePath(ROUTE_REFERRALS)}
            component={Link}
            value={ROUTE_REFERRALS}
          />
          <BottomNavigationAction
            label={t('account-menu.balance')}
            icon={<BalanceIcon />}
            to={generatePath(ROUTE_MY_BALANCES)}
            component={Link}
            value={ROUTE_MY_BALANCES}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default ZigBottomNavigation;
