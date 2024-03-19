module.exports = {
  globDirectory: './public/',
  globPatterns: ['**/*.{html,js,json}'],
  swDest: './public/service-worker.js',
  clientsClaim: true,
  navigateFallback: '/offline.html',
  skipWaiting: true,
};
