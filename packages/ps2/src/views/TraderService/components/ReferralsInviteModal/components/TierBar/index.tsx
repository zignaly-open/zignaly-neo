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
import { Box } from '@mui/material';
import { useTierLayers } from './util';
import { TierBarProps } from './types';
import { UserRate } from './atoms';

const MULTIPLIER = 1.7;

const TierBar = ({
  tier,
  serviceCommission,
  referral,
  tiers,
  minHeight,
  maxHeight,
  width = 60,
  showArrow = true,
  minOpacity = 0.2,
  maxOpacity = 0.8,
  minFontSize = 12,
  maxFontSize = 15.5,
}: TierBarProps) => {
  const boost = referral?.boost;
  const min = tiers[0].commissionPct;
  const max = tiers[tiers.length - 1].commissionPct;

  // replace by number of layers returned by hook?
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

  const [layer1, layer2, layer3] = useTierLayers(
    tiers,
    tier.id,
    boost,
    serviceCommission,
    { minHeight, maxHeight },
  );

  console.log(`\n---\nTier ${tier.id}:`);
  console.table([layer1, layer2, layer3]);

  // Due to using absolute positioning for the bar content (to not apply the opacity to the text / icon),
  // we need to set a min height for the container, which need to be larger if there is a bolt icon (more than 1 layer?)
  // todo: still needed?
  const layer1MinHeight = layers > 1 ? layer2.height + 48 : 0;

  return (
    <div>
      {referral.tierLevelId === tier.id && <UserRate />}
      <Box
        position='relative'
        minHeight={layer1MinHeight}
        height={layer1.height}
      >
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
                layers > 1
                  ? showArrow
                    ? '#28ba62'
                    : 'greenGraph'
                  : 'neutral200'
              }
              fontSize={fontSize}
              fontWeight={showArrow ? 600 : 500}
            >
              {layer1.value}
              {'%'}
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
                  {layer2.value}
                  {'%'}
                </ZigTypography>
              </BarContent>
            </TierBarContainer>
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
                  {layer3.value}
                  {'%'}
                </ZigTypography>
              </BarContent>
            </TierBarContainer>
            {/* <BarContent height={layer3.height} subLayer={true}></BarContent> */}
          </>
        )}
      </Box>
    </div>
  );
};

export default TierBar;
