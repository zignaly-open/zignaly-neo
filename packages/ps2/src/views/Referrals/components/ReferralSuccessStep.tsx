import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { StepBox, StepCounter } from '../styles';
import { useTranslation } from 'react-i18next';

const ReferralSuccessStep: React.FC<{ step: number }> = ({ step }) => {
  const { t } = useTranslation('referrals');

  return (
    // help me stepbox, I'm stuck
    <StepBox sx={{ display: 'flex', flexDirection: 'row' }}>
      <StepCounter>
        <ZigTypography variant='h2' color='highlighted'>
          {step}
        </ZigTypography>
      </StepCounter>
      <Box>
        <ZigTypography variant={'h2'}>
          {t(`how-to-earn-steps.step-${step}.title`)}
        </ZigTypography>
        <ZigTypography component='p' sx={{ mt: 1, mb: 2 }}>
          {t(`how-to-earn-steps.step-${step}.description`, {
            minDeposit: 100,
            reward: 10,
          })}
        </ZigTypography>
        <img
          src={`/images/referrals/referrals_step${step}.png`}
          alt={t(`how-to-earn-steps.step-${step}.title`)}
        />
      </Box>
    </StepBox>
  );
};

export default ReferralSuccessStep;
