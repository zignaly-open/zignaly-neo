import * as clients from './configs';
import { Features } from './type';
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
      ...(whitelabel?.featureOverrides || {}),
    }[feature] || false
  );
};

export function getMinInvestmentAmount(coin: string): number {
  if (!isFeatureOn(Features.MinInvestment)) return 0;
  return whitelabel.minInvestment?.[coin] || 0;
}
