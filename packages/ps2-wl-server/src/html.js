const fs = require('fs');
const getWhitelabelConfig = require('./config');

const indexHtml = fs.readFileSync(__dirname + '/../build/index.html', 'utf8');

if (!indexHtml) {
  console.error('build/index.html is missing, aborting');
  process.exit(1);
}

const veryDumbSanitize = (string) => string.replaceAll(/[<>"]+/g, '');

function getGeneratedIndexHtml(wlConfig) {
  const [title, domain, description] = [
    wlConfig.title,
    wlConfig.domain,
    wlConfig.description,
  ].map(veryDumbSanitize);

  return indexHtml.replace(
    '</head>',
    `
      <title>{title}</title>
<!--      <link rel="shortcut icon" type="image/png" sizes="16x16" href="/images/whitelabel/zignaly/favicon-16x16.png">     -->
<!--      <link rel="icon" type="image/png" sizes="32x32" href="/images/whitelabel/zignaly/favicon-32x32.png">-->
<!--      <link rel="icon" type="image/png" sizes="16x16" href="/images/whitelabel/zignaly/favicon-16x16.png">-->
<!--      <link rel="apple-touch-icon" href="/images/whitelabel/zignaly/logo192.png"/>-->
<!--      <link rel="manifest" href="/manifests/zignaly.json"/>-->
      
      <!-- Facebook Meta Tags -->
      <meta property="og:url" content="https://${domain}/profit-sharing">
      <meta property="og:type" content="website">
<!--      <meta property="og:title" content="Discover the best traders on Zignaly">-->
      <meta property="og:description" content="${description}">
<!--      <meta property="og:image" content="https://app.zignaly.com/images/zignaly-social.png">-->
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta property="og:image:alt" content="${domain}"/>
      
      <!-- Twitter Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta property="twitter:domain" content="${domain}">
      <meta property="twitter:url" content="https://${domain}/profit-sharing">
<!--      <meta name="twitter:title" content="Discover the best traders on Zignaly">-->
      <meta name="twitter:description" content="${description}">
<!--      <meta name="twitter:image" content="https://app.zignaly.com/images/zignaly-social.png">-->
<!--      <meta name="twitter:site" content="@zignaly">-->
      <script type="text/javascript">window.__zignalyWhitelabelConfig = ${JSON.stringify(
        wlConfig,
      )}</script>
      </head>`,
  );
  // .replace(
  //   '<script id="analytics-scripts"></script>',
  //   wlConfig.scripts || '',
  // )
}

async function generateIndexHtmlForRequest(req) {
  // const host = req.get('host');
  const host = 'app.zignaly.com';
  const wlConfig = await getWhitelabelConfig(host);
  return getGeneratedIndexHtml(wlConfig);
}

module.exports = { generateIndexHtmlForRequest };
