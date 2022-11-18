import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

export const useInactiveListener = (suppress = false) => {
  const { connector, isActive } = useWeb3React();

  useEffect(() => {
    const ethereum = window.ethereum as EthereumProvider | undefined;

    if (ethereum && ethereum.on && !isActive && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        (connector.activate() as Promise<void>).catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Failed to activate after chain changed', error);
        });
      };

      const handleAccountsChanged = () => {
        // if (accounts.length > 0) {
        //   // eat errors
        //   (connector.activate() as Promise<void>).catch((error) => {
        //     // eslint-disable-next-line no-console
        //     console.error('Failed to activate after accounts changed', error);
        //   });
        // }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [connector]);
};
