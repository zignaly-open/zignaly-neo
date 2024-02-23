import React from 'react';
import { generatePath, Navigate } from 'react-router-dom';
import * as Routes from '../../../routes';
import { useUserInfoQuery } from '../../../apis/session/api';
import { Loader } from '@zignaly-open/ui';

const RedirectToFirstWlConfig = () => {
  const { data } = useUserInfoQuery();
  return data?.projectIds?.[0] ? (
    <Navigate
      to={generatePath(Routes.ROUTE_CONFIG_PROFILE, {
        wl: data?.projectIds?.[0],
      })}
    />
  ) : (
    <Loader />
  );
};

export default RedirectToFirstWlConfig;
