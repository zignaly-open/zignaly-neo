import { Features, WhitelabelOverride } from '../type';

export default {
  disabledFeatures: [
    Features.Referrals,
    Features.Rewards,
    Features.Trader,
    Features.NewSignup,
  ],
  endpointOverrides: {
    'marketplace/': 'market',
  },
  xSource: 'criptomaniacos',
} as WhitelabelOverride;
