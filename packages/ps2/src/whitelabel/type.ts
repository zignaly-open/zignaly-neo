import { ThemeOverridesType } from '@zignaly-open/ui';

export enum Features {
  AccessLevels = 'accessLevels',
  Rewards = 'rewards',
  Referrals = 'referrals',
  CreateService = 'createServices',
  NewSignup = 'newSignup',
  Subscriptions = 'subscriptions',
  Kyc = 'kyc',
}

// yes, the trailing slash IS important
export type OverrideableEndpoints = 'marketplace/';

interface TranslationOverrides {
  [x: string]: string | TranslationOverrides;
}

export type WhitelabelOverride = {
  id: string;
  title: string;
  helpUrl: string;
  locales?: string[];
  endpointOverrides?: Record<OverrideableEndpoints, string>;
  translationOverrides?: TranslationOverrides;
  minInvestment?: Partial<
    Record<'USDT' | 'ETH' | 'BTC' | 'USDC' | 'BNB', number>
  >;
  settings: Partial<Record<Features, boolean>>;
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
