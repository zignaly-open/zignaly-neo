import React, { useMemo } from 'react';
import {
  BarContent,
  HighlightRate,
  TierArrow,
  TierBarContainer,
} from './styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { TierLevel } from 'apis/referrals/types';
import { getBoostedCommissionPct } from '../../util';
import { Box } from '@mui/material';
import { ca } from 'date-fns/locale';
import { calculateLayerValue } from './util';
import { TierBarProps } from './types';

const BOLT_SPACE = 80;

const TierBar = ({
  tier,
  serviceCommission,
  referral,
  tiers,
  minHeight = 32,
  maxHeight = 240,
  width = 60,
  showArrow = true,
  minOpacity = 0.2,
  maxOpacity = 0.8,
  minFontSize = 12,
  maxFontSize = 15.5,
  specialBoost = false,
}: TierBarProps) => {
  const boost = referral?.boost;
  const min = tiers[0].commissionPct;
  const max = tiers[tiers.length - 1].commissionPct;
  const layers =
    serviceCommission > 0 && boost > 1
      ? 3
      : serviceCommission > 0 || boost > 1
      ? 2
      : 1;

  // Bar opacity
  const opacityPower = 0.9;
  const opacity = useMemo(
    () =>
      minOpacity +
      Math.pow((tier.commissionPct - min) / (max - min), opacityPower) *
        (maxOpacity - minOpacity),
    [min, max, tier],
  );

  // Bar font size
  const fontSizePower = 0.9;
  const fontSize = useMemo(
    () =>
      minFontSize +
      Math.pow((tier.commissionPct - min) / (max - min), fontSizePower) *
        (maxFontSize - minFontSize),
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

  // Layer 1 (Full bar)
  const layer1 = useMemo(() => {
    const value = calculateLayerValue(
      1,
      tier.commissionPct,
      boost,
      serviceCommission,
    );
    // Adjust this value to control the curve
    const power = 1.74;
    const height =
      minHeight * layers +
      Math.pow((tier.commissionPct - min) / (max - min), power) *
        (maxHeight - minHeight);
    return { value, height };
  }, [min, max, serviceCommission, tier, boost]);

  const layer2 = useMemo(() => {
    const value = calculateLayerValue(
      2,
      tier.commissionPct,
      boost,
      serviceCommission,
    );
    const layerHeight = (value / layer1.value) * layer1.height;
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
    const layerHeight = (value / layer1.value) * layer1.height;
    return { value: value, height: layerHeight };
  }, [serviceCommission, tier, boost, layer1]);

  if (referral.tierLevelId === tier.id) {
    console.log(layer1, layer2, layer3);
  }
  // Due to using absolute positioning for the bar content (to not apply the opacity to the text / icon),
  // we need to set a min height for the container, which need to be larger if there is a bolt icon (more than 1 layer?)
  const layer1MinHeight = layers > 1 ? layer2.height + 48 : 0;

  return (
    <Box position='relative' minHeight={layer1MinHeight}>
      <TierBarContainer
        opacity={opacity}
        width={width}
        height={1}
        emphasis={showArrow}
      >
        {showArrow && <TierArrow opacity={opacityArrow} />}
      </TierBarContainer>
      {referral.tierLevelId === tier.id && (
        <HighlightRate
          height={
            Math.max(
              layer1.height - layer2.height,
              layer1MinHeight - layer2.height,
            ) + 1
          }
          width={width - 3}
        />
      )}
      <BarContent height={1}>
        {layers > 1 && <BoltIcon />}
        <ZigTypography
          color={
            layers > 1 ? (showArrow ? '#28ba62' : 'greenGraph') : 'neutral200'
          }
          fontSize={fontSize}
          fontWeight={showArrow ? 600 : 500}
        >
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {layer1.value}%
        </ZigTypography>
      </BarContent>
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
            <ZigTypography
              color={layers > 2 ? 'greenGraph' : 'neutral200'}
              fontSize={fontSize}
              fontWeight={500}
            >
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
            <ZigTypography
              color='neutral200'
              fontSize={fontSize}
              fontWeight={500}
            >
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
