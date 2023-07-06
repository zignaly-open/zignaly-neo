import React, { useMemo } from 'react';
import {
  BarContent,
  HighlightRate,
  Overlay,
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

const BOLT_SPACE = 18;
const MIN_HEIGHT = 48;
const MULTIPLIER = 1.7;

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
  const minHeightConstraints =
    layers * minHeight + (layers > 1 ? BOLT_SPACE : 0);

  // Bar opacity
  const opacityPower = 0.9;
  const opacity = useMemo(
    () =>
      minOpacity +
      Math.pow((tier.commissionPct - min) / (max - min), opacityPower) *
        (maxOpacity - minOpacity),
    [min, max, tier],
  );
  console.log(opacity);

  const mul = useMemo(
    () => 1 + Math.pow((tier.commissionPct - min) / (max - min), 1) * (1 - 0),
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
  // todo: review
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
    // const lastLayer = layers === 3 ? layer3 : layers === 2 ? layer2 : null;

    // Adjust this value to control the curve
    const power = 1;
    const height =
      minHeightConstraints +
      Math.pow((tier.commissionPct - min) / (max - min), power) *
        (maxHeight - minHeightConstraints);
    console.log(minHeightConstraints);
    return { value, height };
  }, [min, max, serviceCommission, tier, boost]);

  const layer2 = useMemo(() => {
    const value = calculateLayerValue(
      2,
      tier.commissionPct,
      boost,
      serviceCommission,
    );
    const height = (value / layer1.value) * layer1.height;

    return {
      value: value !== layer1.value ? value : 0,
      height: Math.max(height, minHeight * (layers - 1)),
    };
  }, [serviceCommission, tier, boost, layer1]);

  const layer3 = useMemo(() => {
    const value = calculateLayerValue(
      3,
      tier.commissionPct,
      boost,
      serviceCommission,
    );
    // const height =
    //   Math.min(value / layer1.value, 0.25) * layer1.height * MULTIPLIER;
    const height = (value / layer1.value) * layer1.height;
    return {
      value: value,
      height: Math.max(height, minHeight * (layers - 2)),
    };
  }, [serviceCommission, tier, boost, layer1]);

  // if (referral.tierLevelId === tier.id) {
  //   console.log(layer1, layer2, layer3);
  // }
  console.log(`\n---\nTier ${tier.id}:`);
  console.table([layer1, layer2, layer3]);
  // Due to using absolute positioning for the bar content (to not apply the opacity to the text / icon),
  // we need to set a min height for the container, which need to be larger if there is a bolt icon (more than 1 layer?)
  const layer1MinHeight = layers > 1 ? layer2.height + 48 : 0;

  return (
    <Box position='relative' minHeight={layer1MinHeight} height={layer1.height}>
      <TierBarContainer
        opacity={opacity}
        width={width}
        height={1}
        emphasis={showArrow}
      >
        <BarContent>
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
        {showArrow && <TierArrow opacity={opacityArrow} />}
        <Overlay opacity={opacity} />
      </TierBarContainer>
      {referral.tierLevelId === tier.id && (
        <HighlightRate
          height={Math.max(
            layer1.height - layer2.height,
            layer1MinHeight - layer2.height,
          )}
          width={width - 3}
        />
      )}

      {layer2.value > 0 && (
        <>
          <TierBarContainer
            // opacity={showArrow ? 0.45 : opacity}
            // opacity={opacity / 2}
            opacity={opacity}
            width={width}
            height={layer2.height}
            emphasis={showArrow}
            subLayer={true}
          >
            <Overlay opacity={opacity} />
            <BarContent subLayer={true}>
              <ZigTypography
                color={layers > 2 ? 'greenGraph' : 'neutral200'}
                fontSize={fontSize}
                fontWeight={500}
              >
                {/* eslint-disable-next-line i18next/no-literal-string */}
                {layer2.value}%
              </ZigTypography>
            </BarContent>
          </TierBarContainer>
          {/* <BarContent
            height={layer2.height}
            subLayer={true}
            pb={`${layer3.height}px`}
          ></BarContent> */}
        </>
      )}
      {layer3.value > 0 && (
        <>
          <TierBarContainer
            // opacity={showArrow ? 0.3 : opacity}
            // opacity={opacity / 2.7}
            opacity={opacity}
            width={width}
            height={layer3.height}
            emphasis={showArrow}
            subLayer={true}
          >
            <Overlay opacity={opacity} />
            <BarContent subLayer={true}>
              <ZigTypography
                color='neutral200'
                fontSize={fontSize}
                fontWeight={500}
              >
                {/* eslint-disable-next-line i18next/no-literal-string */}
                {layer3.value}%
              </ZigTypography>
            </BarContent>
          </TierBarContainer>

          {/* <BarContent height={layer3.height} subLayer={true}></BarContent> */}
        </>
      )}
    </Box>
  );
};

export default TierBar;
