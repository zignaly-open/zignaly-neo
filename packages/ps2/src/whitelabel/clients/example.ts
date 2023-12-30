import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

export default {
  title: 'Example',
  helpUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.Trader]: false,
    [Features.NewSignup]: false,
    [Features.Kyc]: true,
    [Features.Subscriptions]: true,
  },
  endpointOverrides: {},
  mainAppLink: ROUTE_DASHBOARD,
  logo: '/images/whitelabel/qauntwise.svg',
  subscriptionPurchaseLink: 'http://shop.quantwise.ai/',
  // background: '#fcdcdc',
  // backgroundImage: null,
  translationOverrides: true,
  loadFontsFromGoogle: true,
  defaultSuccessFee: 5,
} as WhitelabelOverride;
