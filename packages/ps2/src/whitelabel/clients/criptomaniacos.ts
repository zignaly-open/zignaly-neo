import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

export default {
  title: 'Criptomaniacos',
  helpUrl: 'https://cmania.co/suporte-zig',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.Trader]: false,
    [Features.NewSignup]: false,
  },
  locales: ['en', 'pt'],
  endpointOverrides: {
    'marketplace/': 'market',
  },
  minInvestment: {
    USDT: 2,
    ETH: 0.0001,
    BTC: 0.0001,
    BNB: 0.0001,
    USDC: 2,
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
