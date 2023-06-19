import { Features, WhitelabelOverride } from '../type';

export default {
  disabledFeatures: [
    Features.Referrals,
    Features.Rewards,
    Features.Trader,
    Features.ZigWallet,
    Features.NewSignup,
  ],
  xSource: 'cryptomaniacos',
} as WhitelabelOverride;
