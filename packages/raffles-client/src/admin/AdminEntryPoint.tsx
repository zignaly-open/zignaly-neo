import React, { useEffect, useState } from 'react';
import { Admin, CustomRoutes, Loading, Resource } from 'react-admin';
import {
  AuctionEdit,
  AuctionIcon,
  AuctionList,
  AuctionCreate,
} from './resources/auctions';
import { UserList, UserIcon } from './resources/users';
import {
  CodeCreate,
  CodeEdit,
  CodeList,
  CodeIcon,
  UserCodeList,
} from './resources/codes';
import buildGraphQLProvider from './dataProvider';
import MyLayout from './components/Layout';
import { Route, useNavigate } from 'react-router-dom';
import i18nProvider from './i18nProvider';
import { SettingsPage } from './resources/settings';
import { getToken } from 'util/token';

const AdminEntryPoint = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      return navigate('/');
    }
    buildGraphQLProvider().then((graphQlDataProvider) =>
      setDataProvider(() => graphQlDataProvider),
    );
  }, [navigate]);

  if (!dataProvider) {
    return <Loading />;
  }

  return (
    <Admin
      i18nProvider={i18nProvider}
      dataProvider={dataProvider}
      layout={MyLayout}
      basename='/admin'
    >
      <Resource
        name='auctions'
        list={AuctionList}
        edit={AuctionEdit}
        create={AuctionCreate}
        icon={AuctionIcon}
      />
      <Resource name='users' list={UserList} icon={UserIcon} />
      <Resource
        name='codes'
        list={CodeList}
        edit={CodeEdit}
        create={CodeCreate}
        icon={CodeIcon}
      />
      <Resource
        name='user-codes'
        list={UserCodeList}
        edit={CodeEdit}
        create={CodeCreate}
        icon={CodeIcon}
      />
      <CustomRoutes>
        <Route path='/settings' element={<SettingsPage />} />
      </CustomRoutes>
    </Admin>
  );
};

export default AdminEntryPoint;
