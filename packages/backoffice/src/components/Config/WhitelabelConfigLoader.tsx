import React from 'react';
import { Loader } from '@zignaly-open/ui';
import { useCurrentWlConfig } from './use';

function WhitelabelConfigLoader({ children }: { children: JSX.Element }) {
  const { isLoading } = useCurrentWlConfig();

  return isLoading ? <Loader /> : <>{children}</>;
}

export default WhitelabelConfigLoader;
