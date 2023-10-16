import React from 'react';
import { HowToEarnBox } from '../styles';
import { useTiersData } from 'apis/referrals/use';
import { Box } from '@mui/material';
import TiersTable from 'views/TraderService/components/ReferralsInviteModal/atoms/TiersTable';
import { useTranslation } from 'react-i18next';
import { DescriptionLine } from 'views/TraderService/components/ReferralsInviteModal/atoms/DescriptionLine';

const ReferralHowToEarn = () => {
  const { t } = useTranslation('referrals-trader');

  const {
    referral,
    maxCommission,
    maxCommissionWithoutTraderBoost,
    traderBoost,
    isLoading,
    boostRunning,
    inviteLeft,
    tiers,
    boost,
  } = useTiersData();
  const { invitees } = tiers[tiers.length - 1];

  return (
    <HowToEarnBox>
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <DescriptionLine
          text={t('earn-success-fees')}
          tooltip={t('tooltips.earn-success-fees')}
          id='referrals-invite-modal__earn-success-fees'
        />
        {boostRunning && (
          <DescriptionLine
            text={t('invite-and-earn-1-week', {
              invite: invitees,
              commission: maxCommissionWithoutTraderBoost,
            })}
            tooltip={t('tooltips.invite-and-earn-1-week', {
              invite: invitees,
              commission: maxCommissionWithoutTraderBoost,
            })}
            id='referrals-invite-modal__invite-and-earn-1-week'
          />
        )}
        <DescriptionLine
          text={t('when-trader-matches', {
            commission: maxCommission,
          })}
          tooltip={t('tooltips.invite-and-earn', {
            invite: invitees,
            commission: maxCommission,
          })}
          id='referrals-invite-modal__invite-and-earn-trader-boost'
        />
        <TiersTable
          tiers={tiers}
          referral={referral}
          traderBoost={traderBoost}
          boost={boost}
          boostRunning={boostRunning}
        />
      </Box>
    </HowToEarnBox>
  );
};

export default ReferralHowToEarn;
