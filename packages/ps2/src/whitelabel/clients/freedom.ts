import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

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
  translationOverrides: false,
  xSource: 'freedom',
  mainAppLink: ROUTE_DASHBOARD,
  logo: '/images/whitelabel/freedom/obsidian-logo-smaller.png',
  social: {},
} as WhitelabelOverride;
