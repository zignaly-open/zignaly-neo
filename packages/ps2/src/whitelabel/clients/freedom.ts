import { Features, WhitelabelOverride } from '../type';

export default {
  title: 'OBSIDIAN FREEDOM',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.Trader]: false,
    [Features.NewSignup]: false,
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
  xSource: 'freedom',
  logo: '/images/whitelabel/freedom/obsidian-logo-smaller.png',
  social: {},
} as WhitelabelOverride;
