import { Features, WhitelabelOverride } from '../type';

export default {
  slug: 'z01',
  baseApi: process.env.REACT_APP_BASE_API,
  baseReferralApi: process.env.REACT_APP_REFERRALS_API,
  name: 'Zignaly',
  domain: 'app.zignaly.com',
  zignalySuccessFee: 5,
  title: 'Discover the best traders on Zignaly',
  description:
    "Discover the best traders available to invest through Zignaly's Profit Sharing",
  social: {
    medium: 'https://medium.com/zignaly',
    discord: 'https://discord.com/invite/9H6cEa9uRN',
    twitter: 'https://twitter.com/zignaly',
    linkedin: 'https://www.linkedin.com/company/zignaly',
    telegram: 'https://t.me/ZignalyHQ',
  },
  supportHelpCenter: 'https://help.zignaly.com/en/',
  tools: {
    intercom: 'nc3z6oqm',
    twitter_tracker: 'og0cu',
    google_tag_manager: 'GTM-5ZQ4JLK',
  },
  minInvestment: { BNB: 0, BTC: 0, ETH: 0, BUSD: 0, USDT: 0 },
  marketplaceMinScore: 0,
  locales: ['en', 'es', 'tr', 'ru'],
  logo: 'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/30c2f30a-5bea-43f9-63c8-29506dfab200/public',
  favicon:
    'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/a482eb98-06a3-423a-cf4c-e5c201c70e00/public',
  imageDeliveryImages: {
    logo: 'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/30c2f30a-5bea-43f9-63c8-29506dfab200',
    favicon:
      'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/a482eb98-06a3-423a-cf4c-e5c201c70e00',
    banner:
      'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/6999ba83-dad6-4bd1-0f68-49eee45a6d00',
  },
  baseTheme: 'dark',
  featureOverrides: {
    [Features.Referrals]: true,
    [Features.Rewards]: true,
    [Features.CreateService]: true,
    [Features.NewSignup]: true,
    [Features.LoginOnlyAccess]: false,
    [Features.Kyc]: false,
    [Features.ZScore]: true,
    [Features.AccessLevels]: true,
    [Features.Subscriptions]: false,
  },
  translationOverrides: null,
  links: {
    tos: 'https://zignaly.com/legal/terms',
    privacyPolicy: 'https://zignaly.com/legal/privacy',
    mainAppLink: 'https://zignaly.com',
    helpUrl: 'https://help.zignaly.com/en/',
    subscriptionPurchaseLink: null,
  },
} as WhitelabelOverride;
