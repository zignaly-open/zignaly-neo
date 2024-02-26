import React from 'react';
import { HowToEarnBox } from '../styles';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TiersTable from 'views/TraderService/components/ReferralsInviteModal/atoms/TiersTable';
import { useTranslation } from 'react-i18next';
import { TiersData } from 'apis/referrals/types';
import { ZigTypography } from '@zignaly-open/ui';
import ReferralDescriptionLines from './ReferralDescriptionLines';
import ReferralTermsButton from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralTermsButton';

const ReferralHowToEarn = ({ tiersData }: { tiersData: TiersData }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('referrals');

  const { referral, maxCommission, traderBoost, boostRunning, tiers, boost } =
    tiersData;

  if (sm) {
    return (
      <Box
        width={'90%'}
        mx={'auto'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <ZigTypography
          align={'center'}
          variant={'h1'}
          fontSize={'26px'}
          fontWeight={600}
          sx={{ mt: '7px', mb: '26px' }}
        >
          {t('how-to-earn', { commission: maxCommission })}
        </ZigTypography>
        <ReferralDescriptionLines tiersData={tiersData} />
        <Box
          sx={{
            transform: sm ? 'scale(0.65)' : 'scale(1)',
          }}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
        >
          <TiersTable
            tiers={tiers}
            referral={referral}
            traderBoost={traderBoost}
            boost={boost}
            boostRunning={boostRunning}
          />
        </Box>
        <ReferralTermsButton />
      </Box>
    );
  }

  return (
    <HowToEarnBox>
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        position={'relative'}
        zIndex={2}
      >
        <ZigTypography
          align={'center'}
          variant={'h1'}
          fontSize={'26px'}
          fontWeight={600}
          sx={{ mt: '7px', mb: '26px' }}
        >
          {t('how-to-earn', { commission: maxCommission })}
        </ZigTypography>
        <ReferralDescriptionLines tiersData={tiersData} />
        <TiersTable
          tiers={tiers}
          referral={referral}
          traderBoost={traderBoost}
          boost={boost}
          boostRunning={boostRunning}
        />
        <Box mt='30px'>
          <ReferralTermsButton />
        </Box>
      </Box>
    </HowToEarnBox>
  );
};

export default ReferralHowToEarn;
