import { Features, WhitelabelOverride } from '../type';

export default {
  title: 'Zigbids',
  id: 'example',
  helpUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.CreateService]: false,
    [Features.NewSignup]: false,
    [Features.Kyc]: true,
    [Features.Subscriptions]: true,
  },
  translationOverrides: true,
  endpointOverrides: {
    'marketplace/': 'market',
  },
  logo: '/images/whitelabel/qauntwise.svg',
  subscriptionPurchaseLink: 'http://shop.quantwise.ai/',
  // background: '#fcdcdc',
  // backgroundImage: null,
  loadFontsFromGoogle: true,
  defaultSuccessFee: 5,
} as WhitelabelOverride;
