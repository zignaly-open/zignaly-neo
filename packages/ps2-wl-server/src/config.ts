import axios from 'axios';
import { CACHE_TTL, BASE_API } from './constants';

const whitelabelCache = {};

export type WhitelabelConfig = any;

const setCacheValue = (domain: string, value: WhitelabelConfig): void => {
  whitelabelCache[domain] = {
    expiry: Date.now() + CACHE_TTL,
    value,
  };
};

const getCacheValue = (domain: string): WhitelabelConfig | null => {
  if (whitelabelCache[domain] && whitelabelCache[domain].expiry > Date.now())
    return whitelabelCache[domain].value;
  return null;
};

const mapBackendConfigToFrontendConfig = ({
  // @ts-ignore
  settings: featureOverrides,
  // @ts-ignore
  supportUrl: helpUrl,
  // @ts-ignore
  tos,
  // @ts-ignore
  privacyPolicy,
  // @ts-ignore
  mainAppLink,
  // @ts-ignore
  ...config
}) => ({
  ...config,
  featureOverrides,
  links: { tos, privacyPolicy, mainAppLink, helpUrl },
});

export const getWhitelabelConfig = async (
  domain: string,
): Promise<WhitelabelConfig> => {
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
