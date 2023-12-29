import { ThemeOverridesType } from '@zignaly-open/ui';

export enum Features {
  AccessLevels = 'accessLevels',
  Rewards = 'rewards',
  Referrals = 'referrals',
  CreateService = 'createServices',
  NewSignup = 'newSignup',
  LoginOnlyAccess = 'loginOnly',
  Subscriptions = 'subscriptions',
  Kyc = 'kyc',
}

interface TranslationOverrides {
  [x: string]: string | TranslationOverrides;
}

export type WhitelabelOverride = {
  title: string;
  domain: string;
  locales?: string[];
  translationOverrides?: TranslationOverrides;
  minInvestment?: Partial<
    Record<'USDT' | 'ETH' | 'BTC' | 'USDC' | 'BNB', number>
  >;
  featureOverrides?: Partial<Record<Features, boolean>>;
  slug?: string;
  logo?: string;
  headContent?: string;
  scripts?: string;
  // meta: {
  //   title: string;
  //   description: string;
  //   logo: string;
  //   banner: string;
  //   favicon: string;
  // };
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
  zignalySuccessFee?: number;
};
