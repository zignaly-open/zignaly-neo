import React from 'react';
import { TiersCardBox } from '../styles';
import { Box } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import MiniTierBar from 'views/TraderService/components/ReferralsInviteModal/atoms/MiniTierBar';
import { ChevronRight } from '@mui/icons-material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import BoostTimer from 'views/TraderService/components/ReferralsInviteModal/atoms/BoostTimer';
import { TiersData } from 'apis/referrals/types';

const ReferralTiersCard = ({ tierData }: { tierData: TiersData }) => {
  const { t } = useTranslation('referrals-trader');

  const {
    referral,
    maxCommission,
    maxCommissionWithoutTraderBoost,
    traderBoost,
    isLoading,
    boostRunning,
    currentDate,
    boostEndsDate,
    inviteLeft,
    tiers,
    boost,
  } = tierData;

  return (
    <TiersCardBox>
      {boostRunning && (
        <BoostTimer boostEndsDate={boostEndsDate} currentDate={currentDate} />
      )}
      <ZigTypography
        fontSize={14}
        fontWeight={500}
        textAlign={'center'}
        mt='5px'
      >
        <Trans
          i18nKey={'invite-people-1-week'}
          t={t}
          values={{
            invite: tiers[tiers.length - 1].invitees,
            commission: maxCommission,
          }}
        >
          <ZigTypography color='#25b990' fontWeight={600} />
        </Trans>
      </ZigTypography>
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'flex-end'}
      >
        {tiers?.map((tier, tierIndex) => (
          <MiniTierBar
            width={30}
            minFontSize={7}
            maxFontSize={8.5}
            maxHeight={88}
            minHeight={20}
            miniVariant={true}
            showArrow={tierIndex === tiers.length - 1}
            tier={tier}
            referral={referral}
            tiers={tiers}
            traderBoost={0}
            boost={boost}
          />
        ))}
      </Box>
      <ZigButton
        variant={'text'}
        sx={{ fontSize: '12px !important', marginTop: '12px' }}
        endIcon={
          <ChevronRight
            sx={{
              color: 'links',
              fill: 'currentColor !important',
              fontSize: '12px !important',
            }}
          />
        }
        id='referrals-invite-modal__terms-link'
      >
        {t('how-it-works')}
      </ZigButton>
    </TiersCardBox>
  );
};

export default ReferralTiersCard;
