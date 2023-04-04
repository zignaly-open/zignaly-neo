import React from 'react';
import { TierArrow, TierBarContainer } from '../styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { TierLevel } from 'apis/referrals/types';

const TierBar = ({
  tier,
  max,
  min,
}: {
  tier: TierLevel;
  min: number;
  max: number;
}) => {
  const minHeight = 45;
  const maxHeight = 200;

  const height =
    minHeight +
    ((tier.tierLevelFactor - min) / (max - min)) * (maxHeight - minHeight);

  return (
    <TierBarContainer height={height}>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <ZigTypography color='greenGraph'>{tier.tierLevelFactor}x</ZigTypography>
      <BoltIcon
        style={{ minWidth: '7px', minHeight: '12.5px' }}
        width={7}
        height={12.5}
      />
      <TierArrow />
    </TierBarContainer>
  );
};

export default TierBar;
