import React, { useCallback, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import {
  GetWhatYouDeserveLabel,
  RewardsListContainer,
  TotalBoxValue,
  UlList,
} from '../styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Trans, useTranslation } from 'react-i18next';
import { ReferralRewards } from '../../../apis/referrals/types';
import { useZAlert } from '../../../components/ZModal/use';

const ReferralRewardsList: React.FC<{ rewards: ReferralRewards }> = ({
  rewards,
}) => {
  const { t } = useTranslation(['referrals', 'pages']);
  const { configuration: config } = rewards;
  const showModal = useZAlert();
  const elements = useMemo(
    () =>
      [
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
            i18nKey='referrals:invite-for-total-investment'
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
        !!config.rewardSignupAmount && (
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
      ].filter(Boolean),
    [config, t],
  );

  const modalFriendElements = useMemo(
    () =>
      [
        config.enableSuccessFeeReward && !!config.zignalySuccessFee && (
          <Trans
            i18nKey='referrals:invite-friends-for-percent-modal'
            t={t}
            values={{
              value: config.zignalySuccessFee,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
        !config.enableRebateFeeReward && !!config.zignalyRebateFee && (
          <Trans
            i18nKey='referrals:invite-friends-for-percent-rebate-modal'
            t={t}
            values={{
              value: config.zignalyRebateFee,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
        !!config.rewardOneAllocationAmount && (
          <Trans
            i18nKey='referrals:invite-for-investment-modal'
            t={t}
            values={{
              value: config.rewardOneAllocationAmount,
              symbol: config.rewardOneAllocationSymbol,
              threshold: config.rewardMinOneAllocationAmount,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
        !!config.rewardTotalAllocationAmount && (
          <Trans
            i18nKey='referrals:invite-for-total-investment-modal'
            t={t}
            values={{
              value: config.rewardTotalAllocationAmount,
              symbol: config.rewardTotalAllocationSymbol,
              threshold: config.rewardMinTotalAllocationAmount,
              days: config.rewardMinTotalAllocationDays,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
        !!config.rewardDepositAmount && (
          <Trans
            i18nKey='referrals:invite-for-deposit-modal'
            t={t}
            values={{
              value: config.rewardDepositAmount,
              symbol: config.rewardDepositSymbol,
              threshold: config.rewardMinDepositAmount,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
        !!config.rewardBalanceAmount && (
          <Trans
            i18nKey='referrals:invite-for-balance-modal'
            t={t}
            values={{
              value: config.rewardBalanceAmount,
              symbol: config.rewardBalanceSymbol,
              threshold: config.rewardMinBalanceAmount,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
        !!config.rewardSignupAmount && (
          <Trans
            i18nKey='referrals:invite-for-signup-modal'
            t={t}
            values={{
              value: config.rewardSignupAmount,
              symbol: config.rewardSignupSymbol,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
      ].filter(Boolean),
    [config, t],
  );

  // it can be either Trader or Friend, not both
  // because we all know that real day traders have no friends
  const modalTraderElements = useMemo(
    () =>
      [
        config.enableSuccessFeeReward && !!config.traderSuccessFee && (
          <Trans
            i18nKey='referrals:invite-traders-for-percent-modal'
            t={t}
            values={{
              value: config.traderSuccessFee,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
        !config.enableRebateFeeReward && !!config.traderRebateFee && (
          <Trans
            i18nKey='referrals:invite-traders-for-percent-rebate-modal'
            t={t}
            values={{
              value: config.traderRebateFee,
            }}
          >
            <ZigTypography fontWeight={600} color={'neutral100'} />
          </Trans>
        ),
      ].filter(Boolean),
    [config, t],
  );

  const showFullRewards = useCallback(() => {
    showModal({
      title: t('full-rewards-title'),
      okLabel: t('common:ok'),
      description: (
        <>
          {!!modalFriendElements.length && (
            <Box sx={{ mb: 2 }}>
              <ZigTypography variant={'h3'}>
                {t('when-invite-friends')}
              </ZigTypography>
              <UlList>
                {modalFriendElements.map((x) => (
                  <li key={Math.random()}>{x}</li>
                ))}
              </UlList>
            </Box>
          )}
          {!!modalTraderElements.length && (
            <Box sx={{ mb: 2 }}>
              <ZigTypography variant={'h3'}>
                {t('when-invite-traders')}
              </ZigTypography>
              <UlList>
                {modalTraderElements.map((x) => (
                  <li key={Math.random()}>{x}</li>
                ))}
              </UlList>
            </Box>
          )}
        </>
      ),
    });
  }, [elements]);
  return (
    <RewardsListContainer
      container
      sx={{
        mt: 4,
        mb: 4,
        justifyContent: 'center',
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
      </Grid>

      {elements.slice(0, 3).map((x, _, all) => (
        <Grid
          key={Math.random()}
          item
          xs={12}
          p={1}
          md={Math.min(4, 12 / (all.length + 1))}
        >
          <GetWhatYouDeserveLabel>{x}</GetWhatYouDeserveLabel>
        </Grid>
      ))}

      <Grid
        item
        xs={12}
        md={Math.min(4, 12 / (elements.length + 1))}
        p={1}
        sx={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <ZigButton
          variant='outlined'
          size={'large'}
          sx={{ mb: 3, mt: '28px', color: (theme) => theme.palette.neutral175 }}
          onClick={showFullRewards}
        >
          {t('full-rewards')}
          <ArrowForwardIosIcon sx={{ height: '16px' }} />
        </ZigButton>
      </Grid>
    </RewardsListContainer>
  );
};

export default ReferralRewardsList;
