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
  const { configuration: config } = rewards;
  const elements = [
    config.enableSuccessFeeReward && !!config.zignalySuccessFee && (
      <Trans
        i18nKey='referrals:invite-friends-for-percent'
        t={t}
        values={{
          value: config.zignalySuccessFee,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),
    config.enableSuccessFeeReward && !!config.traderSuccessFee && (
      <Trans
        // does the distinction "invite friends" vs "invite traders" imply traders can have no friends?
        i18nKey='referrals:invite-traders-for-percent'
        t={t}
        values={{
          value: config.traderSuccessFee,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),
    config.enableRebateFeeReward && !!config.zignalyRebateFee && (
      <Trans
        i18nKey='referrals:invite-friends-for-percent-rebate'
        t={t}
        values={{
          value: config.zignalyRebateFee,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),
    config.enableRebateFeeReward && !!config.traderRebateFee && (
      <Trans
        i18nKey='referrals:invite-traders-for-percent-rebate'
        t={t}
        values={{
          value: config.traderRebateFee,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),

    !!config.rewardSignupAmount && (
      <Trans
        i18nKey='referrals:invite-for-signup'
        t={t}
        values={{
          value: config.rewardSignupAmount,
          symbol: config.rewardSignupSymbol,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),
    !!config.rewardDepositAmount && (
      <Trans
        i18nKey='referrals:invite-for-deposit'
        t={t}
        values={{
          value: config.rewardDepositAmount,
          symbol: config.rewardDepositSymbol,
          threshold: config.rewardMinDepositAmount,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),
    !!config.rewardBalanceAmount && (
      <Trans
        i18nKey='referrals:invite-for-balance'
        t={t}
        values={{
          value: config.rewardBalanceAmount,
          symbol: config.rewardBalanceSymbol,
          threshold: config.rewardMinBalanceAmount,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),
    !!config.rewardOneAllocationAmount && (
      <Trans
        i18nKey='referrals:invite-for-investment'
        t={t}
        values={{
          value: config.rewardOneAllocationAmount,
          symbol: config.rewardOneAllocationSymbol,
          threshold: config.rewardMinOneAllocationAmount,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),
    !!config.rewardTotalAllocationAmount && (
      <Trans
        i18nKey='referrals:invite-for-investment'
        t={t}
        values={{
          value: config.rewardTotalAllocationAmount,
          symbol: config.rewardTotalAllocationSymbol,
          threshold: config.rewardMinTotalAllocationAmount,
          days: config.rewardMinTotalAllocationDays,
        }}
      >
        <TotalBoxValue />
      </Trans>
    ),
  ].filter(Boolean);

  return (
    <Grid
      container
      sx={{
        mt: 4,
        mb: 4,
        justifyContent: 'center',
      }}
    >
      <Grid item xs={12} md={12}>
        <ZigTypography
          variant={'h2'}
          textAlign={'center'}
          sx={{ mt: 2, mb: 2.5 }}
        >
          {t('what-you-get')}
        </ZigTypography>

        <Grid container>
          {elements.map((x) => (
            <Grid key={Math.random()} item xs={12} md={4}>
              <GetWhatYouDeserveLabel>{x}</GetWhatYouDeserveLabel>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReferralRewardsList;
