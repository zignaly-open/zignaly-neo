import * as clients from './configs';
import { Features, OverrideableEndpoints, WhitelabelOverride } from './type';
import defaultFeatureState from './default';

const { REACT_APP_WHITELABEL: whitelabelConfig } = process.env;

export const whitelabel = ((whitelabelConfig &&
  typeof clients[whitelabelConfig] !== 'undefined' &&
  clients[whitelabelConfig]) ||
  {}) as WhitelabelOverride;

export const isFeatureOn = (feature: Features): boolean => {
  const featureState =
    {
      ...defaultFeatureState,
      ...(whitelabel?.featureOverrides || {}),
    }[feature] || false;
  return featureState;
};

export const maybeOverrideEndpoint = (
  endpoint: OverrideableEndpoints,
): string => whitelabel.endpointOverrides?.[endpoint] || endpoint;
