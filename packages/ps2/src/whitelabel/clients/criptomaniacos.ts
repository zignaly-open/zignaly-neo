import { Features, WhitelabelOverride } from '../type';

/*
export default {
  title: 'Lastra',
  name: 'Lastra',
  domain: 'lastra.zignaly.com',
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.Rewards]: false,
    [Features.CreateService]: false,
    [Features.NewSignup]: false,
    [Features.ZScore]: false,
  },
  locales: ['en', 'pt'],
  links: {
    tos: 'https://www.lastra.app/termos',
    privacyPolicy: 'https://www.lastra.app/politica-privacidade/',
    helpUrl:
      'https://api.whatsapp.com/send/?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20o%20time%20de%20atendimento.&phone=554888387787',
  },
  translationOverrides: {
    en: {
      common: {
        'navigation-menu': {
          'profit-sharing': 'Explore the best investment strategies',
        },
        'main-menu': {
          'dropdown-link-helpDocs': 'Support',
        },
      },
      marketplace: {
        'invest-in-services': 'Invest in the best strategies',
        'invest-in-services-explainer':
          'Discover the new investment model from Lastra, where you only pay when you make profit and need $1 to start.',
      },
    },
    pt: {
      common: {
        'navigation-menu': {
          'profit-sharing': 'Procurar Carteira',
        },
        'main-menu': {
          'dropdown-link-helpDocs': 'Suporte',
        },
      },
      marketplace: {
        'invest-in-services': 'Invista nas Melhores Estratégias',
        'invest-in-services-explainer':
          'Conheça as carteiras da Lastra, em novo formato que você paga somente quando lucra! Comece hoje com apenas $1!',
      },
    },
  },
  slug: 'criptomaniacos',
  background: '#0D0E0E',
  backgroundImage: null,
  logo: '/images/whitelabel/lastra/logo-horizontal.png',
  manifest: '/whitelabel/lastra.json',
  social: {
    twitter: 'https://cmania.co/zig-xtwitter',
    telegram: 'https://cmania.co/zig-tg',
    instagram: 'https://cmania.co/zig-ig',
    youtube: 'https://cmania.co/zig-yt',
    linkedin: 'https://cmania.co/zig-linkedin',
  },
  zignalySuccessFee: 10,
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
    
    <link rel="manifest" href="/manifests/lastra.json"/>
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
  tools: {
    google_tag_manager: 'GTM-5JS4ZRXZ',
  },
} as WhitelabelOverride;
*/

export default {
  slug: 'criptomaniacos',
  name: 'Lastra',
  domain: 'use.lastra.app',
  zignalySuccessFee: 10,
  title: 'Lastra - Your last Crypto app',
  description: 'A global platform to invest in winning crypto portfolios.',
  social: {
    twitter: 'https://cmania.co/zig-xtwitter',
    youtube: 'https://cmania.co/zig-yt',
    linkedin: 'https://cmania.co/zig-linkedin',
    telegram: 'https://cmania.co/zig-tg',
    instagram: 'https://cmania.co/zig-ig',
  },
  supportHelpCenter:
    'https://api.whatsapp.com/send/?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20o%20time%20de%20atendimento.&phone=554888387787',
  tools: {
    google_tag_manager: 'GTM-5JS4ZRXZ',
  },
  minInvestment: {
    BNB: 0,
    BTC: 0,
    ETH: 0,
    BUSD: 0,
    USDT: 0,
  },
  marketplaceMinScore: 0,
  locales: ['en', 'pt'],
  logo: 'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/225397a6-b05c-42c2-69f3-ca46141f5d00/public',
  favicon:
    'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/423b16d8-3abe-4813-bc80-7cabf4fa8600/public',
  imageDeliveryImages: {
    logo: 'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/225397a6-b05c-42c2-69f3-ca46141f5d00',
    favicon:
      'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/423b16d8-3abe-4813-bc80-7cabf4fa8600',
    banner:
      'https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/7b4644c8-b06c-4698-f196-865302f51400',
  },
  baseTheme: 'dark',
  themeOverrides: {
    chart: {
      green: '#1298C9',
      greenCard: [
        'rgba(16, 33, 33, 0.68)',
        'rgba(0, 45, 20, 0.44)',
        'rgba(7, 47, 30, 0.44)',
        'rgba(56, 235, 170, 0.69)',
      ],
      greenGradient: ['rgba(18, 33, 59, 0.52)', 'rgba(33, 70, 78, 0.69)'],
      greenMiniGradient: [
        'rgba(17, 27, 47, 0)',
        'rgba(22, 41, 67, 0.5)',
        'rgba(39, 110, 117, 1)',
      ],
    },
    palette: {
      links: '#1298C9',
      secondary: '#515AAC',
      neutral175: '#6aaac2',
      neutral500: '#4A4958',
      neutral600: '#353337',
      neutral700: '#252329',
      neutral750: '#1b1b1b',
      neutral800: '#121512',
      neutral900: '#090909',
      highlighted: '#1298C9',
    },
    boxShadows: {
      tableHeader: 'rgba(0,0,0,.5)',
    },
    fontFamily: ['DM Sans', 'Helvetica', 'Arial', 'sans-serif'],
    backgrounds: {
      input:
        'linear-gradient(90deg, rgb(16 18 18) 0%, rgb(16 18 17) 35%, rgb(16 18 17) 100%)',
      modal: '#161717',
      header: '#161717',
      input2fa: '#0f1124',
      tableRow: '#171A1B',
      activeTab: '#181B2F',
      tableHeader: '#161717',
      buttonPrimary:
        'linear-gradient(108deg, #FF9EF9 -6.8%, #6A00FF 37.46%, #13BFFF 93.24%)',
      investorsIcon: '#757581',
      selectInputFill: '#171A1B',
      dropdown2ndLevel: 'rgb(25, 26, 28)',
      input2faGradient: 'linear-gradient(101deg, #3f3bb1 7%, #138ea0 94%)',
      headerMenuItemHover: '#6A00FF',
      secondaryBackground: '#121212',
      withdrawalHighlight: '#161717',
      input2faGradientBorder:
        'linear-gradient(101deg, #3f3bb1 7%, #138ea0 94%)',
      manageServiceMenuHover: '#1f1f1f',
      body: '#0D0E0E',
    },
    fontFamilyH1H6: [
      'Roboto Condensed',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ],
  },
  featureOverrides: {
    [Features.Referrals]: false,
    [Features.CreateService]: false,
    [Features.AccessLevels]: false,
    [Features.Rewards]: false,
    [Features.NewSignup]: false,
    [Features.Subscriptions]: false,
    [Features.Kyc]: false,
    [Features.LoginOnlyAccess]: false,
  },
  translationOverrides: {
    en: {
      common: {
        'navigation-menu': {
          'profit-sharing': 'Explore the best investment strategies',
        },
        'main-menu': {
          'dropdown-link-helpDocs': 'Support',
        },
      },
      marketplace: {
        'invest-in-services': 'Invest in the best strategies',
        'invest-in-services-explainer':
          'Discover the new investment model from Lastra, where you only pay when you make profit and need $1 to start.',
      },
    },
    pt: {
      common: {
        'navigation-menu': {
          'profit-sharing': 'Procurar Carteira',
        },
        'main-menu': {
          'dropdown-link-helpDocs': 'Suporte',
        },
      },
      marketplace: {
        'invest-in-services': 'Invista nas Melhores Estratégias',
        'invest-in-services-explainer':
          'Conheça as carteiras da Lastra, em novo formato que você paga somente quando lucra! Comece hoje com apenas $1!',
      },
    },
  },
  links: {
    tos: 'https://www.lastra.app/termos',
    privacyPolicy: 'https://www.lastra.app/politica-privacidade/',
    mainAppLink: 'https://use.lastra.app/my-portfolio',
    helpUrl:
      'https://api.whatsapp.com/send/?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20o%20time%20de%20atendimento.&phone=554888387787',
    subscriptionPurchaseLink: null,
  },
} as WhitelabelOverride;
