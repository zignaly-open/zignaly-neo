export enum Features {
  Rewards,
  Referrals,
  Trader,
  NewSignup,
}

// yes, the trailing slash IS important
export type OverrideableEndpoints = 'marketplace/';

export type WhitelabelOverride = {
  promptMobile?: boolean;
  endpointOverrides?: Record<OverrideableEndpoints, string>;
  disabledFeatures: Features[];
  xSource?: string;
};
