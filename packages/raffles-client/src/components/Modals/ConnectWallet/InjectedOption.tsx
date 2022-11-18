import React from 'react';
import { ReactComponent as InjectedLogo } from 'assets/icons/arrow-right.svg';
import { ReactComponent as MetamaskLogo } from 'assets/icons/metamask-logo.svg';
import {
  ConnectionType,
  getConnectionName,
  injectedConnection,
} from 'config/web3';
import Option from './Option';
import { useHandleExternalLink } from 'hooks';
import { WalletOptionProps } from './types';

export function InstallMetaMaskOption() {
  const { handleOpenExternalLink } = useHandleExternalLink();
  return (
    <Option
      icon={<MetamaskLogo />}
      header={'Install Metamask'}
      onClick={() => handleOpenExternalLink('https://metamask.io/')}
    />
  );
}

export function MetaMaskOption({ tryActivation }: WalletOptionProps) {
  return (
    <Option
      icon={<MetamaskLogo />}
      header={getConnectionName(ConnectionType.INJECTED, true)}
      onClick={() => tryActivation(injectedConnection.connector)}
    />
  );
}

export function InjectedOption({ tryActivation }: WalletOptionProps) {
  return (
    <Option
      icon={<InjectedLogo />}
      header={getConnectionName(ConnectionType.INJECTED, false)}
      onClick={() => tryActivation(injectedConnection.connector)}
    />
  );
}
