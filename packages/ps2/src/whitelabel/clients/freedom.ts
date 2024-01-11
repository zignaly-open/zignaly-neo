import { Features, WhitelabelOverride } from '../type';

export default {
  title: 'OBSIDIAN FREEDOM',
  domain: 'freedom.wl.zignaly.com',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.CreateService]: false,
    [Features.NewSignup]: false,
    [Features.LoginOnlyAccess]: true,
    [Features.ZScore]: false,
  },
  locales: ['en', 'pt', 'es'],
  minInvestment: {
    USDT: 2,
    ETH: 0.0001,
    BTC: 0.0001,
    BNB: 0.0001,
    USDC: 0.0001,
  },
  translationOverrides: {
    en: {
      marketplace: {
        'invest-in-services-explainer': '',
      },
    },
    pt: {
      marketplace: {
        'invest-in-services-explainer': '',
      },
    },
    es: {
      marketplace: {
        'invest-in-services-explainer': '',
      },
    },
  },
  slug: 'freedom',
  logo: '/images/whitelabel/freedom/obsidian-logo-smaller.png',
  social: {},
} as WhitelabelOverride;
