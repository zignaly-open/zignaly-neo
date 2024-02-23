import React from 'react';
import { Loader } from '@zignaly-open/ui';
import { useCurrentWlConfig } from './use';
import { useUserInfoQuery } from '../../apis/session/api';

function WhitelabelConfigLoader({ children }: { children: JSX.Element }) {
  const { isLoading: isLoadingUserData } = useUserInfoQuery();
  const { isLoading } = useCurrentWlConfig();

  return isLoading || isLoadingUserData ? <Loader /> : <>{children}</>;
}

export default WhitelabelConfigLoader;
