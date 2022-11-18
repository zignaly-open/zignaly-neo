import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import { RPC_URLS } from './rpcUrls';

export enum ConnectionType {
  INJECTED = 'INJECTED',
  WALLET_CONNECT = 'WALLET_CONNECT',
}

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.debug(`web3-react error: ${error}`);
};

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions, onError }),
);
export const injectedConnection: Connection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
};

const [web3WalletConnect, web3WalletConnectHooks] =
  initializeConnector<WalletConnect>((actions) => {
    // Avoid testing for the best URL by only passing a single URL per chain.
    // Otherwise, WC will not initialize until all URLs have been tested (see getBestUrl in web3-react).
    const RPC_URLS_WITHOUT_FALLBACKS = Object.entries(RPC_URLS).reduce(
      (map, [chainId, urls]) => ({
        ...map,
        [chainId]: urls[0],
      }),
      {},
    );
    return new WalletConnect({
      actions,
      options: {
        rpc: RPC_URLS_WITHOUT_FALLBACKS,
        qrcode: true,
      },
      onError,
    });
  });
export const walletConnectConnection: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
};

// TO DO: separate utils stuff in difference file
export function getIsInjected(): boolean {
  return Boolean(window.ethereum);
}

export function getIsMetaMask(): boolean {
  return window.ethereum?.isMetaMask ?? false;
}

export function getIsCoinbaseWallet(): boolean {
  return (window.ethereum as EthereumProvider)?.isCoinbaseWallet ?? false;
}

const CONNECTIONS = [injectedConnection, walletConnectConnection];

export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find((conn) => conn.connector === c);
    if (!connection) {
      throw Error('unsupported connector');
    }
    return connection;
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection;
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection;
    }
  }
}

export function getConnectionName(
  connectionType: ConnectionType,
  isMetaMask?: boolean,
) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? 'MetaMask' : 'Injected';
    case ConnectionType.WALLET_CONNECT:
      return 'WalletConnect';
  }
}
