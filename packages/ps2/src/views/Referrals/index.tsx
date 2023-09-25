import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import {
  useReferralHistoryQuery,
  useReferralRewardsQuery,
} from '../../apis/referrals/api';
import { Box, Grid } from '@mui/material';
import { PageContainer, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import GroupIcon from '@mui/icons-material/Group';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { useCurrentUser } from '../../apis/user/use';
import { generatePath } from 'react-router-dom';
import { ROUTE_REFERRALS_INVITE } from '../../routes';
import { TotalBox } from './atoms';
import { ReferralHistory, ReferralRewards } from '../../apis/referrals/types';
import ReferralTable from './components/ReferralTable';
import ReferralSuccessStep from './components/ReferralSuccessStep';
import { useTiersData } from 'apis/referrals/use';
import {
  BorderFix,
  CommissionBox,
  StyledCurrentCommission,
  StyledReferralLinkInvite,
  StyledShareCommissionSlider,
} from './styles';
import { ShareCommissionSlider } from 'views/TraderService/components/ReferralsInviteModal/atoms/ShareCommissionSlider';
import ReferralLinkInvite from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralLinkInvite';
import CurrentCommission from 'views/TraderService/components/ReferralsInviteModal/CurrentCommission';
import ReferralLimitedTime from './components/ReferralLimitedTime';

const Referrals: React.FC = () => {
  const { t } = useTranslation(['referrals', 'pages']);
  const rewards = useReferralRewardsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const history = useReferralHistoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { refCode } = useCurrentUser();

  useTitle(t('pages:referrals'));

  const baseUrl =
    window.location.protocol +
    '//' +
    (window.location.host?.includes('localhost')
      ? 'app.zignaly.com'
      : window.location.host);

  const link =
    baseUrl + generatePath(ROUTE_REFERRALS_INVITE, { key: refCode ?? '' });

  const {
    referral,
    maxCommission,
    maxCommissionWithoutTraderBoost,
    traderBoostMultiplier,
    isLoading,
    boostRunning,
    inviteLeft,
  } = useTiersData();

  return (
    <PageContainer style={{ maxWidth: '1200px' }}>
      <LayoutContentWrapper
        endpoint={[rewards, history]}
        loading={isLoading}
        content={([rewardsData, referrals]: [
          ReferralRewards,
          ReferralHistory,
        ]) => (
          <>
            <Box
              sx={{
                mt: 8,
                alignItems: 'center',
                mb: 6,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ZigTypography
                sx={{
                  mb: '19px',
                }}
                variant={'h1'}
                fontSize={'35px'}
                fontWeight={600}
                position={'relative'}
              >
                {t('title', { commission: maxCommission })}
                {inviteLeft > 0 && boostRunning && <ReferralLimitedTime />}
              </ZigTypography>
              <ZigTypography
                sx={{
                  mb: 1,
                }}
                variant={'h2'}
                fontWeight={400}
                color='neutral300'
              >
                <Trans
                  i18nKey={'description'}
                  values={{
                    commission: maxCommissionWithoutTraderBoost,
                    maxCommission: maxCommission,
                    multiplier: traderBoostMultiplier,
                  }}
                  t={t}
                >
                  <ZigTypography
                    color='paleBlue'
                    variant={'h2'}
                    fontWeight={'inherit'}
                    component={'span'}
                  />
                </Trans>
              </ZigTypography>
              <CommissionBox>
                <Box display='flex' alignItems={'center'} gap='63px'>
                  <StyledCurrentCommission>
                    <CurrentCommission
                      showReferrals={false}
                      showAsMaxCommission={true}
                    />
                  </StyledCurrentCommission>
                  <StyledShareCommissionSlider>
                    <BorderFix />
                    <ShareCommissionSlider
                      discountPct={referral.discountPct}
                      max={maxCommission}
                    />
                  </StyledShareCommissionSlider>
                </Box>
                <StyledReferralLinkInvite>
                  <ReferralLinkInvite link={link} title={t('share-link')} />
                </StyledReferralLinkInvite>
              </CommissionBox>
            </Box>

            {!rewardsData.invitedCount ? (
              <>
                <ZigTypography
                  align={'center'}
                  variant={'h1'}
                  fontSize={'26px'}
                  fontWeight={600}
                  sx={{ mt: 7, mb: '29px' }}
                >
                  {t('start-earning')}
                </ZigTypography>

                <Grid container>
                  <Grid item xs={12} md={4}>
                    <ReferralSuccessStep step={1} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ReferralSuccessStep step={2} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ReferralSuccessStep step={3} />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <ZigTypography align={'center'} variant={'h1'} sx={{ mt: 7 }}>
                  {t('my-referrals')}
                </ZigTypography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    pt: 3,
                    pb: 5,
                  }}
                >
                  <TotalBox
                    label={t('total-invitees')}
                    value={
                      <ZigTypography color={'neutral175'}>
                        {rewardsData.investorsCount} <GroupIcon />
                      </ZigTypography>
                    }
                  />
                  <TotalBox
                    label={t('total-rewards')}
                    value={
                      <ZigPriceLabel
                        color={'greenGraph'}
                        usd
                        showTooltip
                        variant={'bigNumber'}
                        value={rewardsData.usdtEarned}
                      />
                    }
                  />
                  <TotalBox
                    label={t('pending-rewards')}
                    value={
                      <ZigPriceLabel
                        color={'yellow'}
                        usd
                        showTooltip
                        variant={'bigNumber'}
                        value={rewardsData.usdtPending}
                      />
                    }
                  />
                </Box>
                <ReferralTable referrals={referrals.history} />
              </>
            )}
          </>
        )}
      />
    </PageContainer>
  );
};

export default Referrals;
