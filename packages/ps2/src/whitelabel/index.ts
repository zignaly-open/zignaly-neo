import * as clients from './configs';
import { Features, OverrideableEndpoints, WhitelabelOverride } from './type';

const { REACT_APP_WHITELABEL: whitelabelConfig } = process.env;

export const whitelabel = ((whitelabelConfig &&
  typeof clients[whitelabelConfig] !== 'undefined' &&
  clients[whitelabelConfig]) ||
  {}) as WhitelabelOverride;

export const isFeatureOn = (feature: Features): boolean =>
  !whitelabel?.disabledFeatures?.includes(feature);

export const maybeOverrideEndpoint = (
  endpoint: OverrideableEndpoints,
): string => whitelabel.endpointOverrides?.[endpoint] || endpoint;
