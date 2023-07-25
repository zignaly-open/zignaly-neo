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
  // I do not give 1 fcuk that this image is 500kb because we do not load it
  logo: '/images/whitelabel/doge.png',
  // background: '#fcdcdc',
  // backgroundImage: null,
  // theme: 'example',
  loadFontsFromGoogle: true,
} as WhitelabelOverride;
