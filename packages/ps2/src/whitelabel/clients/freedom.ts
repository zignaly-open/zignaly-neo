import { Features, WhitelabelOverride } from '../type';

export default {
  slug: 'freedom',
  name: 'Obsidian Freedom',
  baseApi: process.env.REACT_APP_BASE_API,
  baseReferralApi: process.env.REACT_APP_REFERRALS_API,
  domain: 'freedom.obsidiangroup.io',
  zignalySuccessFee: 10,
  title: 'Obsidian Freedom: Exclusive Club for Purpose-Driven Change-Makers',
  description:
    'Dive into Obsidian Freedom, an invite-only group dedicated to empowering individuals with al spassion for impact. Here, we lay the foundation for distributing freedom to those driven by purpose.',
  social: [],
  supportHelpCenter: null,
  tools: null,
  minInvestment: {
    BNB: 0.0001,
    BTC: 0.0001,
    ETH: 0.0001,
    BUSD: 0.0001,
    USDT: 2,
  },
  marketplaceMinScore: 0,
  locales: ['en', 'pt', 'es'],
  logo: 'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/9850d959-b17c-4396-983f-fe3fc1690800/public',
  favicon:
    'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/84f23e53-92e2-4d29-1f7c-948a44c30b00/public',
  imageDeliveryImages: {
    logo: 'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/9850d959-b17c-4396-983f-fe3fc1690800',
    favicon:
      'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/84f23e53-92e2-4d29-1f7c-948a44c30b00',
    banner:
      'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/ecf1f17d-d377-4dae-e068-5a1ac481f400',
  },
  baseTheme: 'dark',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.CreateService]: false,
    [Features.NewSignup]: false,
    [Features.LoginOnlyAccess]: true,
    [Features.ZScore]: false,
  },
  translationOverrides: {
    en: { marketplace: { 'invest-in-services-explainer': '' } },
    pt: { marketplace: { 'invest-in-services-explainer': '' } },
    es: { marketplace: { 'invest-in-services-explainer': '' } },
  },
  links: {
    tos: null,
    privacyPolicy: null,
    mainAppLink: null,
    helpUrl: null,
    subscriptionPurchaseLink: null,
  },
} as WhitelabelOverride;
