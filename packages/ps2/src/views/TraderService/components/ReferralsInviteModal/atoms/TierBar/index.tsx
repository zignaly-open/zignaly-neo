import React, { useMemo } from 'react';
import {
  BarContent,
  HighlightRate,
  Overlay,
  TierArrow,
  TierBarContainer,
  AnimatedContainer,
} from './styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useTierLayers } from './util';
import { TierBarProps } from './types';
import { UserRate } from './atoms';

const TierBar = ({
  tier,
  serviceCommission,
  zignalyCommission,
  referral,
  boost,
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
  const min = tiers[0].commissionPct;
  const max = tiers[tiers.length - 1].commissionPct;

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

  const layers = useTierLayers(
    tiers,
    tier.id,
    boost,
    serviceCommission,
    zignalyCommission,
    { minHeight, maxHeight },
  );
  const [layer1, layer2, layer3] = layers;
  const layersCount = layers.filter((l) => l.value > 0).length;

  return (
    <AnimatedContainer>
      {referral.tierLevelId === tier.id && <UserRate />}
      <Box position='relative' height={layer1.height}>
        <TierBarContainer
          opacity={opacity}
          width={width}
          height={1}
          emphasis={showArrow}
        >
          <BarContent>
            {serviceCommission > 0 && <BoltIcon />}
            <ZigTypography
              color={
                layersCount > 1
                  ? showArrow
                    ? '#28ba62'
                    : 'greenGraph'
                  : 'neutral200'
              }
              fontSize={fontSize}
              fontWeight={showArrow ? 600 : 500}
            >
              {Math.floor(layer1.value)}
              {'%'}
            </ZigTypography>
          </BarContent>
          <Overlay opacity={opacity} />
          {referral.tierLevelId === tier.id && (
            <HighlightRate
              height={layer1.height - layer2.height}
              width={width - 3}
            />
          )}
          {showArrow && <TierArrow />}
        </TierBarContainer>
        {[layer2, layer3].map(
          (layer, index) =>
            layer.value > 0 && (
              <TierBarContainer
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                opacity={opacity}
                width={width}
                height={layer.height}
                emphasis={showArrow}
                subLayer={true}
              >
                <Overlay opacity={opacity} />
                <BarContent subLayer={true}>
                  <ZigTypography
                    color={
                      index === 0 && layersCount > 2
                        ? 'greenGraph'
                        : 'neutral200'
                    }
                    fontSize={fontSize}
                    fontWeight={500}
                  >
                    {Math.floor(layer.value)}
                    {'%'}
                  </ZigTypography>
                </BarContent>
              </TierBarContainer>
            ),
        )}
      </Box>
    </AnimatedContainer>
  );
};

export default TierBar;
