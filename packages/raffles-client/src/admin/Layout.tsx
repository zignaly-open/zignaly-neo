import * as React from 'react';
import { Layout } from 'react-admin';
import { Menu } from 'react-admin';
import SubMenu from './SubMenu';
import {
  Abc,
  EventNote,
  Person,
  Redeem,
  Settings,
  People,
} from '@mui/icons-material';

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

const MyLayout = (props) => <Layout {...props} menu={MainMenu} />;

export default MyLayout;
