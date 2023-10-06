import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { StepBox, StepCounter } from '../styles';
import { useTranslation } from 'react-i18next';
import { useReferralRewardsQuery } from '../../../apis/referrals/api';

const ReferralSuccessStep: React.FC<{ step: number }> = ({ step }) => {
  const { t } = useTranslation('referrals');
  const { data } = useReferralRewardsQuery();
  return (
    <StepBox sx={{ display: 'flex', flexDirection: 'row' }}>
      <StepCounter>
        <ZigTypography variant='h2' color='highlighted' fontSize={'27px'}>
          {step}
        </ZigTypography>
      </StepCounter>
      <Box>
        <ZigTypography
          variant={'h2'}
          color={'neutral200'}
          fontSize={'20px'}
          className={`referral-success-step-${step}__title`}
        >
          {t(`start-earning-steps.step-${step}.title`)}
        </ZigTypography>
        <ZigTypography
          component='p'
          sx={{ mt: '13px', mb: '6px', minHeight: '72px' }}
          color={'neutral300'}
          className={`referral-success-step-${step}__description`}
        >
          {t(`start-earning-steps.step-${step}.description`, {
            reward: 20,
            successFee: data.configuration.zignalySuccessFee,
          })}
        </ZigTypography>
        <img
          src={`/images/referrals/referrals_step${step}.svg`}
          alt={t(`how-to-earn-steps.step-${step}.title`)}
        />
      </Box>
    </StepBox>
  );
};

export default ReferralSuccessStep;
