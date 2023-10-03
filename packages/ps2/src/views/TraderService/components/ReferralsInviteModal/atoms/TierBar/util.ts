import { useMemo } from 'react';
import { getBoostedCommissionPct } from '../../util';
import { TierLevels } from 'apis/referrals/types';

const BOLT_SPACE = 25;
export const DEFAULT_MIN_HEIGHT = 32;
export const DEFAULT_MAX_HEIGHT = 240;

export const calculateLayerValue = (
  layer: number,
  tierCommission: number,
  boost: number,
  traderBoost: number,
) => {
  if (layer === 1) {
    // User boost + Trader boost
    return getBoostedCommissionPct(tierCommission, boost, traderBoost);
  } else if (layer === 2) {
    if (boost === 1 && traderBoost) return 0;

    // User boost or trader boost (but not both)
    return getBoostedCommissionPct(tierCommission, traderBoost ? boost : 1);
  } else if (layer === 3) {
    // Only used to show the base commission when there is a boost and service commission
    return boost > 1 && traderBoost ? tierCommission : 0;
  }

  return 0;
};

const calculateLayerHeight = (
  value: number,
  min: number,
  max: number,
  minHeight: number,
  maxHeight: number,
) => {
  // Adjust this value to control the curve
  const power = 1;
  const height =
    minHeight +
    Math.pow((value - min) / (max - min), power) * (maxHeight - minHeight);

  return height;
};

const calculateSubLayerHeight = (
  value: number,
  fullValue: number,
  fullHeight: number,
  minHeight: number,
) => {
  const height = (value / fullValue) * fullHeight;
  return Math.max(height, minHeight);
};

/**
 * Calculate the commission value and height for each layer of the tier bar.
 * - 1st layer: Full bar, including all the boosts.
 * - 2nd layer:
 *   - If trader boost (in layer 1): Show user boost
 *   - Else if user boost (in layer 1): Show base commission
 *   - Otherwise none
 * - 3rd layer: Show the base commission only if user boost AND trader boost.
 */
export const useTierLayers = (
  tiers: TierLevels,
  tierId: number,
  boost: number,
  traderBoost: number,
  options: { minHeight?: number; maxHeight?: number } = {},
) => {
  const { minHeight = DEFAULT_MIN_HEIGHT, maxHeight = DEFAULT_MAX_HEIGHT } =
    options;
  const tierCommission = tiers.find(
    (tier) => tier.id === tierId,
  )?.commissionPct;
  const min = tiers[0].commissionPct;
  const max = tiers[tiers.length - 1].commissionPct;
  const welcomeBoost = boost > 1;

  const layers =
    traderBoost && welcomeBoost ? 3 : traderBoost || welcomeBoost ? 2 : 1;
  const minAdditionalHeight = traderBoost ? BOLT_SPACE : 0;
  const minHeightConstraints = layers * minHeight + minAdditionalHeight;

  // Layer 1 (Full bar)
  const layer1 = useMemo(() => {
    const value = calculateLayerValue(1, tierCommission, boost, traderBoost);

    return {
      value,
      height: calculateLayerHeight(
        tierCommission,
        min,
        max,
        minHeightConstraints,
        maxHeight,
      ),
    };
  }, [min, max, traderBoost, tierCommission, boost]);

  const layer2 = useMemo(() => {
    const value = calculateLayerValue(2, tierCommission, boost, traderBoost);

    const layer2minHeight = minHeight * (layers - 1);

    const height = calculateSubLayerHeight(
      value,
      layer1.value,
      layer1.height - minAdditionalHeight,
      // If there is a 3rd layer, the 2nd layer should be at least half of the 1st layer
      layers > 2
        ? Math.max(layer2minHeight, 0.5 * layer1.height)
        : layer2minHeight,
    );

    return {
      value: value !== layer1.value ? value : 0,
      height: value ? height : 0,
    };
  }, [traderBoost, tierCommission, boost, layer1]);

  const layer3 = useMemo(() => {
    const value = calculateLayerValue(3, tierCommission, boost, traderBoost);

    const height = calculateSubLayerHeight(
      value,
      layer1.value,
      layer1.height,
      Math.max(minHeight * (layers - 2), 0.25 * layer1.height),
    );

    return {
      value,
      height: value ? height : 0,
    };
  }, [traderBoost, tierCommission, boost, layer1, layer2]);

  return [layer1, layer2, layer3];
};
