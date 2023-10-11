import * as clients from './configs';
import { Features, OverrideableEndpoints, WhitelabelOverride } from './type';
import defaultFeatureState from './default';

const { REACT_APP_WHITELABEL: whitelabelName } = process.env;

export const whitelabel = ((whitelabelName &&
  typeof clients[whitelabelName] !== 'undefined' &&
  clients[whitelabelName]) ||
  {}) as WhitelabelOverride;

export { whitelabelName };

export const isFeatureOn = (feature: Features): boolean => {
  return (
    {
      ...defaultFeatureState,
      ...(whitelabel?.featureOverrides || {}),
    }[feature] || false
  );
};

export const maybeOverrideEndpoint = (
  endpoint: OverrideableEndpoints,
): string => whitelabel.endpointOverrides?.[endpoint] || endpoint;
