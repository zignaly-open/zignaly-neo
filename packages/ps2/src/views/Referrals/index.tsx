import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import {
  useReferralHistoryQuery,
  useReferralRewardsQuery,
} from '../../apis/referrals/api';
import { Box, Grid } from '@mui/material';
import {
  PageContainer,
  ZigArrowDescIcon,
  ZigPriceLabel,
  ZigTypography,
  ZigUserFilledIcon,
} from '@zignaly-open/ui';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { TotalBox } from './atoms';
import { ReferralHistory, ReferralRewards } from '../../apis/referrals/types';
import ReferralTable from './components/ReferralTable';
import ReferralSuccessStep from './components/ReferralSuccessStep';
import { useTiersData } from 'apis/referrals/use';
import ReferralLimitedTime from './components/ReferralLimitedTime';
import { Verified } from '@mui/icons-material';
import ReferralHowToEarn from './components/ReferralHowToEarn';
import ReferralCommissionBox from './components/ReferralCommissionBox';
import ReferralTermsButton from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralTermsButton';

const Referrals: React.FC = () => {
  const { t } = useTranslation(['referrals', 'pages']);
  const rewards = useReferralRewardsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const history = useReferralHistoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useTitle(t('pages:referrals'));

  const tiersData = useTiersData();
  const {
    referral,
    maxCommission,
    maxCommissionWithoutTraderBoost,
    traderBoost,
    isLoading,
    boostRunning,
    inviteLeft,
  } = tiersData;

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
                className='referral-page__title'
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
                className='referral-page__subtitle'
              >
                <Trans
                  i18nKey={'description'}
                  values={{
                    commission: maxCommissionWithoutTraderBoost,
                    maxCommission: maxCommission,
                    multiplier: traderBoost + 1,
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
              <ReferralCommissionBox
                tiersData={tiersData}
                rewardsData={rewardsData}
              />
              {referral.invitedCount > 0 && (
                <Box mt='30px'>
                  <ReferralTermsButton />
                </Box>
              )}
            </Box>

            {!rewardsData.invitedCount ? (
              <>
                <ReferralHowToEarn tiersData={tiersData} />
                <ZigTypography
                  align={'center'}
                  variant={'h1'}
                  fontSize={'26px'}
                  fontWeight={600}
                  sx={{ mt: 7, mb: '29px' }}
                  className='referral-page__start-earning-title'
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
                    alignItems: 'center',
                    pt: 3,
                    pb: 5,
                  }}
                >
                  <TotalBox
                    label={t('signups')}
                    value={
                      <ZigTypography
                        color={'yellow'}
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                      >
                        <ZigUserFilledIcon
                          style={{
                            fontSize: '19px',
                          }}
                        />
                        {rewardsData.invitedCount}
                      </ZigTypography>
                    }
                  />
                  <ZigArrowDescIcon />
                  <TotalBox
                    label={t('invested')}
                    value={
                      <ZigTypography
                        color={'paleBlue'}
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                      >
                        <ZigUserFilledIcon
                          color={'paleBlue'}
                          style={{
                            fontSize: '19px',
                          }}
                        />
                        {rewardsData.investorsCount}
                        <Verified
                          sx={{ color: 'greenGraph', fontSize: '21px' }}
                        />
                      </ZigTypography>
                    }
                  />
                  <ZigArrowDescIcon />
                  <TotalBox
                    label={t('total-earned')}
                    value={
                      <ZigPriceLabel
                        color={'#28ba62'}
                        usd
                        showTooltip
                        variant={'bigNumber'}
                        value={rewardsData.usdtEarned}
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
