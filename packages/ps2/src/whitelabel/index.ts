import * as clients from './configs';
import { Features, OverrideableEndpoints } from './type';
import defaultFeatureState from './default';

const { REACT_APP_WHITELABEL: whitelabelName } = process.env;

export const whitelabel =
  (whitelabelName && clients[whitelabelName]) || clients.zignaly;

export { whitelabelName };

export const isFeatureOn = (feature: Features): boolean => {
  return (
    {
      ...defaultFeatureState,
      ...(whitelabel?.featureOverrides || {}),
    }[feature] || false
  );
};

export function getMinInvestmentAmount(coin: string): number {
  return whitelabel.minInvestment?.[coin] || 0;
}

export const maybeOverrideEndpoint = (
  endpoint: OverrideableEndpoints,
): string => whitelabel.endpointOverrides?.[endpoint] || endpoint;
