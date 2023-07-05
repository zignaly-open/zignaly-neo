import React, { useMemo } from 'react';
import { TierArrow, TierBarContainer } from './styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { TierLevel } from 'apis/referrals/types';

const TierBar = ({
  tier,
  traderCommission,
  boost,
  tiers,
  minHeight = 32,
  maxHeight = 206,
  width = 60,
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
  boost: number;
  traderCommission: number;
}) => {
  const min = tiers[0].commissionPct;
  const max = tiers[tiers.length - 1].commissionPct;

  // Adjust this value to control the curve
  const power = 1.74;
  // Bar height
  const height = useMemo(
    () =>
      minHeight +
      Math.pow((tier.commissionPct - min) / (max - min), power) *
        (maxHeight - minHeight),
    [min, max, tier],
  );

  // Bar opacity
  const opacityPower = 0.9;
  const opacity = useMemo(
    () =>
      minOpacity +
      Math.pow((tier.commissionPct - min) / (max - min), opacityPower) *
        // todo: 0.8?
        (0.8 - minOpacity),
    [min, max, tier],
  );

  // Arrow opacity
  const minArrowOpacity = 0.15;
  const opacityArrow = useMemo(() => {
    const minAbove1 = tiers.find((t) => t.commissionPct > 1).commissionPct;
    return tier.commissionPct > 1
      ? minArrowOpacity +
          Math.pow(
            (tier.commissionPct - minAbove1) / (max - minAbove1),
            opacityPower,
          ) *
            (1 - minArrowOpacity)
      : 0;
  }, [min, max, tier]);

  // const maxEarnings = 500;
  // const invites = 5;
  // const baseCommission = 10;

  return (
    <TierBarContainer
      opacity={opacity}
      width={width}
      height={height}
      emphasis={showArrow}
    >
      <ZigTypography color='neutral200' fontSize={12} fontWeight={500}>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        {tier.commissionPct}%
      </ZigTypography>
      {tier.commissionPct > 1 && <BoltIcon />}
      {showArrow && <TierArrow opacity={opacityArrow} />}
    </TierBarContainer>
  );
};

export default TierBar;
