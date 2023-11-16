/*
Grab a hot cup of tea, some sandwiches and a blanket, this is going to be a long one
So, once upon a time we decided to actually start doing whitelabels
This is all good and well, but with the growing number of whitelabels
the idea of storing the config as part of the codebase started causing problems
Even if we could load the configs dynamically from the backend,
we still have problems like the fact that different customers needed
different metadata in index.html (for social network sharing), etc

This could have been achieved by us building the app every time, but managing 20 deplpoyments is no fn

So, this is not SSR but yes I'm preparing the index.html on the backend

This is just one of the options along with going full SSR (nextjs, likely).
If you still see this in the code, it means we had good business reasons to choose it over SSR
 */
const express = require('express');
const fs = require('fs');
const serveStatic = require('serve-static');

const port = 2000;
const server = express();
const indexHtml = fs.readFileSync(__dirname + '/../build/index.html', 'utf8');

if (!indexHtml) {
  console.error('build/index.html is missing, sborting');
  process.exit(1);
}

server.use('index.html', serveNewIndexHtml);
// This should not be used in prod
// In prod, the reverse proxy should serve static and this script should not be processing those requests
server.use(serveStatic(__dirname + '/../build'));
server.use('*', serveNewIndexHtml);

server.listen(port, (err) => {
  if (err) throw err;
  /* eslint no-console: "off" */
  console.log(`> Ready on :${port}`);
});

function getIndexHtmlWithWhitelabelHead(wlConfig) {
  return indexHtml.replace(
    '</head>',
    `${
      wlConfig?.headContent || ''
    }<script type="text/javascript">window.zignalyWhitelabelConfig = ${JSON.stringify(
      wlConfig,
    )}</script></head>`,
  );
}

async function serveNewIndexHtml(req, res) {
  const wlConfig = await getWhitelabelConfig(req);
  res.send(getIndexHtmlWithWhitelabelHead(wlConfig)).status(200);
}

async function getWhitelabelConfig(req) {
  const host = req.get('host');
  const overrides = {
    'zig1.xfuturum.com': {
      title: 'Zignaly',
    },
    'zig2.xfuturum.com': {
      title: 'Huignaly',
      backgroundImage: '/images/whitelabel/1518775251131173984.jpeg',
    },
  };
  console.error(overrides[host in overrides ? host : 'zig2.xfuturum.com']);
  return {
    ...overrides[host in overrides ? host : 'zig2.xfuturum.com'],
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
  };
}
