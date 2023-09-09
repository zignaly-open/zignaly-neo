import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

export default {
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.Trader]: false,
    [Features.NewSignup]: false,
    [Features.Kyc]: true,
    [Features.Subscriptions]: true,
  },
  endpointOverrides: {
    'marketplace/': 'market',
  },
  mainAppLink: ROUTE_DASHBOARD,
  logo: '/images/whitelabel/qauntwise.svg',
  subscriptionPurchaseLink: 'http://shop.quantwise.ai/',
  // background: '#fcdcdc',
  // backgroundImage: null,
  // theme: 'example',
  loadFontsFromGoogle: true,
} as WhitelabelOverride;
