import { InfoOutlined, Verified } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import {
  ZigPriceLabel,
  ZigTypography,
  ZigUserFilledIcon,
} from '@zignaly-open/ui';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import BoostChip from '../BoostChip';
import BoostTimer from '../BoostTimer';
import { CommissionBoostChip } from '../../styles';
import { Service } from 'apis/service/types';
import { useTiersData } from 'apis/referrals/use';
import { isNumber } from 'lodash-es';

const CurrentCommission = ({
  service,
  showReferrals = true,
  showWhenYouInvite = true,
  showMaxCommission,
  earnings,
}: {
  service?: Service;
  showReferrals?: boolean;
  showWhenYouInvite?: boolean;
  showMaxCommission: boolean;
  earnings?: number;
}) => {
  const { t } = useTranslation('referrals-trader');
  const {
    referral,
    boostEndsDate,
    currentDate,
    boostRunning,
    maxCommission,
    traderBoost,
    inviteLeft,
  } = useTiersData(service?.id);

  return (
    <Box
      width={1}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Box
        display={'flex'}
        width={1}
        justifyContent={'space-evenly'}
        mb={'15px'}
      >
        <Box display='flex' flexDirection={'column'} alignItems={'center'}>
          <Box position={'relative'}>
            <ZigTypography
              textTransform='uppercase'
              variant='h4'
              id='referrals-invite-modal__commission-label'
            >
              {t(showMaxCommission ? 'max-commission' : 'commission-rate')}
            </ZigTypography>
            <Tooltip
              title={t(
                showMaxCommission
                  ? 'tooltips.max-commission'
                  : 'tooltips.commission-rate',
                { commission: maxCommission },
              )}
            >
              <InfoOutlined
                sx={{
                  color: 'neutral300',
                  fontSize: '10px',
                  position: 'absolute',
                  right: -13,
                  top: -5,
                }}
              />
            </Tooltip>
          </Box>
          <ZigTypography
            color='#28ba62'
            letterSpacing='1.49px'
            fontSize={50}
            fontWeight={600}
            pt='20px'
            lineHeight='50px'
            position={'relative'}
            id='referrals-invite-modal__max-commission'
          >
            {maxCommission}
            <ZigTypography
              fontSize={25}
              fontWeight={600}
              color='inherit'
              position={'relative'}
              top='-11px'
              left='1px'
            >
              {'%'}
            </ZigTypography>
            {traderBoost > 0 && (
              <CommissionBoostChip>
                <BoostChip boost={traderBoost + 1} showBolt />
              </CommissionBoostChip>
            )}
          </ZigTypography>
        </Box>
        {showReferrals && (
          <Box display='flex' flexDirection={'column'}>
            <Box position={'relative'}>
              <ZigTypography
                textTransform='uppercase'
                variant='h4'
                id='referrals-invite-modal__referrals-label'
              >
                {t('my-referrals')}
              </ZigTypography>
              <Tooltip title={t('tooltips.number-referrals')}>
                <InfoOutlined
                  sx={{
                    color: 'neutral300',
                    fontSize: '10px',
                    position: 'absolute',
                    right: -13,
                    top: -5,
                  }}
                />
              </Tooltip>
            </Box>

            <Box
              display={'flex'}
              alignItems={'center'}
              flex={1}
              pt={'5px'}
              justifyContent={'center'}
            >
              <ZigUserFilledIcon color='#979ce0' width={18} height={21.5} />
              <ZigTypography
                fontWeight={600}
                variant='h4'
                color='paleBlue'
                fontSize={35}
                pl='9px'
                pr='7px'
                id='referrals-invite-modal__referrals-count'
              >
                {referral.investorsCount}
              </ZigTypography>
              <Verified sx={{ color: '#26c496' }} />
            </Box>
          </Box>
        )}
        {isNumber(earnings) && (
          <Box display='flex' flexDirection={'column'}>
            <ZigTypography
              textTransform='uppercase'
              variant='h4'
              id='referrals-invite-modal__referrals-label'
            >
              {t('earnings')}
            </ZigTypography>
            <Box
              display={'flex'}
              alignItems={'center'}
              flex={1}
              pt={'5px'}
              justifyContent={'center'}
            >
              <ZigPriceLabel
                color={'#28ba62'}
                usd
                showTooltip
                variant={'bigNumber'}
                value={earnings}
                id='referrals-invite-modal__referrals-label'
              />
            </Box>
          </Box>
        )}
      </Box>
      {showWhenYouInvite && inviteLeft > 0 && (
        <>
          <ZigTypography
            color='neutral200'
            variant='h3'
            fontWeight={400}
            id='referrals-invite-modal__when-you-invite'
            textAlign={'center'}
          >
            <Trans
              i18nKey={`${
                referral.investorsCount > 0
                  ? 'get-by-inviting'
                  : 'when-you-invite'
              }${boostRunning ? '-in' : ''}`}
              t={t}
              values={{
                invite: inviteLeft,
                commission: maxCommission,
              }}
            >
              <ZigTypography
                component='span'
                variant='h3'
                fontWeight={400}
                color='#25c89b'
              />
            </Trans>
          </ZigTypography>
          {boostRunning && (
            <BoostTimer
              boostEndsDate={boostEndsDate}
              currentDate={currentDate}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default CurrentCommission;
