import { WhitelabelOverride } from '../type';

export default {
  title: 'Zignaly',
  name: 'Zignaly',
  domain: 'app.zignaly.com',
  social: {
    twitter: 'https://twitter.com/zignaly',
    telegram: 'https://t.me/ZignalyHQ',
    discord: 'https://discord.gg/9H6cEa9uRN',
    medium: 'https://medium.com/zignaly',
    linkedin: 'https://www.linkedin.com/company/zignaly/',
  },
  links: {
    helpUrl: 'https://help.zignaly.com/hc/en-us',
  },
  mainAppLink: 'https://zignaly.com',
  headContent: `
    <title>Zignaly</title>
    <link rel="shortcut icon" type="image/png" sizes="16x16" href="/images/whitelabel/zignaly/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/whitelabel/zignaly/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/whitelabel/zignaly/favicon-16x16.png">
    <link rel="apple-touch-icon" href="/images/whitelabel/zignaly/logo192.png"/>
    <link rel="manifest" href="/manifests/zignaly.json"/>
    
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
  zignalySuccessFee: 5,
  tools: {
    twitter_tracker: 'og0cu',
    intercom: 'nc3z6oqm',
    google_tag_manager: 'GTM-5ZQ4JLK',
  },
} as WhitelabelOverride;
