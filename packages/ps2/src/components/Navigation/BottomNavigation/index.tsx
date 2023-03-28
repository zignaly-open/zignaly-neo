import {
  BottomNavigationAction,
  BottomNavigation,
  Paper,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useIsAuthenticated } from 'apis/user/use';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import {
  ROUTE_PROFIT_SHARING,
  ROUTE_DASHBOARD,
  ROUTE_REFERRALS,
  ROUTE_MY_BALANCES,
} from 'routes';
import theme from 'theme';
import { NavigationLink } from '../Header/atoms';
import { ReactComponent as BalanceIcon } from 'images/tab-balance.svg';
import { ReactComponent as MarketplaceIcon } from 'images/tab-marketplace.svg';
import { ReactComponent as PortfolioIcon } from 'images/tab-portfolio.svg';
import { ReactComponent as RewardsIcon } from 'images/tab-rewards.svg';

const ZigBottomNavigation = () => {
  const { t } = useTranslation('common');
  const [value, setValue] = useState(0);
  const isAuthenticated = useIsAuthenticated();
  const xs = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isAuthenticated || !xs) return null;

  return (
    <Box height='58px'>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label={t('account-menu.marketplace')}
            icon={<MarketplaceIcon />}
            to={generatePath(ROUTE_PROFIT_SHARING)}
            component={NavigationLink}
          />
          <BottomNavigationAction
            label={t('account-menu.portfolio')}
            icon={<PortfolioIcon />}
            to={generatePath(ROUTE_DASHBOARD)}
            component={NavigationLink}
          />
          <BottomNavigationAction
            label={t('account-menu.referrals')}
            icon={<RewardsIcon />}
            to={generatePath(ROUTE_REFERRALS)}
            component={NavigationLink}
          />
          <BottomNavigationAction
            label={t('account-menu.balance')}
            icon={<BalanceIcon />}
            to={generatePath(ROUTE_MY_BALANCES)}
            component={NavigationLink}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default ZigBottomNavigation;
