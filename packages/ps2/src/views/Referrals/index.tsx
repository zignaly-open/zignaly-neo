import React from 'react';
import { useTranslation } from 'react-i18next';
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
  ZigButton,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import GroupIcon from '@mui/icons-material/Group';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { useCurrentUser } from '../../apis/user/use';
import copy from 'copy-to-clipboard';
import { useToast } from '../../util/hooks/useToast';
import { generatePath } from 'react-router-dom';
import { ROUTE_REFERRALS_INVITE } from '../../routes';
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

  const link =
    window.location.protocol +
    '//' +
    window.location.host +
    generatePath(ROUTE_REFERRALS_INVITE, { key: refCode });

  const openInviteModal = () => showModal(ReferralInviteModal);

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
                  variant={'bigNumber'}
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

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}
                >
                  <InputText
                    label={t('share-your-link')}
                    readOnly={true}
                    value={link}
                    rightSideElement={
                      <CloneIcon
                        id='referrals__copy-link'
                        width={40}
                        height={40}
                        color={dark.neutral300}
                      />
                    }
                    onClickRightSideElement={() => {
                      copy(link);
                      toast.success(t('action:copied'));
                    }}
                  />
                  <ZigButton
                    variant={'contained'}
                    size={'large'}
                    sx={{
                      mb: '10px',
                      height: '66px',
                      ml: 1,
                      fontSize: '16px',
                      textTransform: 'uppercase',
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
                    {t('create-invite')}
                  </ZigButton>
                </Box>
              </Box>
            </Box>

            <ReferralRewardsList rewards={rewardsData} />

            {!referrals.history?.length ? (
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
                        {rewardsData.invitedCount} <GroupIcon />
                      </ZigTypography>
                    }
                  />
                  <TotalBox
                    label={t('total-rewards')}
                    value={
                      <ZigPriceLabel
                        color={'greenGraph'}
                        usd
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
