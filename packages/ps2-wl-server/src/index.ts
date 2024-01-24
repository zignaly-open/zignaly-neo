/*

Grab a hot cup of tea, some sandwiches and a blanket, this is going to be a long one
So, once upon a time we decided to actually start doing whitelabels
This is all good and well, but with the growing number of whitelabels
the idea of storing the config as part of the codebase started causing problems
Even if we could load the configs dynamically from the backend,
we still have problems like the fact that different customers needed
different metadata in index.html (for social network sharing), etc

This could have been achieved by us building the app every time, but managing 20 deplpoyments is no fun

So, this is not SSR but yes I'm preparing the index.html on the backend

This is just one of the options along with going full SSR (nextjs, likely).
If you still see this in the code, it means we had good business reasons to choose it over SSR

*/
import express, { Request, Response } from 'express';
import serveStatic from 'serve-static';
import { generateIndexHtml, generateManifest } from './html';
import { getWhitelabelConfig } from './config';
import { BUILD_PATH, PS2_ENV } from './constants';

try {
  // https://github.com/TypeStrong/ts-node/issues/2026
  process.setUncaughtExceptionCaptureCallback(console.error);
} catch (e) {
  console.error(e);
}

const port = 2000;
const server = express();

server.use('/index.html', serveNewIndexHtml);
server.use('/manifest.json', serveNewManifestJson);

// This should not be used in prod
// In prod, the reverse proxy should serve static and this script should not be processing those requests
server.use(
  serveStatic(BUILD_PATH, {
    dotfiles: 'ignore',
    index: false,
  }),
);

server.use('*', serveNewIndexHtml);

// @ts-ignore
server.listen(port, (err: unknown) => {
  if (err) throw err;
  /* eslint no-console: "off" */
  console.log(`> Ready on :${port}`);
});

const getWlConfigForReq = (req: express.Request) =>
  getWhitelabelConfig(req.get('host'));

async function serveNewIndexHtml(req: Request, res: Response) {
  let wlConfig = await getWlConfigForReq(req);
  if (!wlConfig) {
    res
      .send(`${PS2_ENV} config not found or invalid for ${req.get('host')}`)
      .status(500);
  } else {
    res.send(await generateIndexHtml(wlConfig)).status(200);
  }
}

async function serveNewManifestJson(req: Request, res: Response) {
  console.error('manifest');
  let wlConfig = await getWlConfigForReq(req);
  if (!wlConfig) {
    res.json({}).status(500);
  } else {
    res.send(await generateManifest(wlConfig)).status(200);
  }
}
