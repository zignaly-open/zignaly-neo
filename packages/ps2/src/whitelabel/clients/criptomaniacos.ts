import { Features, WhitelabelOverride } from '../type';

export default {
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
  social: {
    twitter: 'https://cmania.co/zig-xtwitter',
    telegram: 'https://cmania.co/zig-tg',
    instagram: 'https://cmania.co/zig-ig',
    youtube: 'https://cmania.co/zig-yt',
    linkedin: 'https://cmania.co/zig-linkedin',
  },
} as WhitelabelOverride;
