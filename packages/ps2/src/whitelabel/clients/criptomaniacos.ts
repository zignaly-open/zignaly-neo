import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

export default {
  title: 'Criptomaniacos',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.Trader]: false,
    [Features.NewSignup]: false,
  },
  endpointOverrides: {
    'marketplace/': 'market',
  },
  translationOverrides: true,
  xSource: 'criptomaniacos',
  mainAppLink: ROUTE_DASHBOARD,
  logo: '/images/whitelabel/criptomaniacos/logo-horizontal.svg',
  social: {
    twitter: 'https://cmania.co/zig-xtwitter',
    telegram: 'https://cmania.co/zig-tg',
    instagram: 'https://cmania.co/zig-ig',
    youtube: 'https://cmania.co/zig-yt',
    linkedin: 'https://cmania.co/zig-linkedin',
  },
} as WhitelabelOverride;
