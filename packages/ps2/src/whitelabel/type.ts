import { ThemeOverridesType } from '@zignaly-open/ui';

export enum Features {
  AccessLevels,
  Rewards,
  Referrals,
  CreateService,
  HideSignup,
  NewSignup,
  NoPublicMarketplace,
  Subscriptions,
  Kyc,
}

// yes, the trailing slash IS important
export type OverrideableEndpoints = 'marketplace/';

interface TranslationOverrides {
  [x: string]: string | TranslationOverrides;
}

export type WhitelabelOverride = {
  title: string;
  helpUrl?: string;
  locales?: string[];
  endpointOverrides?: Record<OverrideableEndpoints, string>;
  translationOverrides?: TranslationOverrides;
  minInvestment?: Partial<
    Record<'USDT' | 'ETH' | 'BTC' | 'USDC' | 'BNB', number>
  >;
  featureOverrides: Partial<Record<Features, boolean>>;
  xSource?: string;
  subscriptionPurchaseLink?: string;
  mainAppLink?: string;
  logo?: string;
  links?: {
    tos?: string;
    privacyPolicy?: string;
  };
  background?: string;
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
