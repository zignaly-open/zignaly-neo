/* eslint-disable i18next/no-literal-string */
import { Box, LinearProgress, Tooltip } from '@mui/material';
import { ZignalyLogo, ZigTypography } from '@zignaly-open/ui';
import { TierLevels, ReferralRewards } from 'apis/referrals/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCompactNumber } from 'views/Dashboard/components/MyDashboard/util';
import ZModal from '../../../components/ZModal';
import { ZDialogProps } from '../../../components/ZModal/types';
import { TooltipIcon } from '../styles';
import TierBar from './TierBar';
import { TierBoost } from '../atoms';
import { numericFormatter } from 'react-number-format';

const TiersModal: React.FC<
  ZDialogProps & { tiers: TierLevels; rewards: ReferralRewards }
> = ({ tiers, rewards, ...props }) => {
  const { t } = useTranslation(['referrals', 'pages']);

  const currentLevelIndex = tiers.findIndex(
    (tier) => tier.id === rewards.tierLevelId,
  );
  const currentLevel = tiers[currentLevelIndex];
  const nextLevel =
    currentLevelIndex < tiers.length ? tiers[currentLevelIndex + 1] : null;
  // const showAumProgress = nextLevel && rewards.zigBalance < currentLevel.minZig;
  const showAumProgress =
    currentLevelIndex > 0 && rewards.zigBalance < currentLevel.minZig;
  const min = showAumProgress ? nextLevel.minAum : nextLevel.minZig;
  const current = showAumProgress ? rewards.usdtAum : rewards.zigBalance;
  console.log(current, min, showAumProgress);

  return (
    <ZModal wide {...props} title={t('boost-title')} titleAlign='center'>
      <Box
        display='flex'
        alignItems='center'
        flexDirection='column'
        textAlign='center'
      >
        <ZigTypography color='neutral300' variant='h3' mt={3}>
          {t('boost-desc')}
        </ZigTypography>
        {nextLevel && (
          <>
            <Box
              mt={3}
              sx={{
                backgroundColor: (theme) => `${theme.palette.neutral500}1a`,
              }}
              borderRadius='5px'
              py={'9px'}
              px={'20px'}
            >
              <Box display='flex' alignItems='center' gap={0.5}>
                <ZigTypography color='greenGraph' variant='h3'>
                  {numericFormatter(current.toString(), {
                    thousandSeparator: true,
                    prefix: showAumProgress ? '$' : '',
                    decimalScale: 2,
                  })}
                  {' / '}
                  {numericFormatter(min.toString(), {
                    thousandSeparator: true,
                    prefix: showAumProgress ? '$' : '',
                    suffix: showAumProgress ? '' : ' ZIG',
                    decimalScale: 2,
                  })}
                </ZigTypography>
                {t('to-next-boost')}
              </Box>
            </Box>
            <Box display='flex' alignItems='flex-end'>
              <TierBoost
                label={t('current-tier')}
                value={currentLevel.tierLevelFactor}
              />
              <LinearProgress
                sx={{
                  width: '304px',
                  margin: '0 28px',
                }}
                value={(current * 100) / min}
                variant='determinate'
              />
              <TierBoost
                label={t('next-tier')}
                value={nextLevel.tierLevelFactor}
              />
            </Box>
          </>
        )}
        <ZigTypography color='neutral200' variant='h2' mt='70px' mb='26px'>
          {t('boost-tiers')}
        </ZigTypography>

        <Box display='flex'>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='flex-end'
            mr='6px'
          >
            <ZigTypography fontWeight={500} variant='body2' textAlign='end'>
              {t('zig-held')}
              <Tooltip title={t('zig-held-tooltip')}>
                <TooltipIcon />
              </Tooltip>
            </ZigTypography>
            <ZigTypography
              color='neutral400'
              fontWeight={400}
              variant='h5'
              lineHeight='11px'
            >
              {t('or')}
            </ZigTypography>
            <ZigTypography
              fontWeight={500}
              variant='body2'
              mt='2px'
              textAlign='end'
            >
              {t('AUM')}
              <Tooltip title={t('AUM-tooltip')}>
                <TooltipIcon />
              </Tooltip>
            </ZigTypography>
          </Box>
          <Box display='flex'>
            {tiers?.slice(1, tiers.length).map((tier) => (
              <Box
                key={tier.id}
                display='flex'
                flexDirection='column'
                justifyContent='flex-end'
              >
                <TierBar
                  tier={tier}
                  min={tiers[1].tierLevelFactor}
                  max={tiers[tiers.length - 1].tierLevelFactor}
                />
                <Box
                  display='flex'
                  alignItems='center'
                  gap={0.5}
                  justifyContent='center'
                  mt={1}
                  mb={1.25}
                >
                  <ZignalyLogo />
                  <ZigTypography
                    color='neutral400'
                    fontSize={14}
                    fontWeight={500}
                  >
                    {formatCompactNumber(tier.minZig)}
                  </ZigTypography>
                </Box>
                <ZigTypography
                  fontSize={14}
                  fontWeight={500}
                  color='highlighted'
                >
                  ${formatCompactNumber(tier.minAum)}
                </ZigTypography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ZModal>
  );
};

export default TiersModal;
