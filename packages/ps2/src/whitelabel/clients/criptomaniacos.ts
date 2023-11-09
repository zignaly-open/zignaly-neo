// TODO: fix this, smth weird with type defs not loading
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { isWebpSupported } from 'react-image-webp/dist/utils';
import { Features, WhitelabelOverride } from '../type';
import { ROUTE_DASHBOARD } from '../../routes';

export default {
  title: 'Lastra',
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
  translationOverrides: true,
  xSource: 'criptomaniacos',
  mainAppLink: ROUTE_DASHBOARD,
  background: '#1A1A1A',
  backgroundImage: `/background-dark.${isWebpSupported() ? 'webp' : 'png'}`,
  logo: '/images/whitelabel/lastra/logo-horizontal2.png',
  social: {
    twitter: 'https://cmania.co/zig-xtwitter',
    telegram: 'https://cmania.co/zig-tg',
    instagram: 'https://cmania.co/zig-ig',
    youtube: 'https://cmania.co/zig-yt',
    linkedin: 'https://cmania.co/zig-linkedin',
  },
} as WhitelabelOverride;
