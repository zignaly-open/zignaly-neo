import * as clients from './configs';
import { Features, OverrideableEndpoints, WhitelabelOverride } from './type';
import defaultFeatureState from './default';

const { REACT_APP_WHITELABEL: whitelabelName } = process.env;

export const whitelabel =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (window.zignalyWhitelabelConfig as unknown as WhitelabelOverride) ||
  (whitelabelName && clients[whitelabelName]) ||
  clients.zignaly;

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
