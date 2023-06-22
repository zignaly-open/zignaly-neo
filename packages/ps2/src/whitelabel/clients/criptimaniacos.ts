import { Features, WhitelabelOverride } from '../type';

export default {
  defaultLanguage: 'pt',
  disabledFeatures: [
    Features.Referrals,
    Features.Rewards,
    Features.Trader,
    Features.ZigWallet,
    Features.NewSignup,
  ],
  endpointOverrides: {
    'marketplace/': 'market',
  },
  xSource: 'criptomaniacos',
} as WhitelabelOverride;
