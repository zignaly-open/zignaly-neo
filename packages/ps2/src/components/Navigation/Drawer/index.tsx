import {
  CardGiftcardOutlined,
  CurrencyBitcoinOutlined,
  GifOutlined,
  Menu,
  Storefront,
  WorkOutline,
} from '@mui/icons-material';
import {
  BottomNavigationAction,
  BottomNavigation,
  Paper,
  Box,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
  Button,
} from '@mui/material';
import { UserIcon, ZigButton } from '@zignaly-open/ui';
import { useIsAuthenticated, useLogout } from 'apis/user/use';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import {
  ROUTE_PROFIT_SHARING,
  ROUTE_DASHBOARD,
  ROUTE_REFERRALS,
  ROUTE_MY_BALANCES,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
} from 'routes';
import theme from 'theme';
import { LoginButton } from '../AccountMenu/styles';
import { NavigationLink } from '../Header/atoms';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const ZigDrawer = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const logout = useLogout();
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <Menu />
      </IconButton>
      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box
            onClick={handleDrawerToggle}
            display='flex'
            flexDirection='column'
            textAlign='center'
            gap={2}
          >
            <Typography variant='h6' sx={{ my: 2 }}>
              MUI
            </Typography>
            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            {isAuthenticated ? (
              <ZigButton onClick={logout}>
                {t('account-menu.notAuth-button-logOut')}
              </ZigButton>
            ) : (
              <>
                <Link to={ROUTE_LOGIN} state={{ redirectTo: location }}>
                  <ZigButton
                    id={'drawer__login'}
                    variant='text'
                    startIcon={
                      <UserIcon
                        color={theme.palette.neutral300}
                        width={'16px'}
                        height={'16px'}
                      />
                    }
                    color={'secondary'}
                  >
                    {t('account-menu.isAuth-button-logIn')}
                  </ZigButton>
                </Link>
                <Link to={ROUTE_SIGNUP} state={{ redirectTo: location }}>
                  <ZigButton id={'drawer__signup'} variant='contained'>
                    {t('account-menu.isAuth-button-signUp')}
                  </ZigButton>
                </Link>
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default ZigDrawer;
