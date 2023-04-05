import React from 'react';
import { TierArrow, TierBarContainer } from '../styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { TierLevel } from 'apis/referrals/types';

const TierBar = ({
  tier,
  max,
  min,
  minHeight = 45,
  maxHeight = 200,
  width = 46,
  showArrow = true,
}: {
  tier: TierLevel;
  min: number;
  max: number;
  minHeight?: number;
  maxHeight?: number;
  width?: number;
  showArrow?: boolean;
}) => {
  const height =
    minHeight +
    ((tier.tierLevelFactor - min) / (max - min)) * (maxHeight - minHeight);

  return (
    <TierBarContainer width={width} height={height}>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <ZigTypography color='greenGraph'>{tier.tierLevelFactor}x</ZigTypography>
      <BoltIcon />
      {showArrow && <TierArrow />}
    </TierBarContainer>
  );
};

export default TierBar;
