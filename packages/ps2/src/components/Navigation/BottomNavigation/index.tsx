import {
  CardGiftcardOutlined,
  CurrencyBitcoinOutlined,
  Storefront,
  WorkOutline,
} from '@mui/icons-material';
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

const ZigBottomNavigation = () => {
  const { t } = useTranslation('common');
  const [value, setValue] = useState(0);
  const isAuthenticated = useIsAuthenticated();
  const xs = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isAuthenticated || !xs) return null;

  return (
    <Box height='58px'>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
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
            icon={<Storefront />}
            to={generatePath(ROUTE_PROFIT_SHARING)}
            component={NavigationLink}
          />
          <BottomNavigationAction
            label={t('account-menu.portfolio')}
            icon={<WorkOutline />}
            to={generatePath(ROUTE_DASHBOARD)}
            component={NavigationLink}
          />
          <BottomNavigationAction
            label={t('account-menu.referrals')}
            icon={<CardGiftcardOutlined />}
            to={generatePath(ROUTE_REFERRALS)}
            component={NavigationLink}
          />
          <BottomNavigationAction
            label={t('account-menu.balance')}
            icon={<CurrencyBitcoinOutlined />}
            to={generatePath(ROUTE_MY_BALANCES)}
            component={NavigationLink}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default ZigBottomNavigation;
