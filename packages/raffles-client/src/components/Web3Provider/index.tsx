import React, { ReactNode, useMemo } from 'react';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { Connection, getConnectionName } from 'config/web3';
import { useEagerlyConnect } from 'hooks';
import useOrderedConnections from 'hooks/useOrderedConnections';

export default function Web3Provider({ children }: { children: ReactNode }) {
  useEagerlyConnect();
  const connections = useOrderedConnections();
  const connectors: [Connector, Web3ReactHooks][] = connections.map(
    ({ hooks, connector }: { hooks: Web3ReactHooks; connector: Connector }) => [
      connector,
      hooks,
    ],
  );

  const key = useMemo(
    () =>
      connections
        .map(({ type }: Connection) => getConnectionName(type))
        .join('-'),
    [connections],
  );

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      {children}
    </Web3ReactProvider>
  );
}
