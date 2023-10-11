import { Features, WhitelabelOverride } from '../type';

export default {
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.Trader]: false,
    [Features.NewSignup]: false,
  },
  endpointOverrides: {
    'marketplace/': 'market',
  },
  translationOverrides: true,
  xSource: 'criptomaniacos',
} as WhitelabelOverride;
