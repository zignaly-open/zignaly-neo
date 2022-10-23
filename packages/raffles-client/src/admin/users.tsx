import React from 'react';
import { List, Datagrid, DateField, TextField } from 'react-admin';
import { Person } from '@mui/icons-material';
export const UserIcon = Person;

export const UserList = () => (
  <List sort={{ field: 'id', order: 'desc' }}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='username' />
      <TextField source='discordName' />
      <TextField source='email' />
      <DateField source='createdAt' />
      <TextField source='publicAddress' />
    </Datagrid>
  </List>
);
