import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  TextField,
  EmailField,
  SearchInput,
} from 'react-admin';
import { Person } from '@mui/icons-material';
export const UserIcon = Person;

const userFilters = [<SearchInput source='q' alwaysOn />];

export const UserList = () => (
  <List sort={{ field: 'id', order: 'desc' }} filters={userFilters}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='username' />
      <TextField source='discordName' />
      <EmailField source='email' />
      <DateField source='createdAt' />
      <TextField source='publicAddress' />
    </Datagrid>
  </List>
);
