const fs = require('fs');
const { getWhitelabelConfig } = require('./config');

const indexHtml = fs.readFileSync(__dirname + '/../build/index.html', 'utf8');

if (!indexHtml) {
  console.error('build/index.html is missing, aborting');
  process.exit(1);
}

function getGeneratedIndexHtml(wlConfig) {
  return indexHtml
    .replace(
      '</head>',
      `${
        wlConfig?.headContent || ''
      }<script type="text/javascript">window.__zignalyWhitelabelConfig = ${JSON.stringify(
        wlConfig,
      )}</script></head>`,
    )
    .replace(
      '<script id="analytics-scripts"></script>',
      wlConfig.scripts || '',
    );
}

async function generateIndexHtmlForRequest(req) {
  const host = req.get('host');
  const wlConfig = await getWhitelabelConfig(host);
  return getGeneratedIndexHtml(wlConfig);
}

exports = { generateIndexHtmlForRequest };
