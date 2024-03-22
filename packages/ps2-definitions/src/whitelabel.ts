import type { ThemeOverridesType } from '@zignaly-open/ui';

export enum Features {
  AccessLevels = 'accessLevels',
  Rewards = 'rewards',
  Referrals = 'referrals',
  MinInvestment = 'minInvestment',
  CreateService = 'createServices',
  NewSignup = 'newSignup',
  EmailVerification = 'emailVerification',
  LoginOnlyAccess = 'loginOnly',
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
  baseApi: string;
  baseReferralApi: string;
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

export type WhitelabelBackendConfig = Pick<
  WhitelabelOverride,
  | 'minInvestment'
  | 'social'
  | 'domain'
  | 'tools'
  | 'slug'
  | 'zignalySuccessFee'
  | 'title'
  | 'description'
> & {
  name: string;
  type: 'lite' | 'heavy'; // this could be wrong but let the future me figure out what is the other type
  settingFee: number;
  monthlyFee: number;
  image: string;
  logo: string;
  favicon: string;
  supportUrl: string;
  supportHelpCenter: string;
  languages: WhitelabelOverride['locales'];
  settings: WhitelabelOverride['featureOverrides'] & { translationOw: boolean };
  mainAppLink?: string;
  tos?: string;
  theme: string;
  themeOverride: {
    background: string;
    backgroundImage: string;
    themeOverrides: ThemeOverridesType;
  };
  privacyPolicy?: string;
  subscriptionPurchaseLink?: string;
  marketplaceMinScore: number;
  emailOrigin: string;
  replyTo: string;
};
