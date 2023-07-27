import * as clients from './configs';
import { Features, OverrideableEndpoints, WhitelabelOverride } from './type';
import defaultFeatureState from './default';
import { hasValidKycConfig } from '../views/Kyc/kycDefinitions';

const { REACT_APP_WHITELABEL: whitelabelConfig } = process.env;

export const whitelabel = ((whitelabelConfig &&
  typeof clients[whitelabelConfig] !== 'undefined' &&
  clients[whitelabelConfig]) ||
  {}) as WhitelabelOverride;

export const isFeatureOn = (feature: Features): boolean => {
  let featureState =
    {
      ...defaultFeatureState,
      ...(whitelabel?.featureOverrides || {}),
    }[feature] || false;
  if (feature === Features.Kyc && featureState) {
    // even if KYC is on, not having a valid config makes it off
    featureState = featureState && hasValidKycConfig;
  }
  return featureState;
};

export const maybeOverrideEndpoint = (
  endpoint: OverrideableEndpoints,
): string => whitelabel.endpointOverrides?.[endpoint] || endpoint;
