import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import {
  GetWhatYouDeserveLabel,
  RewardsListContainer,
  TotalBoxValue,
} from '../styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
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
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
      </Trans>
    ),
    !config.enableRebateFeeReward && !!config.zignalyRebateFee && (
      <Trans
        i18nKey='referrals:invite-friends-for-percent-rebate'
        t={t}
        values={{
          value: config.zignalyRebateFee,
        }}
      >
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
      </Trans>
    ),
    !config.enableRebateFeeReward && !!config.traderRebateFee && (
      <Trans
        i18nKey='referrals:invite-traders-for-percent-rebate'
        t={t}
        values={{
          value: config.traderRebateFee,
        }}
      >
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
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
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
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
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral504' sx={{ fontSize: '13px' }} />
      </Trans>
    ),
    !!!config.rewardDepositAmount && (
      <Trans
        i18nKey='referrals:invite-for-deposit'
        t={t}
        values={{
          value: config.rewardDepositAmount,
          symbol: config.rewardDepositSymbol,
          threshold: config.rewardMinDepositAmount,
        }}
      >
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
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
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
      </Trans>
    ),
    !!!config.rewardSignupAmount && (
      <Trans
        i18nKey='referrals:invite-for-signup'
        t={t}
        values={{
          value: config.rewardSignupAmount,
          symbol: config.rewardSignupSymbol,
        }}
      >
        <ZigTypography />
        <TotalBoxValue />
        <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
      </Trans>
    ),
  ].filter(Boolean);

  const [showAll, setShowAll] = useState(elements.length <= 4);

  return (
    <RewardsListContainer
      container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid item xs={12} md={12}>
        <ZigTypography
          variant={'h1'}
          textAlign={'center'}
          sx={{ mt: 2, mb: 2.5 }}
        >
          {t('what-you-get')}
        </ZigTypography>

        <Grid
          container
          sx={{
            justifyContent: 'center',
          }}
        >
          {elements.slice(0, showAll ? elements.length : 3).map((x) => (
            <Grid
              key={Math.random()}
              item
              xs={12}
              p={1}
              md={elements.length <= 3 ? 4 : 3}
            >
              <GetWhatYouDeserveLabel>{x}</GetWhatYouDeserveLabel>
            </Grid>
          ))}
          {!showAll && (
            <Grid
              item
              xs={12}
              md={3}
              p={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <ZigButton
                variant='outlined'
                size={'large'}
                sx={{ mb: 8 }}
                onClick={() => setShowAll(true)}
              >
                {t('full-rewards')}
                <ArrowForwardIosIcon sx={{ height: '16px' }} />
              </ZigButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </RewardsListContainer>
  );
};

export default ReferralRewardsList;
