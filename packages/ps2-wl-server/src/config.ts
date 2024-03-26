import axios from 'axios';
import { CACHE_TTL, PS2_BASE_API, PS2_REFERRAL_API } from './constants';
// ok here's the problem
// we want the types to be here in order to validate ourselves
// but we deploy only this module. Like, we literally pretend this is standalone.
// we do this for performance reasons and to not ship more than we need.
//
// Problem? Yes
//
// how do we solve this?
// *breathe in*
// *slowly breathe out*
//
// WE APPEND a TS NOCHECK WHEN DOING CODEDEPLOY
//
// God have mercy on my soul
//
// I am sorry
// I will figure a cleaner way to do this
import type {
  WhitelabelOverride,
  WhitelabelBackendConfig,
} from '@zignaly-open/ps2-definitions';
import * as translationOverridesMap from './translationOverrides';
import logger from './logger';

const whitelabelCache: Record<
  string,
  { expiry: number; value: WhitelabelFrontendConfig | null }
> = {};

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
    baseApi: PS2_BASE_API,
    baseReferralApi: PS2_REFERRAL_API,
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
      (translationOw &&
        (
          translationOverridesMap as Record<
            string,
            WhitelabelOverride['translationOverrides']
          >
        )[config.slug]) ||
      null,
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
  const url = `${PS2_BASE_API}wl/config?domain=${domain}`;
  if (/^[\d.:]+$/.test(domain)) {
    // this is a keepalive check
    // yes I am too lazy to write a full ip+port regex
    // no harm in that
    return null;
  }

  let response;

  try {
    response = await axios.get(url);
  } catch (e) {
    logger.error(`Could not load the config from ${url}`);
    return null;
  }

  try {
    const whitelabel = mapBackendConfigToFrontendConfig(response.data);
    setCacheValue(domain, whitelabel);
    return whitelabel;
  } catch (e) {
    logger.error(e.stack);
    return null;
  }
};
