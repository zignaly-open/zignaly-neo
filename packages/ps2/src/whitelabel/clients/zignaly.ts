import { WhitelabelOverride } from '../type';

export default {
  title: 'Zignaly',
  helpUrl: 'https://help.zignaly.com/hc/en-us',
  social: {
    twitter: 'https://twitter.com/zignaly',
    telegram: 'https://t.me/ZignalyHQ',
    discord: 'https://discord.gg/9H6cEa9uRN',
    medium: 'https://medium.com/zignaly',
    linkedin: 'https://www.linkedin.com/company/zignaly/',
  },
  headContent: `
    <title>Zignaly</title>
    <link rel="shortcut icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" href="/logo192.png"/>
    <meta name="msapplication-TileColor" content="#603cba">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="theme-color" content="#ffffff">
    
    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://app.zignaly.com/profit-sharing">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Discover the best traders on Zignaly">
    <meta property="og:description" content="Discover the best traders available to invest through Zignaly's Profit Sharing">
    <meta property="og:image" content="https://app.zignaly.com/images/zignaly-social.png">
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:image:alt" content="zignaly.com"/>

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="zignaly.com">
    <meta property="twitter:url" content="https://app.zignaly.com/profit-sharing">
    <meta name="twitter:title" content="Discover the best traders on Zignaly">
    <meta name="twitter:description" content="Discover the best traders available to invest through Zignaly's Profit Sharing">
    <meta name="twitter:image" content="https://app.zignaly.com/images/zignaly-social.png">
    <meta name="twitter:site" content="@zignaly">
  `,
} as WhitelabelOverride;
