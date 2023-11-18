import { Features, WhitelabelOverride } from '../type';

export default {
  id: 'criptomaniacos',
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
  links: {
    tos: 'https://www.lastra.app/termos',
    privacyPolicy: 'https://www.lastra.app/politica-privacidade/',
  },
  translationOverrides: true,
  xSource: 'criptomaniacos',
  background: '#0D0E0E',
  backgroundImage: null,
  logo: '/images/whitelabel/lastra/logo-horizontal.png',
  social: {
    twitter: 'https://cmania.co/zig-xtwitter',
    telegram: 'https://cmania.co/zig-tg',
    instagram: 'https://cmania.co/zig-ig',
    youtube: 'https://cmania.co/zig-yt',
    linkedin: 'https://cmania.co/zig-linkedin',
  },
  loadFontsFromGoogle: true,
  themeOverrides: {
    fontFamily: ['DM Sans', 'Helvetica', 'Arial', 'sans-serif'],
    fontFamilyH1H6: [
      'Roboto Condensed',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ],
    palette: {
      neutral900: '#090909',
      neutral800: '#121512',
      neutral750: '#1b1b1b',
      neutral700: '#252329',
      neutral600: '#353337',
      neutral500: '#4A4958',
      neutral175: '#6aaac2',
      secondary: '#515AAC',
      highlighted: '#1298C9',
      links: '#1298C9',
    },
    boxShadows: {
      tableHeader: 'rgba(0,0,0,.5)',
    },
    backgrounds: {
      header: '#161717',
      tableRow: '#171A1B',
      tableHeader: '#161717',
      buttonPrimary:
        'linear-gradient(108deg, #FF9EF9 -6.8%, #6A00FF 37.46%, #13BFFF 93.24%)',

      dropdown2ndLevel: 'rgb(25, 26, 28)',
      modal: '#161717',
      selectInputFill: '#171A1B',
      investorsIcon: '#757581',
      withdrawalHighlight: '#161717',
      input:
        'linear-gradient(90deg, rgb(16 18 18) 0%, rgb(16 18 17) 35%, rgb(16 18 17) 100%)',

      headerMenuItemHover: '#6A00FF',

      secondaryBackground: '#121212',
      activeTab: '#181B2F',
      manageServiceMenuHover: '#1f1f1f',
      input2fa: '#0f1124',
      input2faGradient: 'linear-gradient(101deg, #3f3bb1 7%, #138ea0 94%)',
      input2faGradientBorder:
        'linear-gradient(101deg, #3f3bb1 7%, #138ea0 94%)',
    },
    chart: {
      green: '#1298C9',
      greenGradient: ['rgba(18, 33, 59, 0.52)', 'rgba(33, 70, 78, 0.69)'],
      greenMiniGradient: [
        'rgba(17, 27, 47, 0)',
        'rgba(22, 41, 67, 0.5)',
        'rgba(39, 110, 117, 1)',
      ],
      greenCard: [
        'rgba(16, 33, 33, 0.68)',
        'rgba(0, 45, 20, 0.44)',
        'rgba(7, 47, 30, 0.44)',
        'rgba(56, 235, 170, 0.69)',
      ],
    },
  },
  headContent: `
    <title>Lastra</title>
    <meta name="description" content="A global platform to invest in winning crypto portfolios.">
    
    <link rel="manifest" href="/whitelabel/lastra.json"/>
    <link rel="shortcut icon" type="image/png" sizes="16x16" href="/images/whitelabel/lastra/logo16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/whitelabel/lastra/logo32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/whitelabel/lastra/logo16.png">
    <link rel="apple-touch-icon" href="/images/whitelabel/lastra/logo192.png"/>
    
    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://lastra.zignaly.com/profit-sharing">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Lastra - Your last Crypto app">
    <meta property="og:description" content="A global platform to invest in winning crypto portfolios.">
    <meta property="og:image" content="https://lastra.zignaly.com/images/whitelabel/lastra/banner630.jpg">
    <meta property="og:image:width" content="1920"/>
    <meta property="og:image:height" content="1080"/>
    <meta property="og:image:alt" content="lastra.zignaly.com"/>

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="lastra.zignaly.com">
    <meta property="twitter:url" content="https://lastra.zignaly.com/profit-sharing">
    <meta name="twitter:title" content="Lastra - Your last Crypto app">
    <meta name="twitter:description" content="A global platform to invest in winning crypto portfolios.">
    <meta name="twitter:image" content="https://lastra.zignaly.com/images/whitelabel/lastra/banner630.jpg">
    <meta name="twitter:site" content="@Criptomaniacos_">
    
  `,
  scripts: `
    !(function (b, t, c) {
      ((c = t.createElement(b)).async = 1),
      (c.src = "https://s.cmania.co/code.js"),
      (b = t.getElementsByTagName(b)[0]).parentNode.insertBefore(c, b);
    })("script", document);
  `,
} as WhitelabelOverride;
