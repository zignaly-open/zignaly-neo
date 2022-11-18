import { ConnectionType, getConnection } from 'config/web3';
import { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';

const SELECTABLE_WALLETS = [
  ConnectionType.INJECTED,
  ConnectionType.WALLET_CONNECT,
];

export default function useOrderedConnections() {
  const selectedWallet = useAppSelector((state) => state.user.selectedWallet);
  return useMemo(() => {
    const orderedConnectionTypes: ConnectionType[] = [];

    // Add the `selectedWallet` to the top so it's prioritized, then add the other selectable wallets.
    if (selectedWallet) {
      orderedConnectionTypes.push(selectedWallet);
    }
    orderedConnectionTypes.push(
      ...SELECTABLE_WALLETS.filter((wallet) => wallet !== selectedWallet),
    );

    return orderedConnectionTypes.map(getConnection);
  }, [selectedWallet]);
}
