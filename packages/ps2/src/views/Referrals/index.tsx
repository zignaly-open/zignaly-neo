import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import {
  useReferralHistoryQuery,
  useReferralRewardsQuery,
} from '../../apis/referrals/api';
import { Box, Grid } from '@mui/material';
import {
  PageContainer,
  ZigButton,
  ZigCopyText,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import GroupIcon from '@mui/icons-material/Group';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { useCurrentUser } from '../../apis/user/use';
import { useToast } from '../../util/hooks/useToast';
import { generatePath } from 'react-router-dom';
import {
  ROUTE_REFERRALS_INVITE,
  ROUTE_REFERRALS_INVITE_SHORT,
} from '../../routes';
import { TotalBox } from './atoms';
import { ReferralHistory, ReferralRewards } from '../../apis/referrals/types';
import ReferralTable from './components/ReferralTable';
import ReferralRewardsList from './components/ReferralRewardsList';
import ReferralSuccessStep from './components/ReferralSuccessStep';
import { useZModal } from 'components/ZModal/use';
import ReferralInviteModal from './components/ReferralInviteModal';

const Referrals: React.FC = () => {
  const { t } = useTranslation(['referrals', 'pages']);
  const rewards = useReferralRewardsQuery();
  const history = useReferralHistoryQuery();
  const { refCode } = useCurrentUser();
  const toast = useToast();
  const { showModal } = useZModal();

  useTitle(t('pages:referrals'));

  const baseUrl =
    window.location.protocol +
    '//' +
    (window.location.host?.includes('localhost')
      ? 'app.zignaly.com'
      : window.location.host);

  const link = baseUrl + generatePath(ROUTE_REFERRALS_INVITE, { key: refCode });
  const shortLink =
    baseUrl + generatePath(ROUTE_REFERRALS_INVITE_SHORT, { key: refCode });

  const openInviteModal = () =>
    showModal(ReferralInviteModal, { url: link, urlShort: shortLink });

  return (
    <PageContainer style={{ maxWidth: '1200px' }}>
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
              <Box
                sx={{
                  mr: 4,
                  ml: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={'/images/referrals/envelope-main.png'}
                  style={{ width: 200, marginTop: 17 }}
                  alt={'referral'}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
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

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <ZigCopyText
                      id={'deposit__deposit-address'}
                      copyElementId={'referrals__copy-link'}
                      value={link}
                      onCopied={() => toast.success(t('action:copied'))}
                    />
                  </Box>
                  <ZigButton
                    variant={'contained'}
                    id='referrals__open-invite-image-modal'
                    size={'xlarge'}
                    sx={{
                      mb: '10px',
                      ml: 1,
                    }}
                    onClick={openInviteModal}
                  >
                    <img
                      src={'/images/referrals/qrcode.svg'}
                      width='16'
                      height='16'
                      style={{ marginRight: 10 }}
                      alt={''}
                    />
                    {t('create-invite.create-invite')}
                  </ZigButton>
                </Box>
              </Box>
            </Box>

            <ReferralRewardsList rewards={rewardsData} />

            {!rewardsData.invitedCount ? (
              <>
                <ZigTypography
                  align={'center'}
                  variant={'h1'}
                  sx={{ mt: 7, mb: 5 }}
                >
                  {t('how-to-earn')}
                </ZigTypography>

                <Grid container sx={{ mb: 8 }}>
                  <Grid item xs={12} md={4}>
                    <ReferralSuccessStep step={1} link={link} />
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
                    pt: 5,
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
              </>
            )}
            <ReferralTable referrals={referrals.history} />
          </>
        )}
      />
    </PageContainer>
  );
};

export default Referrals;
