import React from 'react';
import { ReactComponent as WalletConnectLogo } from 'assets/icons/walletconnect-logo.svg';
import {
  ConnectionType,
  getConnectionName,
  walletConnectConnection,
} from 'config/web3';
import Option from './Option';
import { WalletOptionProps } from './types';

export function WalletConnectOption({ tryActivation }: WalletOptionProps) {
  return (
    <Option
      icon={<WalletConnectLogo />}
      onClick={() => tryActivation(walletConnectConnection.connector)}
      header={getConnectionName(ConnectionType.WALLET_CONNECT)}
    />
  );
}
