import React, { useMemo } from 'react';
import { TierArrow, TierBarContainer } from '../styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { TierLevel } from 'apis/referrals/types';

const TierBar = ({
  tier,
  tiers,
  minHeight = 32,
  maxHeight = 206,
  width = 46,
  showArrow = true,
  minOpacity = 0.2,
}: {
  tier: TierLevel;
  tiers: TierLevel[];
  minHeight?: number;
  maxHeight?: number;
  width?: number;
  showArrow?: boolean;
  minOpacity?: number;
}) => {
  const min = tiers[0].tierLevelFactor;
  const max = tiers[tiers.length - 1].tierLevelFactor;

  // Bar height
  const power = 1.74; // adjust this value to control the curve
  const height = useMemo(
    () =>
      minHeight +
      Math.pow((tier.tierLevelFactor - min) / (max - min), power) *
        (maxHeight - minHeight),
    [min, max, tier],
  );

  // Bar opacity
  const opacityPower = 0.9;
  const opacity = useMemo(
    () =>
      minOpacity +
      Math.pow((tier.tierLevelFactor - min) / (max - min), opacityPower) *
        (1 - minOpacity),
    [min, max, tier],
  );

  // Arrow opacity
  const minArrowOpacity = 0.15;
  const opacityArrow = useMemo(() => {
    const minAbove1 = tiers.find((t) => t.tierLevelFactor > 1).tierLevelFactor;
    return tier.tierLevelFactor > 1
      ? minArrowOpacity +
          Math.pow(
            (tier.tierLevelFactor - minAbove1) / (max - minAbove1),
            opacityPower,
          ) *
            (1 - minArrowOpacity)
      : 0;
  }, [min, max, tier]);

  return (
    <TierBarContainer opacity={opacity} width={width} height={height}>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <ZigTypography color='greenGraph'>{tier.tierLevelFactor}x</ZigTypography>
      {tier.tierLevelFactor > 1 && <BoltIcon />}
      {showArrow && <TierArrow opacity={opacityArrow} />}
    </TierBarContainer>
  );
};

export default TierBar;
