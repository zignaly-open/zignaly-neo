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
  const { title } = wlConfig;
  return JSON.stringify({
    short_name: title,
    name: title,
    icons: [
      {
        src: 'favicon.ico',
        sizes: '32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      // TODO
      {
        src: '/images/whitelabel/zignaly/logo64.png',
        type: 'image/png',
        sizes: '64x64',
      },
      {
        src: '/images/whitelabel/zignaly/logo192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/images/whitelabel/zignaly/logo512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    start_url: '/',
    display: 'standalone',
    theme_color: '#7682F7',
    background_color: '#080810',
  });
}

export function generateIndexHtml(wlConfig: WhitelabelFrontendConfig) {
  const [title, domain, description] = [
    wlConfig.title,
    wlConfig.domain,
    wlConfig.description,
  ].map(veryDumbSanitizeAttribute);
  const twitterAcc =
    wlConfig.social?.twitter &&
    wlConfig.social?.twitter.match(
      /(?:https?:\/\/|^)(?:twitter|x)\.com\/([a-zA-Z\d-_]{1,15})/,
    )?.[1];

  return indexHtml.replace(
    '</head>',
    `
      <title>${title}</title>
<!--      <link rel="shortcut icon" type="image/png" sizes="16x16" href="/images/whitelabel/zignaly/favicon-16x16.png">     -->
<!--      <link rel="icon" type="image/png" sizes="32x32" href="/images/whitelabel/zignaly/favicon-32x32.png">-->
<!--      <link rel="icon" type="image/png" sizes="16x16" href="/images/whitelabel/zignaly/favicon-16x16.png">-->
<!--      <link rel="apple-touch-icon" href="/images/whitelabel/zignaly/logo192.png"/>-->
      <link rel="manifest" href="/manifest.json"/>
      
      <!-- Facebook Meta Tags -->
      <meta property="og:url" content="https://${domain}/profit-sharing">
      <meta property="og:type" content="website">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
<!--      <meta property="og:image" content="https://app.zignaly.com/images/zignaly-social.png">-->
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta property="og:image:alt" content="${domain}"/>
      
      <!-- Twitter Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta property="twitter:domain" content="${domain}">
      <meta property="twitter:url" content="https://${domain}/profit-sharing">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
<!--      <meta name="twitter:image" content="https://app.zignaly.com/images/zignaly-social.png">-->
      ${twitterAcc ? `<meta name="twitter:site" content="@${twitterAcc}">` : ''}
      <script type="text/javascript">
      window.__zignalyWhitelabelConfig = JSON.parse(decodeURIComponent('${encodeURIComponent(
        JSON.stringify(wlConfig),
      )}'));
      </script>
      </head>`,
  );
}
