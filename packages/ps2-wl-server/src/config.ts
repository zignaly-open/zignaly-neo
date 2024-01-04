// @ts-nocheck

import axios from 'axios';
import { CACHE_TTL, BASE_API } from './constants';
import type { WhitelabelOverride } from '@zignaly-open/ps2/src/whitelabel/type';
import * as translationOverridesMap from './translationOverrides';

const whitelabelCache = {};

export type WhitelabelBackendConfig = Pick<
  WhitelabelOverride,
  | 'minInvestment'
  | 'social'
  | 'domain'
  | 'tools'
  | 'slug'
  | 'zignalySuccessFee'
  | 'title'
  | 'description'
> & {
  name: string;
  type: 'lite' | 'heavy'; // this is wrong but let the future me figure out what is the other type
  settingFee: number;
  monthlyFee: number;
  image: string;
  logo: string;
  favicon: string;
  supportUrl: string;
  supportHelpCenter: string;
  languages: WhitelabelOverride['locales'];
  settings: WhitelabelOverride['featureOverrides'] & { translationOw: boolean };
  mainAppLink?: string;
  tos?: string;
  privacyPolicy?: string;
  subscriptionPurchaseLink?: string;
  marketplaceMinScore: number;
};

export type WhitelabelFrontendConfig = WhitelabelOverride;

const setCacheValue = (
  domain: string,
  value: WhitelabelFrontendConfig,
): void => {
  whitelabelCache[domain] = {
    expiry: Date.now() + CACHE_TTL,
    value,
  };
};

const getCacheValue = (domain: string): WhitelabelFrontendConfig | null => {
  if (whitelabelCache[domain] && whitelabelCache[domain].expiry > Date.now())
    return whitelabelCache[domain].value;
  return null;
};

const mapBackendConfigToFrontendConfig = ({
  settings: { translationOw, ...featureOverrides },
  languages: locales,
  supportUrl: helpUrl,
  tos,
  privacyPolicy,
  subscriptionPurchaseLink,
  mainAppLink,

  // just to remove those
  settingFee,
  monthlyFee,
  type,

  ...config
}: WhitelabelBackendConfig): WhitelabelFrontendConfig =>
  ({
    ...config,
    locales,
    featureOverrides,
    translationOverrides:
      (translationOw && translationOverridesMap[config.slug]) || null,
    links: {
      tos,
      privacyPolicy,
      mainAppLink,
      helpUrl,
      subscriptionPurchaseLink,
    },
  } as WhitelabelFrontendConfig);

export const getWhitelabelConfig = async (
  domain: string,
): Promise<WhitelabelFrontendConfig | null> => {
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
    return null;
  }
};
