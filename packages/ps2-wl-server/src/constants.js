require('dotenv').config();

const { BASE_API } = process.env;

if (!BASE_API) {
  console.error('`BASE_API` should be defined');
  process.exit(1);
}

module.exports = {
  BASE_API: BASE_API + (BASE_API.endsWith('/') ? '' : '/'),
  CACHE_TTL: 10 * 60_000,
};
