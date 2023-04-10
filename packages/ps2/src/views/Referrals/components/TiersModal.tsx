/* eslint-disable i18next/no-literal-string */
import { Box, LinearProgress, Tooltip } from '@mui/material';
import { ZigButton, ZignalyLogo, ZigTypography } from '@zignaly-open/ui';
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
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
import { useZModal } from 'components/ZModal/use';
import BuyZigModal from 'views/Wallet/modals/BuyZigModal';

const TiersModal: React.FC<
  ZDialogProps & { tiers: TierLevels; rewards: ReferralRewards }
> = ({ tiers, rewards, close, ...props }) => {
  const { t } = useTranslation(['referrals', 'pages']);
  const { showModal } = useZModal();

  const currentLevelIndex = tiers.findIndex(
    (tier) => tier.id === rewards.tierLevelId,
  );
  const currentLevel = tiers[currentLevelIndex];
  const nextLevel = tiers[currentLevelIndex + 1];
  const showAumProgress =
    currentLevelIndex > 0 && rewards.zigBalance < currentLevel.minZig;
  const min = showAumProgress ? nextLevel?.minAum : nextLevel?.minZig;
  const current = showAumProgress ? rewards.usdtAum : rewards.zigBalance;

  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={t('boost-title')}
      titleAlign='center'
    >
      <Box
        display='flex'
        alignItems='center'
        flexDirection='column'
        textAlign='center'
      >
        <ZigTypography color='neutral300' variant='h3' mt={3}>
          {t('boost-desc')}
        </ZigTypography>
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
            <ZignalyLogo style={{ marginRight: '8px' }} />
            <ZigTypography color='greenGraph' variant='h3'>
              {numericFormatter(current.toString(), {
                thousandSeparator: true,
                prefix: showAumProgress ? '$' : '',
                suffix: showAumProgress || nextLevel ? '' : ' ZIG',
                decimalScale: 2,
              })}
              {nextLevel && (
                <>
                  {' / '}
                  {numericFormatter(min.toString(), {
                    thousandSeparator: true,
                    prefix: showAumProgress ? '$' : '',
                    suffix: showAumProgress ? '' : ' ZIG',
                    decimalScale: 2,
                  })}
                </>
              )}
            </ZigTypography>
            {nextLevel && t('to-next-boost')}
          </Box>
        </Box>
        <Box display='flex' alignItems='flex-end'>
          <TierBoost
            label={t('current-tier')}
            value={currentLevel.tierLevelFactor}
            traderRebateFee={rewards.configuration.traderRebateFee}
          />
          <LinearProgress
            sx={{
              width: '304px',
              margin: '0 28px 2px',
            }}
            value={(current * 100) / min}
            variant='determinate'
          />
          <TierBoost
            label={t('next-tier')}
            value={nextLevel?.tierLevelFactor}
            traderRebateFee={rewards.configuration.traderRebateFee}
          />
        </Box>

        <ZigTypography color='neutral200' variant='h2' mt='42px' mb='4px'>
          {t('boost-tiers')}
        </ZigTypography>

        <Box display='flex' mb={-1}>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='flex-end'
            mr='6px'
            alignSelf='flex-end'
          >
            <ZigTypography
              fontWeight={500}
              variant='body2'
              textAlign='end'
              lineHeight='24px'
            >
              {t('zig-held')}
              <Tooltip title={t('zig-held-tooltip')}>
                <TooltipIcon />
              </Tooltip>
            </ZigTypography>
            <ZigTypography
              color='neutral400'
              fontWeight={400}
              variant='h5'
              lineHeight='8px'
            >
              {t('or')}
            </ZigTypography>
            <ZigTypography
              fontWeight={500}
              variant='body2'
              mt='2px'
              textAlign='end'
              lineHeight='24px'
            >
              {t('AUM')}
              <Tooltip title={t('AUM-tooltip')}>
                <TooltipIcon />
              </Tooltip>
            </ZigTypography>
          </Box>
          <Box display='flex'>
            {tiers?.map((tier) => (
              <Box
                key={tier.id}
                display='flex'
                flexDirection='column'
                justifyContent='flex-end'
              >
                <TierBar tier={tier} tiers={tiers} />
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
                    fontSize={13}
                    fontWeight={500}
                  >
                    {formatCompactNumber(tier.minZig)}
                  </ZigTypography>
                </Box>
                <ZigTypography
                  fontSize={13}
                  fontWeight={500}
                  color='highlighted'
                >
                  ${formatCompactNumber(tier.minAum)}
                </ZigTypography>
              </Box>
            ))}
          </Box>
        </Box>
        <ModalActionsNew>
          <ZigButton
            id={'tiers__buy'}
            variant='contained'
            size='large'
            onClick={() => {
              showModal(BuyZigModal, {
                ctaId: 'tiers-buy-zig',
              });
            }}
          >
            {t('buy-zig')}
          </ZigButton>
          <ZigButton
            onClick={close}
            variant='outlined'
            size='large'
            id={'tiers__cancel'}
          >
            {t('action:close')}
          </ZigButton>
        </ModalActionsNew>
      </Box>
    </ZModal>
  );
};

export default TiersModal;
