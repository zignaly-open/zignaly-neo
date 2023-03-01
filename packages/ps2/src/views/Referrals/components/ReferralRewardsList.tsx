import React from 'react';
import { Grid } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { GetWhatYouDeserveLabel, TotalBoxValue } from '../styles';
import { Trans, useTranslation } from 'react-i18next';
import { ReferralRewards } from '../../../apis/referrals/types';

const ReferralRewardsList: React.FC<{ rewards: ReferralRewards }> = ({
  rewards,
}) => {
  const { t } = useTranslation(['referrals', 'pages']);
  return (
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
                  value: rewards.configuration.rewardSignupAmount,
                  coin: rewards.configuration.rewardSignupSymbol,
                  threshold: rewards.configuration.rewardMinDepositAmount,
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
                  value: rewards.configuration.zignalySuccessFee,
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
                  value: rewards.configuration.rewardSignupAmount,
                  coin: rewards.configuration.rewardSignupSymbol,
                  threshold: rewards.configuration.rewardMinDepositAmount,
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
  );
};

export default ReferralRewardsList;
