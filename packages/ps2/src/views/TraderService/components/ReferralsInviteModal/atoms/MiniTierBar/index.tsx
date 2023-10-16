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
import { useTranslation } from 'react-i18next';

const MiniTierBar = ({
  tier,
  traderBoost,
  referral,
  boost,
  tiers,
  minHeight,
  maxHeight,
  width = 60,
  showArrow = true,
  minOpacity = 0.1,
  maxOpacity = 0.4,
  minFontSize = 12,
  maxFontSize = 15.5,
  miniVariant = false,
}: TierBarProps) => {
  const { t } = useTranslation('referrals-trader');
  const min = tiers[0].commissionPct;
  const lastTier = tiers[tiers.length - 1];
  const max = lastTier.commissionPct;

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

  const layers = useTierLayers(tiers, tier.id, boost, traderBoost, {
    minHeight,
    maxHeight,
  });

  //   .map((l, i) =>
  //   i === 0 && tier.id !== lastTier.id ? { ...l, value: 0, height: 0 } : l,
  // );
  const [layer1, layer2, layer3] = layers;
  const layersCount = layers.filter((l) => l.value > 0).length;
  const hideOtherLayers = layersCount > 1 && tier.id !== lastTier.id;
  /**
   * Uncomment to debug layers
   *  */
  console.log(`\n---\nTier ${tier.id}:`);
  console.table(layers);

  return (
    <AnimatedContainer>
      <Box position='relative' height={layer1.height}>
        <TierBarContainer
          opacity={opacity}
          width={width}
          height={1}
          emphasis={showArrow}
          hide={hideOtherLayers}
        >
          {!hideOtherLayers && (
            <>
              <BarContent>
                {traderBoost > 0 && <BoltIcon width={'10px'} height={'16px'} />}
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
                  className='tier-bar__value'
                  lineHeight={'16px'}
                >
                  {Math.floor(layer1.value)}
                  {'%'}
                </ZigTypography>
                <ZigTypography
                  color={'neutral100'}
                  fontSize={7}
                  fontWeight={600}
                  className='tier-bar__1-week'
                  lineHeight={'14px'}
                >
                  {t('1-week')}
                </ZigTypography>
              </BarContent>
              <Overlay opacity={opacity} />
              {showArrow && layersCount === 1 && <TierArrow />}
            </>
          )}
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
                {showArrow && layersCount > 1 && <TierArrow />}
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

export default MiniTierBar;
