import { WhitelabelFrontendConfig } from './config';
import { INDEX_HTML } from './constants';

const veryDumbSanitizeAttribute = (string: string): string =>
  string.replaceAll(/"/g, "'").replaceAll(/[<>]+/g, '');

export function generateManifest(wlConfig: WhitelabelFrontendConfig) {
  const { title, name, description, imageDeliveryImages } = wlConfig;
  return JSON.stringify({
    short_name: name,
    name: title,
    description,
    icons: imageDeliveryImages
      ? [
          {
            src: `${imageDeliveryImages.favicon}/32x32`,
            sizes: '32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: `${imageDeliveryImages.favicon}/64x64`,
            type: 'image/png',
            sizes: '64x64',
          },
          {
            src: `${imageDeliveryImages.favicon}/192x192`,
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: `${imageDeliveryImages.favicon}/512x512`,
            type: 'image/png',
            sizes: '512x512',
          },
        ]
      : [],
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    dir: 'auto',

    protocol_handlers: [
      {
        protocol: 'web+zignaly',
        url: '/',
      },
    ],

    theme_color: '#101225', // TODO
    background_color: '#101225', // TODO

    // TODO
    // icons: [
    //   {
    //     purpose: 'maskable',
    //     sizes: '512x512',
    //     src: 'icon512_maskable.png',
    //     type: 'image/png',
    //   },
    //   {
    //     purpose: 'any',
    //     sizes: '512x512',
    //     src: 'icon512_rounded.png',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/android-chrome-192x192.png',
    //     sizes: '192x192',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/android-chrome-512x512.png',
    //     sizes: '512x512',
    //     type: 'image/png',
    //   },
    // ],

    // TODO
    // screenshots: [
    //   {
    //     src: '/screenshots/splash.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/screenshots/login.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/screenshots/home.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/screenshots/portfolio.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/screenshots/balances.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/screenshots/marketplace.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/screenshots/profile.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/screenshots/drawer.png',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    // ],

    shortcuts: [
      {
        name: 'Marketplace',
        url: '/profit-sharing',
        description:
          'Invest with our selection of pro traders and pay only a share of your profits. The average investment is $200, but you can start with only $1.',
      },
      {
        name: 'My Portfolio',
        url: '/my-portfolio',
        description: 'Track your investments and see how much you are earning.',
      },
      {
        name: 'My Balances',
        url: '/my-balances',
        description: 'See your balances and deposit or withdraw funds.',
      },
    ],
    display_override: [],
  });
}

export function generateIndexHtml(wlConfig: WhitelabelFrontendConfig) {
  const [title, name, domain, description] = [
    wlConfig.title,
    wlConfig.name,
    wlConfig.domain,
    wlConfig.description,
  ].map(veryDumbSanitizeAttribute);
  const twitterAcc =
    wlConfig.social?.twitter && // because ts
    wlConfig.social?.twitter?.match(
      /(?:https?:\/\/|^)(?:twitter|x)\.com\/([a-zA-Z\d-_]{1,15})/,
    )?.[1];

  return INDEX_HTML.replace(
    '</head>',
    `
      <title>${name}</title>
      ${
        wlConfig.imageDeliveryImages?.favicon
          ? ` 
            <link rel="shortcut icon" type="image/png" sizes="16x16" href="${wlConfig.imageDeliveryImages?.favicon}/16x16">     
            <link rel="icon" type="image/png" sizes="32x32" href="${wlConfig.imageDeliveryImages?.favicon}/32x32">
            <link rel="icon" type="image/png" sizes="16x16" href="${wlConfig.imageDeliveryImages?.favicon}/16x16">
            <link rel="apple-touch-icon" href="${wlConfig.imageDeliveryImages?.favicon}/192x192"/>
          `
          : ''
      }
      <link rel="manifest" href="/manifest.json"/>
        
      <meta name="msapplication-TileColor" content="${
        // TODO
        '#101225'
      }">
      <meta name="theme-color" content="#ffffff">
    
<!--      <link rel="apple-touch-startup-image" href="apple-splash-2048-2732.jpeg"-->
<!--        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1668-2388.jpeg"-->
<!--        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1536-2048.jpeg"-->
<!--        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1668-2224.jpeg"-->
<!--        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1620-2160.jpeg"-->
<!--        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1290-2796.jpeg"-->
<!--        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1179-2556.jpeg"-->
<!--        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1284-2778.jpeg"-->
<!--        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1170-2532.jpeg"-->
<!--        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1125-2436.jpeg"-->
<!--        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1242-2688.jpeg"-->
<!--        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-828-1792.jpeg"-->
<!--        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-1242-2208.jpeg"-->
<!--        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-750-1334.jpeg"-->
<!--        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">-->
<!--      <link rel="apple-touch-startup-image" href="apple-splash-640-1136.jpeg"-->
<!--        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">-->
      
            
      <!-- Facebook Meta Tags -->
      <meta property="og:url" content="https://${domain}/profit-sharing">
      <meta property="og:type" content="website">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      ${
        wlConfig.imageDeliveryImages?.banner
          ? `<meta property="og:image" content="${wlConfig.imageDeliveryImages?.banner}/banner">`
          : ''
      }
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta property="og:image:alt" content="${domain}"/>
      
      <!-- Twitter Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta property="twitter:domain" content="${domain}">
      <meta property="twitter:url" content="https://${domain}/profit-sharing">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
       ${
         wlConfig.imageDeliveryImages?.banner
           ? `<meta name="twitter:image" content="${wlConfig.imageDeliveryImages?.banner}/banner">`
           : ''
       }
      ${twitterAcc ? `<meta name="twitter:site" content="@${twitterAcc}">` : ''}
      <script type="text/javascript">
      window.__zignalyWhitelabelConfig = ${
        // escaping the closing script tags that w absolutely should not have here btw
        JSON.stringify(wlConfig).replace(/<\/script/g, '<"+"/script')
      };
      </script>
      ${
        wlConfig.tools?.twitter_tracker
          ? `
          <script>
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','${wlConfig.tools.twitter_tracker}');
          </script>
      `
          : ''
      }
      </head>`,
  );
}
