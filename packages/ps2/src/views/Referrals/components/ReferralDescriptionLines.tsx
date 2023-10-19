import { Box } from '@mui/material';
import { TiersData } from 'apis/referrals/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DescriptionLine } from 'views/TraderService/components/ReferralsInviteModal/atoms/DescriptionLine';

const ReferralDescriptionLines = ({ tiersData }: { tiersData: TiersData }) => {
  const { t } = useTranslation(['referrals-trader', 'referrals']);

  const {
    maxCommission,
    maxCommissionWithoutTraderBoost,
    boostRunning,
    tiers,
  } = tiersData;
  const { invitees } = tiers[tiers.length - 1];

  return (
    <Box display='flex' flexDirection={'column'} gap='2px'>
      <DescriptionLine
        text={t('earn-success-fees')}
        tooltip={t('tooltips.earn-success-fees')}
        id='referrals__earn-success-fees'
      />
      {boostRunning ? (
        <DescriptionLine
          text={t('invite-and-earn-1-week', {
            invite: invitees,
            commission: maxCommissionWithoutTraderBoost,
          })}
          tooltip={t('tooltips.invite-and-earn-1-week', {
            invite: invitees,
            commission: maxCommissionWithoutTraderBoost,
          })}
          id='referrals__invite-and-earn-1-week'
        />
      ) : (
        <DescriptionLine
          text={t('invite-and-earn', {
            invite: invitees,
            commission: maxCommissionWithoutTraderBoost,
          })}
          tooltip={t('tooltips.invite-and-earn', {
            invite: invitees,
            commission: maxCommissionWithoutTraderBoost,
          })}
          id='referrals__invite-and-earn'
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
        id='referrals__invite-and-earn-trader-boost'
      />
    </Box>
  );
};

export default ReferralDescriptionLines;
