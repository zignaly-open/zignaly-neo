import { ApolloClient, InMemoryCache } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Admin, defaultTheme, Resource } from 'react-admin';
import {
  AuctionEdit,
  AuctionIcon,
  AuctionList,
  AuctionCreate,
} from './auctions';
import { dataProvider } from './dataProvider';

const theme = {
  ...defaultTheme,
  // palette: {
  //   mode: 'dark', // Switching the dark mode on is a single property value change.
  // },
};

const AdminEntryPoint = () => {
  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin theme={theme} dataProvider={dataProvider}>
      <Resource
        name='auctions'
        list={AuctionList}
        edit={AuctionEdit}
        create={AuctionCreate}
        icon={AuctionIcon}
      />
    </Admin>
  );
};

export default AdminEntryPoint;
