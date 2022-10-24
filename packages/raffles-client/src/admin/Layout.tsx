import * as React from 'react';
import { Layout } from 'react-admin';
import { Menu } from 'react-admin';

import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import LabelIcon from '@mui/icons-material/Label';
import SubMenu from './SubMenu';
import { Abc, EventNote, Person, Redeem, Settings } from '@mui/icons-material';

export const MainMenu = () => (
  <Menu>
    <Menu.Item to='/Auction' primaryText='Auctions' leftIcon={<EventNote />} />
    <Menu.Item to='/User' primaryText='Users' leftIcon={<Person />} />
    <SubMenu primaryText='Codes' leftIcon={<Redeem />}>
      <Menu.Item to='/Code' primaryText='System Codes' leftIcon={<Abc />} />
      <Menu.Item
        to='/admin/articles'
        primaryText='User Codes'
        leftIcon={<PeopleIcon />}
      />
      <Menu.Item
        to='/admin/articles'
        primaryText='Default Settings'
        leftIcon={<Settings />}
      />
    </SubMenu>
  </Menu>
);

const MyLayout = (props) => <Layout {...props} menu={MainMenu} />;

export default MyLayout;
