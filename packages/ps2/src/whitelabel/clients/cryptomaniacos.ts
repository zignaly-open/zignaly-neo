import { Features, WhitelabelOverride } from '../type';

export default {
  plainSignup: true,
  disabledFeatures: [
    Features.Referrals,
    Features.Rewards,
    Features.Trader,
    Features.ZigWallet,
  ],
  xSource: 'cryptomaniacos',
} as WhitelabelOverride;
