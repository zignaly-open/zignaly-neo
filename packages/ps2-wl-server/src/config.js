const axios = require('axios');
const { CACHE_TTL, BASE_API } = require('./constants');

console.error({ CACHE_TTL, BASE_API });

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
  try {
    const { data: whitelabel } = await axios.get(
      `${BASE_API}wl/config?domain=${domain}`,
    );
    setCacheValue(domain, whitelabel);
    return whitelabel;
  } catch (e) {
    console.error(e);
  }
};

module.exports = getWhitelabelConfig;
