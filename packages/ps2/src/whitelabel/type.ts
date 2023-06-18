export enum Features {
  Rewards,
  Referrals,
  Trader,
  ZigWallet,
}

export type WhitelabelOverride = {
  promptMobile?: boolean;
  plainSignup?: boolean;
  disabledFeatures: Features[];
  xSource?: string;
};
