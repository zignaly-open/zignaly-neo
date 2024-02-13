import React from 'react';
import { Loader } from '@zignaly-open/ui';
import { useConfigQuery } from '../../apis/config/api';

function WhitelabelConfigLoader({ children }: { children: JSX.Element }) {
  const { isLoading } = useConfigQuery('z1');

  return isLoading ? <Loader /> : <>{children}</>;
}

export default WhitelabelConfigLoader;
