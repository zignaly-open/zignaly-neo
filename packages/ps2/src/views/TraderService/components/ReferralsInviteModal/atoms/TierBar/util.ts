import { useMemo } from 'react';
import { getBoostedCommissionPct } from '../../util';
import { TierLevels } from 'apis/referrals/types';
import { Options } from 'views/TraderService/components/ServiceHeader/styles';

const BOLT_SPACE = 18;
export const DEFAULT_MIN_HEIGHT = 32;
export const DEFAULT_MAX_HEIGHT = 240;

export const calculateLayerValue = (
  layer: number,
  tierCommission: number,
  boost: number,
  serviceCommission: number,
  zignalyCommission: number,
) => {
  if (layer === 1) {
    // User boost + Trader boost
    return getBoostedCommissionPct(
      tierCommission,
      boost,
      serviceCommission,
      zignalyCommission,
    );
  } else if (layer === 2) {
    if (boost === 1 && serviceCommission === 0) return 0;

    // User boost without trader boost OR trader boost
    return getBoostedCommissionPct(
      tierCommission,
      serviceCommission > 0 ? boost : 1,
    );
  } else if (layer === 3) {
    // Only used to show the base commission when there is a boost and service commission
    return boost > 1 && serviceCommission > 0 ? tierCommission : 0;
  }

  return 0;
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
  serviceCommission: number,
  zignalyCommission?: number,
  options: { minHeight?: number; maxHeight?: number } = {},
) => {
  const { minHeight = DEFAULT_MIN_HEIGHT, maxHeight = DEFAULT_MAX_HEIGHT } =
    options;
  const tierCommission = tiers.find(
    (tier) => tier.id === tierId,
  )?.commissionPct;
  const min = tiers[0].commissionPct;
  const max = tiers[tiers.length - 1].commissionPct;

  const layers =
    serviceCommission > 0 && boost > 1
      ? 3
      : serviceCommission > 0 || boost > 1
      ? 2
      : 1;
  const minHeightConstraints =
    layers * minHeight + (layers > 1 ? BOLT_SPACE : 0);

  // Layer 1 (Full bar)
  const layer1 = useMemo(() => {
    const value = calculateLayerValue(
      1,
      tierCommission,
      boost,
      serviceCommission,
      zignalyCommission,
    );

    // Adjust this value to control the curve
    const power = 1;
    const height =
      minHeightConstraints +
      Math.pow((tierCommission - min) / (max - min), power) *
        (maxHeight - minHeightConstraints);

    return { value, height };
  }, [min, max, serviceCommission, tierCommission, boost]);

  const layer2 = useMemo(() => {
    const value = calculateLayerValue(
      2,
      tierCommission,
      boost,
      serviceCommission,
      zignalyCommission,
    );
    const height = (value / layer1.value) * layer1.height;

    return {
      value: value !== layer1.value ? value : 0,
      height: Math.max(height, minHeight * (layers - 1)),
    };
  }, [serviceCommission, tierCommission, boost, layer1]);

  const layer3 = useMemo(() => {
    const value = calculateLayerValue(
      3,
      tierCommission,
      boost,
      serviceCommission,
      zignalyCommission,
    );
    // const height =
    //   Math.min(value / layer1.value, 0.25) * layer1.height * MULTIPLIER;
    const height = (value / layer1.value) * layer1.height;
    return {
      value: value,
      height: Math.max(height, minHeight * (layers - 2)),
    };
  }, [serviceCommission, tierCommission, boost, layer1]);

  return [layer1, layer2, layer3];
};
