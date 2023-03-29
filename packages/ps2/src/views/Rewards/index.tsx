import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import {
  CloneIcon,
  dark,
  InputText,
  PageContainer,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { ReferralHistory, ReferralRewards } from '../../apis/referrals/types';
import { Box, Grid } from '@mui/material';
import copy from 'copy-to-clipboard';
import ReferralRewardsList from '../Referrals/components/ReferralRewardsList';
import ReferralSuccessStep from '../Referrals/components/ReferralSuccessStep';
import { TotalBox } from '../Referrals/atoms';
import GroupIcon from '@mui/icons-material/Group';
import ReferralTable from '../Referrals/components/ReferralTable';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import {
  useRewardsClaimedQuery,
  useRewardsQuery,
} from '../../apis/rewards/api';
import {
  useBenefitsClaimedQuery,
  useBenefitsQuery,
} from '../../apis/referrals/api';

const Rewards: React.FC = () => {
  const { t } = useTranslation(['rewards', 'pages']);
  useTitle(t('pages:rewards'));
  const rewards = useBenefitsQuery();
  const rewardsClaimed = useBenefitsClaimedQuery();
  return (
    <PageContainer style={{ maxWidth: '1200px' }}>
      <LayoutContentWrapper
        endpoint={[rewards, rewardsClaimed]}
        content={([rewardsData, rewardsClaimedData]: [
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
              </Box>
            </Box>
          </>
        )}
      />
    </PageContainer>
  );
};

export default Rewards;
