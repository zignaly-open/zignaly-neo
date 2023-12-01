const axios = require('axios');
const { CACHE_TTL } = require('./constants');
const { BASE_API } = process.env;

if(!BASE_API) {
  console.error('`BASE_API` should be defined');
  process.exit(1);
}

const whitelabelCache = {};

const setCacheValue = (domain, value) => {
  whitelabelCache[domain] = {
    expiry: Date.now() + CACHE_TTL,
    value,
  };
};

const getCacheValue = (domain) => {
  if (whitelabelCache[domain] && whitelabelCache[domain].expiry > Date.now())
    return whitelabelCache[domain].value;
  return null;
};

const getWhitelabelConfig = async (domain) => {
  const cached = getCacheValue(domain);
  if (cached) return cached;
  // TODO: process it somehow
  const whitelabel = await axios.get(`${BASE_API}/wl/config?domain=${domain}`);
  setCacheValue(domain, whitelabel);
  return whitelabel;
};

exports = { getWhitelabelConfig };
