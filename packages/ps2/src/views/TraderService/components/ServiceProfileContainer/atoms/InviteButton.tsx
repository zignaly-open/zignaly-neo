import React from 'react';
import { ZigButton, ZigInviteIcon, ZigTypography } from '@zignaly-open/ui';
import ReferralsInviteModal from '../../ReferralsInviteModal';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import useMaybeNavigateNotLoggedIn from 'util/hooks/useMaybeNavigateNotLoggedIn';
import { useZModal } from 'components/ZModal/use';
import { Service } from 'apis/service/types';
import { useIsAuthenticated } from 'apis/user/use';
import { useTranslation } from 'react-i18next';
import { InviteBox, InviteBoxArrow } from './CommissionPromo/styles';
import BoostTimer from 'views/TraderService/components/ReferralsInviteModal/atoms/BoostTimer';
import { TiersData } from 'apis/referrals/types';
import CommissionPromo from './CommissionPromo';

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
        <Box>
          <CommissionPromo
            traderBoost={traderBoost}
            inviteLeft={inviteLeft}
            maxCommission={maxCommission}
            onClick={handleClick}
            id='service-profile__invite-widget'
            showArrow={true}
          />
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
        </Box>
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
