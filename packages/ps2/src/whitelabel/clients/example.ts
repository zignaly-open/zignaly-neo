import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

export default {
  disabledFeatures: [
    Features.Referrals,
    Features.Rewards,
    Features.Trader,
    Features.ZigWallet,
    Features.NewSignup,
  ],
  endpointOverrides: {
    'marketplace/': 'market',
  },
  mainAppLink: ROUTE_DASHBOARD,
  // I do not give 1 fcuk that this image is 500kb because we do not load it
  logo: '/images/whitelabel/doge.png',
  background: '#fcdcdc',
  backgroundImage: null,
  // theme: 'ugly',
  fontFamilySrc: {
    '400': '/fonts/AmaticSC/AmaticSC-Regular.ttf',
    '700': '/fonts/AmaticSC/AmaticSC-Bold.ttf',
  },
} as WhitelabelOverride;
