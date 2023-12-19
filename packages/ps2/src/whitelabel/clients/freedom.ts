import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

export default {
  title: 'OBSIDIAN FREEDOM',
  featureOverrides: {
    [Features.Trader]: false,
    [Features.NewSignup]: false,
    [Features.Signup]: false,
    [Features.NoPublicMarketplace]: true,
  },
  locales: ['en', 'pt', 'es'],
  endpointOverrides: {
    'marketplace/': 'market',
  },
  minInvestment: {
    USDT: 2,
    ETH: 0.0001,
    BTC: 0.0001,
    BNB: 0.0001,
    USDC: 0.0001,
  },
  translationOverrides: true,
  xSource: 'freedom',
  mainAppLink: ROUTE_DASHBOARD,
  logo: '/images/whitelabel/freedom/obsidian-logo-smaller.png',
  social: {},
  defaultSuccessFee: 10,
} as WhitelabelOverride;
