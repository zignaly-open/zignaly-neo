module.exports = {
  globDirectory: './public/',
  globPatterns: ['**/*.{html,js}'],
  swDest: './public/service-worker.js',
  clientsClaim: true,
  skipWaiting: true,
};
