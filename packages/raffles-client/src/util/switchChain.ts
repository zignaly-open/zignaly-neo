import { Connector } from '@web3-react/types';
import {
  FALLBACK_URLS,
  getChainInfo,
  isSupportedChain,
  RPC_URLS,
  SupportedChainId,
  walletConnectConnection,
} from 'config/web3';

function getRpcUrl(chainId: SupportedChainId): string {
  switch (chainId) {
    case SupportedChainId.POLYGON:
    case SupportedChainId.MUMBAI:
    case SupportedChainId.ETHEREUM:
    case SupportedChainId.GOERLI:
    case SupportedChainId.BINANCE:
      return RPC_URLS[chainId][0];
    // Attempting to add a chain using an infura URL will not work, as the URL will be unreachable from the MetaMask background page.
    // MetaMask allows switching to any publicly reachable URL, but for novel chains, it will display a warning if it is not on the "Safe" list.
    // See the definition of FALLBACK_URLS for more details.
    default:
      return FALLBACK_URLS[chainId][0];
  }
}

export const switchNetwork = async (
  connector: Connector,
  chainId: SupportedChainId,
) => {
  if (!isSupportedChain(chainId)) {
    throw new Error(
      `Chain ${chainId} not supported for connector (${typeof connector})`,
    );
  } else if (connector === walletConnectConnection.connector) {
    await connector.activate(chainId);
  } else {
    const info = getChainInfo(chainId);
    const addChainParameter = {
      chainId,
      chainName: info.label,
      rpcUrls: [getRpcUrl(chainId)],
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer],
    };
    await connector.activate(addChainParameter);
  }
};
