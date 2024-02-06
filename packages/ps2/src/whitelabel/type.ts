import { ThemeOverridesType } from '@zignaly-open/ui';

export enum Features {
  AccessLevels = 'accessLevels',
  Rewards = 'rewards',
  Referrals = 'referrals',
  CreateService = 'createServices',
  NewSignup = 'newSignup',
  LoginOnlyAccess = 'loginOnly',
  EmailVerification = 'emailVerification',
  Subscriptions = 'subscriptions',
  Kyc = 'kyc',
  ZScore = 'zscore',
}

interface TranslationOverrides {
  [x: string]: string | TranslationOverrides;
}

export type WhitelabelOverride = {
  name: string;
  title: string;
  domain: string;
  description?: string;
  locales?: string[];
  translationOverrides?: TranslationOverrides;
  minInvestment?: Partial<
    Record<'USDT' | 'ETH' | 'BTC' | 'USDC' | 'BNB', number>
  >;
  featureOverrides?: Partial<Record<Features, boolean>>;
  slug?: string;
  logo?: string;
  links?: {
    tos?: string;
    helpUrl?: string;
    mainAppLink?: string;
    privacyPolicy?: string;
    subscriptionPurchaseLink?: string;
  };
  background?: string;
  backgroundImage?: string | null;
  baseTheme?: string;
  themeOverrides?: ThemeOverridesType;
  tools?: {
    twitter_tracker?: string;
    intercom?: string;
    google_tag_manager?: string;
  };
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
  zignalySuccessFee?: number;
};
