export enum Features {
  Rewards,
  Referrals,
  Trader,
  ZigWallet,
  NewSignup,
}

export type WhitelabelOverride = {
  promptMobile?: boolean;
  disabledFeatures: Features[];
  xSource?: string;
};
