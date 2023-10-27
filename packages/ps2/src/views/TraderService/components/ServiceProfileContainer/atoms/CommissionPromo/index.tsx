import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { ReactComponent as FireIcon } from 'images/referrals/fire.svg';
import { ChevronRight } from '@mui/icons-material';
import {
  ComissionTypography,
  CommissionPromoBox,
  InviteBoxArrow,
} from './styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { useTranslation } from 'react-i18next';

const CommissionPromo = ({
  traderBoost,
  maxCommission,
  inviteLeft,
  onClick,
  id = '',
  showArrow = false,
  showLabel = true,
}: {
  traderBoost: number;
  maxCommission: number;
  inviteLeft?: number;
  onClick?: () => void;
  id?: string;
  showArrow?: boolean;
  showLabel?: boolean;
}) => {
  const { t } = useTranslation('referrals-trader');

  const { length } = (traderBoost + 1).toString();
  let boostFontSize = 18;
  if (length > 3) {
    boostFontSize = 11;
  } else if (length > 2) {
    boostFontSize = 14;
  }

  return (
    <CommissionPromoBox id={id} fullWidth={showLabel}>
      {showArrow && <InviteBoxArrow />}
      <Box
        position='absolute'
        top={0}
        left={12.5}
        bottom={0}
        display={'flex'}
        alignItems={'center'}
      >
        <Box mt={'-9px'}>
          <FireIcon width={42} height={64} id='service-profile__fire-icon' />
        </Box>
        <Box
          position={'absolute'}
          left={'5px'}
          top={24}
          width={'32px'}
          height={'32px'}
          display={'flex'}
          justifyContent={'center'}
          bgcolor={'#bc7725b3'}
          borderRadius={'50%'}
          alignItems={'center'}
        >
          <ZigTypography
            fontWeight={700}
            fontSize={boostFontSize}
            color='#fffc19'
            id='service-profile__comission-multiplier'
          >
            {traderBoost ? `${traderBoost + 1}x` : '%'}
          </ZigTypography>
        </Box>
      </Box>
      {showLabel && (
        <Box>
          <ComissionTypography id='service-profile__comission-text'>
            {traderBoost > 0 && (
              <BoltIcon
                width={'10px'}
                height={'16px'}
                style={{ margin: '0 4px 0 -6px' }}
                id='service-profile__bolt-icon'
              />
            )}
            {t('invite-commission', { pct: maxCommission })}
          </ComissionTypography>
          <ZigTypography
            variant='h4'
            fontWeight={'400'}
            color='neutral200'
            lineHeight={1.28}
            fontSize={'12.5px'}
            sx={{
              cursor: onClick ? 'pointer' : 'default',
            }}
            onClick={onClick}
            id='service-profile__invite-widget-text'
          >
            {t(inviteLeft ? 'invite-count' : 'invite-generic', {
              count: inviteLeft,
              pct: maxCommission,
            })}
            <ChevronRight
              sx={{
                color: 'links',
                display: 'inline-block',
                position: 'absolute',
                bottom: 0,
                marginLeft: '-2px',
                fontSize: '19px',
                marginBottom: '3px',
              }}
            />
          </ZigTypography>
        </Box>
      )}
    </CommissionPromoBox>
  );
};

export default CommissionPromo;
