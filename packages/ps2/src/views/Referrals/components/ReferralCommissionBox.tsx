import React, { useCallback } from 'react';
import {
  AltShareCommissionSlider,
  BorderFix,
  BorderFixAlt,
  CommissionBox,
  StyledCurrentCommission,
  StyledReferralLinkInvite,
  StyledShareCommissionSlider,
} from '../styles';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CurrentCommission from 'views/TraderService/components/ReferralsInviteModal/atoms/CurrentCommission';
import ReferralLinkInvite from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralLinkInvite';
import { ShareCommissionSlider } from 'views/TraderService/components/ReferralsInviteModal/atoms/ShareCommissionSlider';
import { generatePath } from 'react-router-dom';
import { ROUTE_REFERRALS_INVITE } from 'routes';
import { useCurrentUser } from 'apis/user/use';
import { ReferralRewards, TiersData } from 'apis/referrals/types';
import ReferralTiersCard from './ReferralTiersCard';

const ReferralCommissionBox = ({
  tiersData,
  rewardsData,
}: {
  tiersData: TiersData;
  rewardsData: ReferralRewards;
}) => {
  const { t } = useTranslation('referrals');
  const baseUrl =
    window.location.protocol +
    '//' +
    (window.location.host?.includes('localhost')
      ? 'app.zignaly.com'
      : window.location.host);
  const { refCode } = useCurrentUser();

  const link =
    baseUrl + generatePath(ROUTE_REFERRALS_INVITE, { key: refCode ?? '' });

  const {
    referral,
    maxCommission: maxCommissionOrig,
    maxCommissionWithoutTraderBoost,
    traderBoost: traderBoostOrig,
  } = tiersData;

  let maxCommission = maxCommissionOrig;
  let traderBoost = traderBoostOrig;

  if (referral.invitedCount) {
    // Don't use trader boost if there are invited users
    maxCommission = maxCommissionWithoutTraderBoost;
    traderBoost = 0;
  }

  const CustomSlider = useCallback(() => {
    return referral.invitedCount > 0 ? (
      <AltShareCommissionSlider>
        <BorderFixAlt />
        <ShareCommissionSlider
          discountPct={referral.discountPct}
          max={maxCommission}
        />
      </AltShareCommissionSlider>
    ) : (
      <StyledShareCommissionSlider>
        <BorderFix />
        <ShareCommissionSlider
          discountPct={referral.discountPct}
          max={maxCommission}
        />
      </StyledShareCommissionSlider>
    );
  }, [referral.discountPct, maxCommission]);

  return (
    <CommissionBox>
      <Box display='flex' gap='42px'>
        <Box
          display='flex'
          {...(referral.invitedCount > 0
            ? {
                flexDirection: 'column',
              }
            : {
                alignItems: 'center',
                gap: '30px',
              })}
        >
          <StyledCurrentCommission>
            <CurrentCommission
              tiersData={{
                ...tiersData,
                maxCommission,
                traderBoost,
              }}
              showReferrals={referral.invitedCount > 0}
              showWhenYouInvite={!referral.invitedCount}
              showMaxCommission={!referral.invitedCount}
              earnings={
                referral.invitedCount > 0 ? rewardsData.usdtEarned : null
              }
            />
          </StyledCurrentCommission>
          <CustomSlider />
        </Box>
        {referral.invitedCount > 0 && (
          <ReferralTiersCard tiersData={tiersData} />
        )}
      </Box>

      <StyledReferralLinkInvite mt={referral.invitedCount ? '19px' : '36px'}>
        <ReferralLinkInvite link={link} title={t('share-link')} />
      </StyledReferralLinkInvite>
    </CommissionBox>
  );
};

export default ReferralCommissionBox;
