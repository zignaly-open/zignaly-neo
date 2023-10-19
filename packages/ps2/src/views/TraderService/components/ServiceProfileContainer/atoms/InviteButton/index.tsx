import React from 'react';
import { ZigButton, ZigInviteIcon, ZigTypography } from '@zignaly-open/ui';
import ReferralsInviteModal from '../../../ReferralsInviteModal';
import { ReactComponent as FireIcon } from 'images/referrals/fire.svg';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import useMaybeNavigateNotLoggedIn from 'util/hooks/useMaybeNavigateNotLoggedIn';
import { useZModal } from 'components/ZModal/use';
import { Service } from 'apis/service/types';
import { useIsAuthenticated } from 'apis/user/use';
import { useTranslation } from 'react-i18next';
import { ComissionTypography, InviteBox, InviteBoxArrow } from './styles';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ChevronRight } from '@mui/icons-material';
import BoostTimer from 'views/TraderService/components/ReferralsInviteModal/atoms/BoostTimer';
import { TiersData } from 'apis/referrals/types';

const InviteButton = ({
  service,
  tiersData,
}: {
  service: Service;
  tiersData: TiersData;
}) => {
  const { showModal } = useZModal();
  const navigateIfNotLoggedIn = useMaybeNavigateNotLoggedIn();
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation('referrals-trader');
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('md'));

  const {
    boostRunning,
    currentDate,
    boostEndsDate,
    inviteLeft,
    maxCommission,
    traderBoost,
  } = tiersData;

  const handleClick = () => {
    if (isAuthenticated) {
      showModal(ReferralsInviteModal, {
        service,
      });
    } else {
      navigateIfNotLoggedIn();
    }
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      mb={sm && boostRunning ? '10px' : 0}
    >
      {(traderBoost > 0 || boostRunning) && (
        <InviteBox id='service-profile__invite-widget'>
          <InviteBoxArrow />
          <Box
            position='absolute'
            top={0}
            left={12.5}
            bottom={0}
            display={'flex'}
            alignItems={'center'}
          >
            <Box mt={'-9px'}>
              <FireIcon
                width={42}
                height={64}
                id='service-profile__fire-icon'
              />
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
                fontSize={'18px'}
                color='#fffc19'
                id='service-profile__comission-multiplier'
              >
                {traderBoost ? `${traderBoost + 1}x` : '%'}
              </ZigTypography>
            </Box>
          </Box>
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
                cursor: 'pointer',
              }}
              onClick={handleClick}
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
          {boostRunning && (
            <Box
              position={'absolute'}
              bottom={-30}
              left={0}
              right={0}
              display={'flex'}
              justifyContent={'center'}
            >
              <BoostTimer
                boostEndsDate={boostEndsDate}
                currentDate={currentDate}
              />
            </Box>
          )}
        </InviteBox>
      )}
      <ZigButton
        id='service-profile__invite-button'
        ctaId={'service-profile-invite-button'}
        onClick={handleClick}
        sx={{
          height: '54px',
          minWidth: '63px',
          maxWidth: '63px',
          padding: '0',
          overflow: 'visible',
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={0.5}
          alignItems={'center'}
          justifyContent={'center'}
          mt={'-10px'}
          textTransform={'capitalize'}
        >
          <ZigInviteIcon width={35} height={'100%'} />
          {t('invite')}
        </Box>
      </ZigButton>
    </Box>
  );
};

export default InviteButton;
