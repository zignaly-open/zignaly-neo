import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

export default {
  title: 'Example',
  helpUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.CreateService]: false,
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
  defaultSuccessFee: 5,
} as WhitelabelOverride;
