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
const config = require('./wl-config.json');

const port = 2000;
const server = express();
const indexHtml = fs.readFileSync(__dirname + '/../build/index.html', 'utf8');

if (!indexHtml) {
  console.error('build/index.html is missing, aborting');
  process.exit(1);
}

server.use('index.html', serveNewIndexHtml);

// This should not be used in prod
// In prod, the reverse proxy should serve static and this script should not be processing those requests
server.use(
  serveStatic(__dirname + '/../build', {
    dotfiles: 'ignore',
    index: false,
  }),
);

server.use('*', serveNewIndexHtml);

server.listen(port, (err) => {
  if (err) throw err;
  /* eslint no-console: "off" */
  console.log(`> Ready on :${port}`);
});

function getIndexHtmlWithWhitelabelHead(wlConfig) {
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
      `<script id="analytics-scripts">${wlConfig.scripts || ''}}</script>`,
    );
}

async function serveNewIndexHtml(req, res) {
  const wlConfig = await getWhitelabelConfig(req);
  res.send(getIndexHtmlWithWhitelabelHead(wlConfig)).status(200);
}

async function getWhitelabelConfig(req) {
  const host = req.get('host');
  const overrides = {
    'zig1.xfuturum.com': config.zignaly,
    'zig2.xfuturum.com': config.criptomaniacos,
  };

  return overrides[host] || config.criptomaniacos;
}
