import axios from 'axios';
import { CACHE_TTL, BASE_API } from './constants';
// ok here's the problem
// we want the types to be here in order to validate ourselves
// but we deploy only this module. Problem? Yes
// how do we solve this?
// *breathe in*
// *slowly breathe out*
// WE APPEND a TS NOCHECK WHEN DOING CODEDEPLOY
// I am sorry
// I will figure a cleaner way to do this
import type { WhitelabelOverride } from '@zignaly-open/ps2/src/whitelabel/type';
import * as translationOverridesMap from './translationOverrides';
import { ThemeOverridesType } from '@zignaly-open/ui';

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
  theme: string;
  themeOverride: {
    background: string;
    backgroundImage: string;
    themeOverrides: ThemeOverridesType;
  };
  privacyPolicy?: string;
  subscriptionPurchaseLink?: string;
  marketplaceMinScore: number;
};

export type WhitelabelFrontendConfig = WhitelabelOverride & {
  imageDeliveryImages: {
    logo: string;
    banner: string;
    favicon: string;
  };
};

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

// oh yes baby we're mutating that object
const getThemeOverridesWithBackground = (
  themeOverride: WhitelabelBackendConfig['themeOverride'],
) => {
  if (!themeOverride) return undefined;
  const { themeOverrides = {} } = themeOverride;
  if (!themeOverrides.backgrounds) themeOverrides.backgrounds = {};
  if (themeOverride?.backgroundImage) {
    themeOverrides.backgrounds.body = `url(${themeOverride?.backgroundImage}) ${
      themeOverride?.background || '#111'
    }`;
  } else if (themeOverride?.background) {
    themeOverrides.backgrounds.body = themeOverride.background;
  } else {
    // Do nothing
  }
  return themeOverrides;
};

const mapBackendConfigToFrontendConfig = ({
  settings: { translationOw, ...featureOverrides },
  languages: locales,
  supportUrl: helpUrl,
  tos,
  privacyPolicy,
  subscriptionPurchaseLink,
  mainAppLink,
  logo,
  favicon,
  image: banner,

  // just to remove those
  settingFee,
  monthlyFee,
  type,

  theme = 'dark',
  themeOverride,

  ...config
}: WhitelabelBackendConfig): WhitelabelFrontendConfig =>
  ({
    ...config,
    locales,
    logo: logo + '/public',
    favicon: favicon + '/public',
    imageDeliveryImages: {
      logo,
      favicon,
      banner,
    },
    baseTheme: theme,
    themeOverrides: getThemeOverridesWithBackground(themeOverride),
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
  const url = `${BASE_API}wl/config?domain=${domain}`;

  let response;

  try {
    response = await axios.get(url);
  } catch (e) {
    console.error(`Could not load the config from ${url}`);
    return null;
  }

  try {
    const whitelabel = mapBackendConfigToFrontendConfig(response.data);
    setCacheValue(domain, whitelabel);
    return whitelabel;
  } catch (e) {
    console.error(e);
    return null;
  }
};
