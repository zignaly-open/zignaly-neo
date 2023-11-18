import { Features, WhitelabelOverride } from '../type';

export default {
  id: 'freedom',
  title: 'OBSIDIAN FREEDOM',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.Trader]: false,
    [Features.NewSignup]: false,
  },
  locales: ['en', 'pt', 'es'],
  endpointOverrides: {
    'marketplace/': 'market',
  },
  minInvestment: {
    USDT: 2,
    ETH: 0.0001,
    BTC: 0.0001,
    BNB: 0.0001,
    USDC: 0.0001,
  },
  xSource: 'freedom',
  logo: '/images/whitelabel/freedom/obsidian-logo-smaller.png',
  social: {},
  headContent: `
    <title>Obsidian Freedom</title>
    <link rel="shortcut icon" type="image/png" sizes="16x16" href="/images/whitelabel/freedom/favicon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/whitelabel/freedom/favicon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/whitelabel/freedom/favicon.png">
    <link rel="manifest" href="/manifests/freedom.json"/>
    
    <meta name="msapplication-TileColor" content="#603cba">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="Dive into Obsidian Freedom, an invite-only group dedicated to empowering individuals with a passion for impact. Here, we lay the foundation for distributing freedom to those driven by purpose.">

    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://freedom.wl.zignaly.com/profit-sharing">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Obsidian Freedom: Exclusive Club for Purpose-Driven Change-Makers">
    <meta property="og:description" content="Dive into Obsidian Freedom, an invite-only group dedicated to empowering individuals with a passion for impact. Here, we lay the foundation for distributing freedom to those driven by purpose.">
    <meta property="og:image" content="https://freedom.wl.zignaly.com/images/whitelabel/freedom/banner.png">
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:image:alt" content="freedom.wl.zignaly.com"/>

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="freedom.wl.zignaly.com">
    <meta property="twitter:url" content="https://freedom.wl.zignaly.com/profit-sharing">
    <meta name="twitter:title" content="Obsidian Freedom: Exclusive Club for Purpose-Driven Change-Makers">
    <meta name="twitter:description" content="Dive into Obsidian Freedom, an invite-only group dedicated to empowering individuals with a passion for impact. Here, we lay the foundation for distributing freedom to those driven by purpose.">
    <meta name="twitter:image" content="https://freedom.wl.zignaly.com/images/whitelabel/freedom/banner.png">
  `,
} as WhitelabelOverride;
