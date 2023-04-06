import React from 'react';
import { TierArrow, TierBarContainer } from '../styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { TierLevel } from 'apis/referrals/types';

const TierBar = ({
  tier,
  max,
  min,
  minHeight = 32,
  maxHeight = 200,
  width = 46,
  showArrow = true,
  minOpacity = 0.2,
}: {
  tier: TierLevel;
  min: number;
  max: number;
  minHeight?: number;
  maxHeight?: number;
  width?: number;
  showArrow?: boolean;
  minOpacity?: number;
}) => {
  const power = 1.74; // adjust this value to control the curve
  const height =
    minHeight +
    Math.pow((tier.tierLevelFactor - min) / (max - min), power) *
      (maxHeight - minHeight);

  const opacityPower = 0.9;
  const opacity =
    minOpacity +
    Math.pow((tier.tierLevelFactor - min) / (max - min), opacityPower) *
      (1 - minOpacity);

  return (
    <TierBarContainer opacity={opacity} width={width} height={height}>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <ZigTypography color='greenGraph'>{tier.tierLevelFactor}x</ZigTypography>
      {tier.tierLevelFactor > 1 && <BoltIcon />}
      {showArrow && <TierArrow opacity={opacity} />}
    </TierBarContainer>
  );
};

export default TierBar;
