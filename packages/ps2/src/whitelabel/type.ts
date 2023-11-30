import { ThemeOverridesType } from '@zignaly-open/ui';

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
  id: string;
  title: string;
  helpUrl: string;
  locales?: string[];
  promptMobile?: boolean;
  endpointOverrides?: Record<OverrideableEndpoints, string>;
  translationOverrides?: boolean;
  minInvestment?: Partial<
    Record<'USDT' | 'ETH' | 'BTC' | 'USDC' | 'BNB', number>
  >;
  featureOverrides: Partial<Record<Features, boolean>>;
  xSource?: string;
  subscriptionPurchaseLink?: string;
  mainAppLink?: string;
  logo?: string;
  headContent?: string;
  scripts?: string;
  links?: {
    tos?: string;
    privacyPolicy?: string;
  };
  background?: string;
  loadFontsFromGoogle?: boolean;
  backgroundImage?: string | null;
  baseTheme?: string;
  themeOverrides?: ThemeOverridesType;
  intercomId?: string;
  social: Partial<
    Record<
      | 'telegram'
      | 'twitter'
      | 'discord'
      | 'medium'
      | 'linkedin'
      | 'instagram'
      | 'youtube',
      string | void
    >
  >;
  defaultSuccessFee?: number;
};
