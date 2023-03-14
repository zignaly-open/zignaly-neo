import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { StepBox, StepCounter } from '../styles';
import { Trans, useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../util/hooks/useToast';
import { useReferralRewardsQuery } from '../../../apis/referrals/api';

const ReferralSuccessStep: React.FC<{ step: number; link?: string }> = ({
  step,
  link,
}) => {
  const { t } = useTranslation('referrals');
  const { data } = useReferralRewardsQuery();
  const toast = useToast();
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
          <Trans
            t={t}
            i18nKey={`how-to-earn-steps.step-${step}.description`}
            values={{
              minDeposit: 100,
              reward: 20,
              successFee: data.configuration.zignalySuccessFee,
            }}
          >
            <ZigTypography
              component='span'
              onClick={() => {
                copy(link);
                toast.success(t('action:copied'));
              }}
              color={'links'}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            />
          </Trans>
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
