import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import {
  useReferralHistoryQuery,
  useReferralRewardsQuery,
} from '../../apis/referrals/api';
import { Box, Grid } from '@mui/material';
import {
  CloneIcon,
  dark,
  InputText,
  PageContainer,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import GroupIcon from '@mui/icons-material/Group';
import { GetWhatYouDeserveLabel, Hr, TotalBoxValue } from './styles';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';

import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useCurrentUser } from '../../apis/user/use';
import copy from 'copy-to-clipboard';
import { useToast } from '../../util/hooks/useToast';
import { generatePath } from 'react-router-dom';
import { ROUTE_REFERRALS_INVITE } from '../../routes';
import { TotalBox } from './atoms';
import { ReferralHistory, ReferralRewards } from '../../apis/referrals/types';
import ReferralsTable from './components/ReferralsTable';

const Referrals: React.FC = () => {
  const { t } = useTranslation(['referrals', 'pages']);
  const rewards = useReferralRewardsQuery();
  const history = useReferralHistoryQuery();
  const { refCode } = useCurrentUser();
  const toast = useToast();

  useTitle(t('pages:referrals'));

  const link =
    window.location.protocol +
    '//' +
    window.location.host +
    generatePath(ROUTE_REFERRALS_INVITE, { key: refCode });

  return (
    <PageContainer style={{ maxWidth: '960px' }}>
      <LayoutContentWrapper
        endpoint={[rewards, history]}
        content={([rewardsData, referrals]: [
          ReferralRewards,
          ReferralHistory,
        ]) => (
          <>
            <Box
              sx={{
                mt: 5,
                justifyContent: 'center',
                mb: 6,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Box>
                <CardGiftcardIcon
                  sx={{
                    width: 200,
                    height: 200,
                    mr: 4,
                    ml: 4,
                  }}
                />
              </Box>
              <Box
                sx={{
                  maxWidth: 700,
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <ZigTypography
                  sx={{
                    mb: 1,
                  }}
                  variant={'h1'}
                >
                  {t('title')}
                </ZigTypography>
                <ZigTypography
                  sx={{
                    mb: 3,
                  }}
                >
                  {t('description')}
                </ZigTypography>

                <InputText
                  label={t('share-your-link')}
                  readOnly={true}
                  value={link}
                  rightSideElement={
                    <CloneIcon width={40} height={40} color={dark.neutral300} />
                  }
                  onClickRightSideElement={() => {
                    copy(link);
                    toast.success(t('action:copied'));
                  }}
                />
              </Box>
            </Box>

            <Hr />

            <Grid
              container
              sx={{
                mt: 4,
                mb: 4,
              }}
            >
              <Grid item xs={12} md={8}>
                <ZigTypography
                  variant={'h2'}
                  textAlign={'center'}
                  sx={{ mt: 2, mb: 2.5 }}
                >
                  {t('what-you-get')}
                </ZigTypography>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <GetWhatYouDeserveLabel>
                      <Trans
                        i18nKey='referrals:invite-friends'
                        t={t}
                        values={{
                          value: rewardsData.configuration.rewardSignupAmount,
                          coin: rewardsData.configuration.rewardSignupSymbol,
                          threshold:
                            rewardsData.configuration.rewardMinDepositAmount,
                        }}
                      >
                        <TotalBoxValue
                          sx={{
                            mt: 1.5,
                            mb: 1.5,
                          }}
                        />
                      </Trans>
                    </GetWhatYouDeserveLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <GetWhatYouDeserveLabel>
                      <Trans
                        i18nKey='referrals:invite-traders'
                        t={t}
                        values={{
                          value: rewardsData.configuration.zignalySuccessFee,
                        }}
                      >
                        <TotalBoxValue
                          sx={{
                            mt: 1.5,
                            mb: 1.5,
                          }}
                        />
                      </Trans>
                    </GetWhatYouDeserveLabel>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <ZigTypography
                  variant={'h2'}
                  textAlign={'center'}
                  sx={{ mt: 5, mb: 5 }}
                >
                  {t('what-they-get')}
                </ZigTypography>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <GetWhatYouDeserveLabel>
                      <Trans
                        i18nKey='referrals:they-get-rewards'
                        t={t}
                        values={{
                          value: rewardsData.configuration.rewardSignupAmount,
                          coin: rewardsData.configuration.rewardSignupSymbol,
                          threshold:
                            rewardsData.configuration.rewardMinDepositAmount,
                        }}
                      >
                        <TotalBoxValue
                          sx={{
                            mt: 1.5,
                            mb: 1.5,
                          }}
                        />
                      </Trans>
                    </GetWhatYouDeserveLabel>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Hr />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                pt: 5,
                pb: 5,
              }}
            >
              <TotalBox
                label={t('total-invitees')}
                value={
                  <>
                    {rewardsData.invitedCount} <GroupIcon />
                  </>
                }
              />
              <TotalBox
                label={t('total-rewards')}
                value={<ZigPriceLabel usd value={rewardsData.usdtEarned} />}
              />
              <TotalBox
                label={t('pending-rewards')}
                value={<ZigPriceLabel usd value={rewardsData.usdtPending} />}
              />
            </Box>
            <ReferralsTable referrals={referrals.history} />
          </>
        )}
      />
    </PageContainer>
  );
};

export default Referrals;
