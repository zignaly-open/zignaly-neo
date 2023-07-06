import React, { useMemo } from 'react';
import { BarContent, TierArrow, TierBarContainer } from './styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { TierLevel } from 'apis/referrals/types';
import { getBoostedCommissionPct } from '../../util';
import { Box } from '@mui/material';
import { ca } from 'date-fns/locale';
import { calculateLayerValue } from './util';

const TierBar = ({
  tier,
  serviceCommission,
  boost,
  tiers,
  minHeight = 32,
  maxHeight = 240,
  width = 60,
  showArrow = true,
  minOpacity = 0.2,
  specialBoost = false,
}: {
  tier: TierLevel;
  tiers: TierLevel[];
  minHeight?: number;
  maxHeight?: number;
  width?: number;
  showArrow?: boolean;
  minOpacity?: number;
  boost: number;
  serviceCommission: number;
  specialBoost: boolean;
}) => {
  const min = tiers[0].commissionPct;
  const max = tiers[tiers.length - 1].commissionPct;
  const layers =
    serviceCommission > 0 && boost > 1
      ? 3
      : serviceCommission > 0 || boost > 1
      ? 2
      : 1;

  // Adjust this value to control the curve
  const power = 1.74;
  // Bar height
  const height = useMemo(
    () =>
      minHeight * layers +
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

  // Full layer
  const layer1 = useMemo(() => {
    const value = calculateLayerValue(
      1,
      tier.commissionPct,
      boost,
      serviceCommission,
    );
    return { value };
  }, [serviceCommission, tier, boost]);

  const layer2 = useMemo(() => {
    const value = calculateLayerValue(
      2,
      tier.commissionPct,
      boost,
      serviceCommission,
    );
    const layerHeight = (value / layer1.value) * height;
    return {
      value: value !== layer1.value ? value : 0,
      height: layerHeight,
    };
  }, [serviceCommission, tier, boost, layer1]);

  const layer3 = useMemo(() => {
    const value = calculateLayerValue(
      3,
      tier.commissionPct,
      boost,
      serviceCommission,
    );
    const layerHeight = (value / layer1.value) * height;
    return { value: value, height: layerHeight };
  }, [serviceCommission, tier, boost, layer1]);

  console.log(layer1, layer2, layer3);

  return (
    <Box position='relative'>
      <div>
        <TierBarContainer
          opacity={opacity}
          width={width}
          height={height}
          emphasis={showArrow}
        >
          {showArrow && <TierArrow opacity={opacityArrow} />}
        </TierBarContainer>
        <BarContent height={height}>
          {showArrow && tier.commissionPct > 1 && <BoltIcon />}
          <ZigTypography
            color={layers > 1 ? 'greenGraph' : 'neutral200'}
            fontSize={12}
            fontWeight={500}
          >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {layer1.value}%
          </ZigTypography>
        </BarContent>
      </div>
      {layer2.value > 0 && (
        <>
          <TierBarContainer
            opacity={opacity}
            width={width}
            height={layer2.height}
            emphasis={showArrow}
            subLayer={true}
          />
          <BarContent height={layer2.height}>
            <ZigTypography color='neutral200' fontSize={12} fontWeight={500}>
              {/* eslint-disable-next-line i18next/no-literal-string */}
              {layer2.value}%
            </ZigTypography>
          </BarContent>
        </>
      )}
      {layer3.value > 0 && (
        <>
          <TierBarContainer
            opacity={opacity}
            width={width}
            height={layer3.height}
            emphasis={showArrow}
            subLayer={true}
          />
          <BarContent height={layer3.height}>
            <ZigTypography color='neutral200' fontSize={12} fontWeight={500}>
              {/* eslint-disable-next-line i18next/no-literal-string */}
              {layer3.value}%
            </ZigTypography>
          </BarContent>
        </>
      )}
    </Box>
  );
};

export default TierBar;
