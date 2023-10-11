export enum Features {
  AccessLevels,
  Rewards,
  Referrals,
  Trader,
  NewSignup,
  Subscriptions,
  Kyc,
}

// yes, the trailing slash IS important
export type OverrideableEndpoints = 'marketplace/';

export type WhitelabelOverride = {
  promptMobile?: boolean;
  endpointOverrides?: Record<OverrideableEndpoints, string>;
  translationOverrides?: boolean;
  featureOverrides: Record<Partial<Features>, boolean>;
  xSource?: string;
  subscriptionPurchaseLink?: string;
  mainAppLink?: string;
  logo?: string;
  background?: string;
  loadFontsFromGoogle?: boolean;
  backgroundImage?: string | null;
  theme: string;
};
