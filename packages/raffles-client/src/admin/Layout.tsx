import * as React from 'react';
import {
  AppBar,
  AppBarProps,
  defaultTheme,
  Layout,
  LayoutProps,
  RaThemeOptions,
  ToggleThemeButton,
} from 'react-admin';
import { Menu } from 'react-admin';
import { Abc, EventNote, Redeem, Settings, People } from '@mui/icons-material';
import { Typography } from '@mui/material';

const darkTheme: RaThemeOptions = {
  palette: { mode: 'dark' },
};

export const MyAppBar = (props: AppBarProps) => (
  <AppBar {...props}>
    <Typography flex='1' variant='h6' id='react-admin-title'></Typography>
    <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
  </AppBar>
);

export const MainMenu = () => (
  <Menu>
    <Menu.Item to='/Auction' primaryText='Auctions' leftIcon={<EventNote />} />
    <Menu.Item to='/User' primaryText='Users' leftIcon={<People />} />
    <Menu.Item to='/Code' primaryText='System Codes' leftIcon={<Abc />} />
    <Menu.Item
      to='/user-codes'
      primaryText='User Codes'
      leftIcon={<Redeem />}
    />
    <Menu.Item to='/settings' primaryText='Settings' leftIcon={<Settings />} />
  </Menu>
);

const MyLayout = (props: LayoutProps) => (
  <Layout {...props} appBar={MyAppBar} menu={MainMenu} />
);

export default MyLayout;
