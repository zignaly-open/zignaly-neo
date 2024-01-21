import fs from 'fs';
import path from 'path';
import { WhitelabelFrontendConfig } from './config';
import { BUILD_PATH } from './constants';

const indexHtml = fs.readFileSync(path.join(BUILD_PATH, 'index.html'), 'utf8');

if (!indexHtml) {
  console.error('build/index.html is missing, aborting');
  process.exit(1);
}

const veryDumbSanitizeAttribute = (string: string): string =>
  string.replaceAll(/"/g, "'").replaceAll(/[<>]+/g, '');

export function generateManifest(wlConfig: WhitelabelFrontendConfig) {
  const { title, imageDeliveryImages } = wlConfig;
  return JSON.stringify({
    short_name: title,
    name: title,
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
    theme_color: '#7682F7',
    background_color: '#080810',
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

  return indexHtml.replace(
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
