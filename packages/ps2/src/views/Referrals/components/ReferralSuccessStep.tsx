import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { StepBox, StepCounter } from '../styles';
import { useTranslation } from 'react-i18next';
import { useReferralRewardsQuery } from '../../../apis/referrals/api';

const ReferralSuccessStep: React.FC<{ step: number }> = ({ step }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('referrals');
  const { data } = useReferralRewardsQuery();
  return (
    <StepBox sx={{ display: 'flex', flexDirection: 'row' }}>
      {!sm && (
        <StepCounter>
          <ZigTypography
            variant='h2'
            color='highlighted'
            fontSize={'27px'}
            className={`referral-success-step-${step}__number`}
          >
            {step}
          </ZigTypography>
        </StepCounter>
      )}
      <Box>
        {sm && (
          <img
            src={`/images/referrals/referrals_step${step}.svg`}
            alt={t(`how-to-earn-steps.step-${step}.title`)}
          />
        )}
        <ZigTypography
          variant={sm ? 'caption' : 'h2'}
          color={'neutral200'}
          fontSize={sm ? '16px' : '20px'}
          className={`referral-success-step-${step}__title`}
        >
          {t(`start-earning-steps.step-${step}.title`)}
        </ZigTypography>
        {!sm && (
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
        )}
        {!sm && (
          <img
            src={`/images/referrals/referrals_step${step}.svg`}
            alt={t(`how-to-earn-steps.step-${step}.title`)}
          />
        )}
      </Box>
    </StepBox>
  );
};

export default ReferralSuccessStep;
