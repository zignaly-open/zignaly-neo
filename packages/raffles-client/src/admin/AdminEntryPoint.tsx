import React, { useEffect, useState } from 'react';
import { Admin, defaultTheme, Resource } from 'react-admin';
import {
  AuctionEdit,
  AuctionIcon,
  AuctionList,
  AuctionCreate,
} from './auctions';
import { UserList, UserIcon } from './users';
import buildGraphQLProvider from './dataProvider';

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
    <Admin theme={theme} dataProvider={dataProvider}>
      <Resource
        name='Auction'
        list={AuctionList}
        edit={AuctionEdit}
        create={AuctionCreate}
        icon={AuctionIcon}
      />
      <Resource name='User' list={UserList} icon={UserIcon} />
    </Admin>
  );
};

export default AdminEntryPoint;
