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
import { PaletteOptions, Typography } from '@mui/material';

const darkTheme: RaThemeOptions = {
  palette: { mode: 'dark' } as PaletteOptions,
};

export const MyAppBar = (props: AppBarProps) => (
  <AppBar {...props}>
    <Typography flex='1' variant='h6' id='react-admin-title'></Typography>
    <ToggleThemeButton
      lightTheme={defaultTheme as unknown as RaThemeOptions}
      darkTheme={darkTheme}
    />
  </AppBar>
);

export const MainMenu = () => (
  <Menu>
    <Menu.Item
      to='/admin/auctions'
      primaryText='Auctions'
      leftIcon={<EventNote />}
    />
    <Menu.Item to='/admin/users' primaryText='Users' leftIcon={<People />} />
    <Menu.Item
      to='/admin/codes'
      primaryText='System Codes'
      leftIcon={<Abc />}
    />
    <Menu.Item
      to='/admin/user-codes'
      primaryText='User Codes'
      leftIcon={<Redeem />}
    />
    <Menu.Item
      to='/admin/settings'
      primaryText='Settings'
      leftIcon={<Settings />}
    />
  </Menu>
);

const MyLayout = (props: LayoutProps) => {
  return <Layout {...props} appBar={MyAppBar} menu={MainMenu} />;
};

export default MyLayout;
