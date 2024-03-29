import React, { useMemo } from 'react';
import { TierArrow, TierBarContainer } from './styles';
import { ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { TierBarProps } from './types';
import { useTranslation } from 'react-i18next';
import { useTierLayers } from '../TierBar/util';
import { BarContent, Overlay } from '../TierBar/styles';

const MiniTierBar = ({
  tier,
  traderBoost,
  boost,
  tiers,
  minHeight,
  maxHeight,
  width = 32,
  showArrow = true,
  minFontSize = 7,
  maxFontSize = 10,
  boostRunning,
}: TierBarProps & {
  boostRunning: boolean;
}) => {
  const { t } = useTranslation('referrals');
  const min = tiers[0].commissionPct;
  const lastTier = tiers[tiers.length - 1];
  const max = lastTier.commissionPct;
  const opacity = showArrow ? 0.6 : 0.5;

  // Bar font size
  const fontSizePower = 0.9;
  const fontSize = useMemo(
    () =>
      minFontSize +
      Math.pow((tier.commissionPct - min) / (max - min), fontSizePower) *
        (maxFontSize - minFontSize),
    [min, max, tier],
  );

  // Value top margin
  const textMarginPower = 0.9;
  const minTextMargin = 1;
  const maxTextMargin = 6.5;
  const textMargin = useMemo(
    () =>
      minTextMargin +
      Math.pow((tier.commissionPct - min) / (max - min), textMarginPower) *
        (maxTextMargin - minTextMargin),
    [min, max, tier],
  );

  const layers = useTierLayers(tiers, tier.id, boost, traderBoost, {
    minHeight,
    maxHeight,
    miniVariant: true,
  });

  const [layer1, layer2] = layers;
  // Hide top layer if there is a boost running, except for the last tier
  const hideTopLayer = boostRunning && tier.id !== lastTier.id;
  // Or if the boost if unlocked, only show that layer
  const hideBottomLayer = !hideTopLayer && boost > 1 && !boostRunning;

  /**
   * Uncomment to debug layers
   *  */
  // console.log(`\n---\nTier ${tier.id}:`);
  // console.table(layers);

  return (
    <Box position='relative' height={layer1.height}>
      <TierBarContainer
        opacity={opacity}
        width={width}
        height={1}
        emphasis={showArrow}
        hide={hideTopLayer}
      >
        {!hideTopLayer && (
          <>
            <BarContent>
              <ZigTypography
                color={showArrow ? '#16dc65' : 'greenGraph'}
                fontSize={fontSize}
                fontWeight={showArrow ? 600 : 500}
                className='tier-bar__value'
                lineHeight={'14px'}
                letterSpacing={'-0.1px'}
                mt={hideBottomLayer || !boostRunning ? `${textMargin}px` : 0}
              >
                {Math.floor(layer1.value)}
                {'%'}
              </ZigTypography>
              {showArrow && boostRunning && (
                <ZigTypography
                  color={'neutral100'}
                  fontSize={7}
                  fontWeight={500}
                  className='tier-bar__1-week'
                  lineHeight={'14px'}
                  letterSpacing={'0.2px'}
                  mt={'-3px'}
                >
                  {t('1-week').length > 6
                    ? t('1-week').substring(0, 6) + '.'
                    : t('1-week')}
                </ZigTypography>
              )}
            </BarContent>
            <Overlay opacity={opacity} />
            {showArrow && hideBottomLayer && <TierArrow />}
          </>
        )}
      </TierBarContainer>

      {layer2.value > 0 && !hideBottomLayer && (
        <TierBarContainer
          opacity={opacity}
          width={width}
          height={layer2.height}
          emphasis={showArrow}
          subLayer={true}
        >
          <Overlay opacity={opacity} />
          <BarContent subLayer={true}>
            <ZigTypography
              color={'greenGraph'}
              fontSize={fontSize}
              fontWeight={500}
              mt={`${textMargin}px`}
              lineHeight={'14px'}
            >
              {Math.floor(layer2.value)}
              {'%'}
            </ZigTypography>
          </BarContent>
          {showArrow && hideTopLayer && <TierArrow subLayer={true} />}
        </TierBarContainer>
      )}
    </Box>
  );
};

export default MiniTierBar;
