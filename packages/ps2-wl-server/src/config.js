const axios = require('axios');
const { CACHE_TTL, BASE_API } = require('./constants');

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

const mapBackendConfigToFrontendConfig = ({
  settings: featureOverrides,
  supportUrl: helpUrl,
  tos,
  privacyPolicy,
  mainAppLink,
  ...config
}) => ({
  ...config,
  featureOverrides,
  links: { tos, privacyPolicy, mainAppLink, helpUrl },
});

const getWhitelabelConfig = async (domain) => {
  const cached = getCacheValue(domain);
  if (cached) return cached;
  // TODO: process it somehow
  try {
    let { data: whitelabel } = await axios.get(
      `${BASE_API}wl/config?domain=${domain}`,
    );
    whitelabel = mapBackendConfigToFrontendConfig(whitelabel);
    setCacheValue(domain, whitelabel);
    return whitelabel;
  } catch (e) {
    console.error(e);
  }
};

module.exports = getWhitelabelConfig;
