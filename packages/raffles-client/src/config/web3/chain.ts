export enum SupportedChainId {
  POLYGON = 137,
  MUMBAI = 80001,
  ETHEREUM = 1,
  GOERLI = 5,
  BINANCE = 56,
}

export const DEFAULT_CHAIN_ID =
  process.env.REACT_APP_ENV === 'production'
    ? SupportedChainId.POLYGON
    : SupportedChainId.MUMBAI;

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.POLYGON]: 'Polygon',
  [SupportedChainId.MUMBAI]: 'Polygon Mumbai',
  [SupportedChainId.ETHEREUM]: 'Ethereum',
  [SupportedChainId.GOERLI]: 'Goerli',
  [SupportedChainId.BINANCE]: 'Binance Smart Chain',
};

export const MAIN_NET_CHAIN_IDS = [
  SupportedChainId.POLYGON,
  SupportedChainId.ETHEREUM,
  SupportedChainId.BINANCE,
];

export const TEST_NET_CHAIN_IDS = [
  SupportedChainId.MUMBAI,
  SupportedChainId.GOERLI,
];

export function isSupportedChain(
  chainId: number | null | undefined,
): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId];
}
