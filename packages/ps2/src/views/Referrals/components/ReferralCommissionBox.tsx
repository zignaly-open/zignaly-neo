import React from 'react';
import {
  AltShareCommissionSlider,
  BorderFix,
  BorderFixAlt,
  CommissionBox,
  HowToEarnBox,
  StyledCurrentCommission,
  StyledReferralLinkInvite,
  StyledShareCommissionSlider,
  TiersCardBox,
} from '../styles';
import { useTiersData } from 'apis/referrals/use';
import { Box } from '@mui/material';
import TiersTable from 'views/TraderService/components/ReferralsInviteModal/atoms/TiersTable';
import { useTranslation } from 'react-i18next';
import { DescriptionLine } from 'views/TraderService/components/ReferralsInviteModal/atoms/DescriptionLine';
import { ZigTypography, ZigPriceLabel } from '@zignaly-open/ui';
import CurrentCommission from 'views/TraderService/components/ReferralsInviteModal/atoms/CurrentCommission';
import ReferralLinkInvite from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralLinkInvite';
import { ShareCommissionSlider } from 'views/TraderService/components/ReferralsInviteModal/atoms/ShareCommissionSlider';
import { generatePath } from 'react-router-dom';
import { ROUTE_REFERRALS_INVITE } from 'routes';
import { useCurrentUser } from 'apis/user/use';
import { ReferralRewards, TiersData } from 'apis/referrals/types';
import ReferralTiersCard from './ReferralTiersCard';

const ReferralCommissionBox = ({
  tierData,
  rewardsData,
}: {
  tierData: TiersData;
  rewardsData: ReferralRewards;
}) => {
  const { t } = useTranslation('referrals-trader');
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
    maxCommission,
    maxCommissionWithoutTraderBoost,
    traderBoost,
    isLoading,
    boostRunning,
    inviteLeft,
    tiers,
    boost,
  } = tierData;

  // height={referral.invitedCount > 0 ? 407 : 354}
  return (
    <CommissionBox>
      <Box display='flex' gap='42px'>
        <div>
          <StyledCurrentCommission>
            <CurrentCommission
              showReferrals={referral.invitedCount > 0}
              showWhenYouInvite={false}
              showMaxCommission={!referral.invitedCount}
              earnings={
                referral.invitedCount > 0 ? rewardsData.usdtEarned : null
              }
            />
          </StyledCurrentCommission>
          {referral.invitedCount > 0 ? (
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
          )}
        </div>
        <ReferralTiersCard tierData={tierData} />
      </Box>

      <StyledReferralLinkInvite>
        <ReferralLinkInvite link={link} title={t('share-link')} />
      </StyledReferralLinkInvite>
    </CommissionBox>
  );
};

export default ReferralCommissionBox;
