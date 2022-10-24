import React, { useEffect, useState } from 'react';
import { Admin, defaultTheme, Resource } from 'react-admin';
import {
  AuctionEdit,
  AuctionIcon,
  AuctionList,
  AuctionCreate,
} from './auctions';
import { UserList, UserIcon } from './users';
import { CodeCreate, CodeEdit, CodeList, CodeIcon } from './codes';
import buildGraphQLProvider from './dataProvider';
import MyLayout from './Layout';

const theme = {
  ...defaultTheme,
  // palette: {
  //   mode: 'dark', // Switching the dark mode on is a single property value change.
  // },
};

const AdminEntryPoint = () => {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    buildGraphQLProvider().then((graphQlDataProvider) =>
      setDataProvider(() => graphQlDataProvider),
    );
  }, []);

  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin theme={theme} dataProvider={dataProvider} layout={MyLayout}>
      <Resource
        name='Auction'
        list={AuctionList}
        edit={AuctionEdit}
        create={AuctionCreate}
        icon={AuctionIcon}
      />
      <Resource name='User' list={UserList} icon={UserIcon} />
      <Resource
        name='Code'
        list={CodeList}
        edit={CodeEdit}
        create={CodeCreate}
        icon={CodeIcon}
      />
      <Resource
        name='user-codes'
        list={CodeList}
        edit={CodeEdit}
        create={CodeCreate}
        icon={CodeIcon}
      />
    </Admin>
  );
};

export default AdminEntryPoint;
