// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/new_api',
    createProxyMiddleware({
      target: 'https://staging-api.zignaly.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/new_api': '',
      },
    }),
  );
};
