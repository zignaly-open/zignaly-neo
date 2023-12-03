import { WhitelabelOverride } from '../type';

export default {
  title: 'Zignaly',
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
  scripts: `
    <script>
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
    },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
    twq('config','og0cu');
    </script>
  `,
  defaultSuccessFee: 5,
  intercomId: 'nc3z6oqm',
} as WhitelabelOverride;
