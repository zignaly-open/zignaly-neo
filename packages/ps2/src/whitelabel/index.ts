import * as clients from './configs';
import { Features, OverrideableEndpoints } from './type';
import defaultFeatureState from './default';

const { REACT_APP_DEV_ONLY_WHITELABEL: whitelabelNameOverride } = process.env;

export const whitelabel =
  window.__zignalyWhitelabelConfig ||
  (whitelabelNameOverride && clients[whitelabelNameOverride]) ||
  clients.zignaly;
export const isZignaly = whitelabel === clients.zignaly;

export const isFeatureOn = (feature: Features): boolean => {
  return (
    {
      ...defaultFeatureState,
      ...(whitelabel?.settings || {}),
    }[feature] || false
  );
};

export function getMinInvestmentAmount(coin: string): number {
  return whitelabel.minInvestment?.[coin] || 0;
}

export const maybeOverrideEndpoint = (
  endpoint: OverrideableEndpoints,
): string => whitelabel.endpointOverrides?.[endpoint] || endpoint;
