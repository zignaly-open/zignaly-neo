import React, { useCallback, useMemo } from 'react';
import { Box, Grid, Tooltip } from '@mui/material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import {
  GetWhatYouDeserveLabel,
  OlList,
  RewardsListContainer,
  TotalBoxValue,
  UlList,
} from '../styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Trans, useTranslation } from 'react-i18next';
import { ReferralRewards } from '../../../apis/referrals/types';
import { useZAlert } from '../../../components/ZModal/use';

const hardcodedInviteeReward = {
  value: 20,
  coin: 'ZIG',
  threshold: 100,
};

const ReferralRewardsList: React.FC<{ rewards: ReferralRewards }> = ({
  rewards,
}) => {
  const { t } = useTranslation(['referrals', 'pages']);
  const { configuration: config } = rewards;
  const showModal = useZAlert();
  const elementsYou = useMemo(
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
            i18nKey={`referrals:invite-for-total-investment${
              config.rewardMinTotalAllocationDays ? '-days' : ''
            }`}
            t={t}
            values={{
              value: config.rewardTotalAllocationAmount,
              symbol: config.rewardTotalAllocationSymbol,
              threshold: config.rewardMinTotalAllocationAmount,
              count: config.rewardMinTotalAllocationDays,
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

  const elementsThem = useMemo(
    () => [
      config.enableSuccessFeeReward && !!config.zignalySuccessFee && (
        <Trans
          i18nKey='referrals:they-get-invest'
          t={t}
          values={hardcodedInviteeReward}
        >
          {/*desparate times call for desperate measures*/}
          <ZigTypography sx={{ opacity: 0 }} />
          <TotalBoxValue />
          <ZigTypography color='neutral400' sx={{ fontSize: '13px' }} />
        </Trans>
      ),
    ],
    [config, t],
  );

  // I never thought I'd die fighting side by side with an trader
  const showFeesExplainerTrader =
    (config.enableSuccessFeeReward && !!config.traderSuccessFee) ||
    (config.enableRebateFeeReward && !!config.traderRebateFee);
  // What about side by side with a friend?
  const showFeesExplainerFriend =
    (config.enableSuccessFeeReward && !!config.zignalySuccessFee) ||
    (config.enableRebateFeeReward && !!config.zignalyRebateFee);
  // Aye, I could do that
  const feesExplainer = (
    <Tooltip title={t('terms.fees')}>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <ZigTypography color={'neutral300'}> (*)</ZigTypography>
    </Tooltip>
  );
  const feesExplainerBottom = (
    <ZigTypography
      variant={'caption'}
      color={'neutral400'}
      component={'div'}
      sx={{ ml: 2.5, mt: 1 }}
    >
      {/* eslint-disable-next-line i18next/no-literal-string */}*{' '}
      {t('terms.fees')}
    </ZigTypography>
  );

  const modalFriendElements = useMemo(
    () =>
      [
        config.enableSuccessFeeReward && !!config.zignalySuccessFee && (
          <>
            <Trans
              i18nKey='referrals:invite-friends-for-percent-modal'
              t={t}
              values={{
                value: config.zignalySuccessFee,
              }}
            >
              <ZigTypography fontWeight={600} color={'neutral100'} />
            </Trans>
            {feesExplainer}
          </>
        ),
        config.enableRebateFeeReward && !!config.zignalyRebateFee && (
          <>
            <Trans
              i18nKey='referrals:invite-friends-for-percent-rebate-modal'
              t={t}
              values={{
                value: config.zignalyRebateFee,
              }}
            >
              <ZigTypography fontWeight={600} color={'neutral100'} />
            </Trans>
            {feesExplainer}
          </>
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
            i18nKey={`referrals:invite-for-total-investment-modal${
              config.rewardMinTotalAllocationDays ? '-days' : ''
            }`}
            t={t}
            values={{
              value: config.rewardTotalAllocationAmount,
              symbol: config.rewardTotalAllocationSymbol,
              threshold: config.rewardMinTotalAllocationAmount,
              count: config.rewardMinTotalAllocationDays,
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
          <>
            <Trans
              i18nKey='referrals:invite-traders-for-percent-modal'
              t={t}
              values={{
                value: config.traderSuccessFee,
              }}
            >
              <ZigTypography fontWeight={600} color={'neutral100'} />
            </Trans>
            {feesExplainer}
          </>
        ),
        config.enableRebateFeeReward && !!config.traderRebateFee && (
          <>
            <Trans
              i18nKey='referrals:invite-traders-for-percent-rebate-modal'
              t={t}
              values={{
                value: config.traderRebateFee,
              }}
            >
              <ZigTypography fontWeight={600} color={'neutral100'} />
            </Trans>
            {feesExplainer}
          </>
        ),
      ].filter(Boolean),
    [config, t],
  );

  const modalThemElements = useMemo(
    () => [
      <Trans
        key='they-get-invest-modal'
        i18nKey='they-get-invest-modal'
        t={t}
        values={hardcodedInviteeReward}
      >
        <ZigTypography fontWeight={600} color={'neutral100'} />
      </Trans>,
    ],
    [config, t],
  );

  const showFullRewards = useCallback(() => {
    showModal({
      title: t('full-rewards-title'),
      okLabel: t('common:ok'),
      description: (
        <Box sx={{ maxWidth: 650 }}>
          {!!modalFriendElements.length && (
            <Box sx={{ mb: 4 }}>
              <ZigTypography variant={'h3'}>
                {t('when-invite-friends')}
              </ZigTypography>
              <UlList>
                {modalFriendElements.map((x) => (
                  <li key={Math.random()}>{x}</li>
                ))}
              </UlList>
              {showFeesExplainerFriend && feesExplainerBottom}
            </Box>
          )}

          {!!modalTraderElements.length && (
            <Box sx={{ mb: 4 }}>
              <ZigTypography variant={'h3'}>
                {t('when-invite-traders')}
              </ZigTypography>
              <UlList>
                {modalTraderElements.map((x) => (
                  <li key={Math.random()}>{x}</li>
                ))}
              </UlList>

              {showFeesExplainerTrader && feesExplainerBottom}
            </Box>
          )}

          {!!modalThemElements.length && (
            <Box sx={{ mb: 4 }}>
              <ZigTypography variant={'h3'}>{t('invitee-gets')}</ZigTypography>
              <UlList>
                {modalThemElements.map((x) => (
                  <li key={Math.random()}>{x}</li>
                ))}
              </UlList>
            </Box>
          )}

          <Box sx={{ mb: 4 }}>
            <ZigTypography variant={'h3'}>{t('terms.title')}</ZigTypography>
            <OlList>
              <li>{t('terms.1')}</li>
              <li>{t('terms.2')}</li>
              <li>{t('terms.3')}</li>
              <li>{t('terms.4')}</li>
            </OlList>
          </Box>
        </Box>
      ),
    });
  }, [elementsYou]);

  const cols =
    elementsYou.slice(0, 2).length + elementsThem.slice(0, 1).length + 1;
  return (
    <RewardsListContainer
      container
      sx={{
        mt: 4,
        mb: 4,
        justifyContent: 'left',
      }}
    >
      <Grid
        item
        xs={12}
        md={Math.min(4, 12 / cols) * elementsYou.slice(0, 2).length}
      >
        <ZigTypography
          variant={'h1'}
          textAlign={'center'}
          sx={{ mt: 2, mb: 2.5 }}
        >
          {t('what-you-get')}
        </ZigTypography>
      </Grid>

      <Grid
        item
        xs={12}
        md={Math.min(4, 12 / cols) * elementsThem.slice(0, 1).length}
      >
        <ZigTypography
          variant={'h1'}
          textAlign={'center'}
          sx={{ mt: 2, mb: 2.5 }}
        >
          {t('what-they-get')}
        </ZigTypography>
      </Grid>

      <Grid item xs={12} />

      {elementsYou.slice(0, 2).map((x) => (
        <Grid
          key={Math.random()}
          item
          xs={12}
          pl={3}
          pr={3}
          md={Math.min(4, 12 / cols)}
        >
          <GetWhatYouDeserveLabel>{x}</GetWhatYouDeserveLabel>
        </Grid>
      ))}

      {elementsThem.slice(0, 1).map((x) => (
        <Grid
          key={Math.random()}
          item
          xs={12}
          pl={3}
          pr={3}
          sx={{
            borderLeft: (theme) => `1px solid ${theme.palette.neutral700}`,
          }}
          md={Math.min(4, 12 / cols)}
        >
          <GetWhatYouDeserveLabel>{x}</GetWhatYouDeserveLabel>
        </Grid>
      ))}

      <Grid
        item
        xs={12}
        md={Math.min(4, 12 / cols)}
        pl={3}
        pr={3}
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
