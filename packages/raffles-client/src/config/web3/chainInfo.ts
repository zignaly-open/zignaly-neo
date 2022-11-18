import ETHEREUM_LOGO_URL from 'assets/icons/ethereum-logo.png';
import POLYGON_LOGO_URL from 'assets/icons/polygon-logo.svg';
import BINANCE_LOGO_URL from 'assets/icons/chains/bnb.svg';
import { DEFAULT_CHAIN_ID, SupportedChainId } from './chain';

interface BaseChainInfo {
  readonly explorer: string;
  readonly logoUrl: string;
  readonly circleLogoUrl?: string;
  readonly label: string;
  readonly nativeCurrency: {
    name: string; // e.g. 'Goerli ETH',
    symbol: string; // e.g. 'gorETH',
    decimals: number; // e.g. 18,
  };
  readonly isTestNet?: boolean;
}

export type ChainInfoMap = {
  readonly [chainId in SupportedChainId]: BaseChainInfo;
};

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.POLYGON]: {
    explorer: 'https://polygonscan.com/',
    label: 'Polygon',
    logoUrl: POLYGON_LOGO_URL,
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
  },
  [SupportedChainId.MUMBAI]: {
    explorer: 'https://mumbai.polygonscan.com/',
    label: 'Polygon Mumbai',
    logoUrl: POLYGON_LOGO_URL,
    nativeCurrency: {
      name: 'Polygon Mumbai Matic',
      symbol: 'mMATIC',
      decimals: 18,
    },
    isTestNet: true,
  },
  [SupportedChainId.ETHEREUM]: {
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    logoUrl: ETHEREUM_LOGO_URL,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    explorer: 'https://goerli.etherscan.io/',
    label: 'Görli',
    logoUrl: ETHEREUM_LOGO_URL,
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
    isTestNet: true,
  },
  [SupportedChainId.BINANCE]: {
    explorer: 'https://bscscan.com',
    label: 'BNB Smart Chain',
    logoUrl: BINANCE_LOGO_URL,
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
  },
};

export const getChainInfo = (
  chainId: SupportedChainId | undefined,
): BaseChainInfo => {
  return CHAIN_INFO[chainId ?? DEFAULT_CHAIN_ID];
};
