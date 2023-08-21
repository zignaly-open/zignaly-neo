const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/new_api',
    createProxyMiddleware({
      target: 'https://test.zignaly.com/',
      changeOrigin: true,
    }),
  );
};
