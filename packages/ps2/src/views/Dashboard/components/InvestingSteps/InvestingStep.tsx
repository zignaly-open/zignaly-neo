import React from 'react';
import { Box } from '@mui/material';
import { ZigLink, ZigTypography } from '@zignaly-open/ui';
import { StepBox, StepCounter } from './styles';
import { Trans, useTranslation } from 'react-i18next';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import { useOpenDepositModal } from '../ManageInvestmentModals/DepositModal';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PROFIT_SHARING } from '../../../../routes';
import { useOpenBuyModal } from '../ManageInvestmentModals/BuyModal';

const InvestingStep: React.FC<{ step: number }> = ({ step }) => {
  const { t } = useTranslation('my-dashboard');
  const openDepositModal = useOpenDepositModal();
  const showBuyModal = useOpenBuyModal();
  const navigate = useNavigate();

  return (
    <StepBox
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <StepCounter>
        <ZigTypography variant='h2' color='highlighted'>
          {step}
        </ZigTypography>
      </StepCounter>
      <Box>
        <ZigTypography variant={'h2'}>
          {t(`how-to-invest-steps.step-${step}.title`)}
        </ZigTypography>
        <ZigTypography component='p' sx={{ mt: 1, mb: 2, minHeight: '75px' }}>
          <Trans
            t={t}
            i18nKey={`how-to-invest-steps.step-${step}.description`}
            values={{
              minDeposit: 100,
              reward: 20,
              successFee: 5,
            }}
          >
            <ZigLink
              id={
                step === 1
                  ? 'my-portfolio-steps__step-marketplace'
                  : 'my-portfolio-steps__step-deposit'
              }
              onClick={() => {
                step === 1 && navigate(ROUTE_PROFIT_SHARING);
                step === 2 && openDepositModal();
              }}
            />
            {step === 2 && (
              <ZigLink
                id={'my-portfolio-steps__purchase'}
                onClick={() => showBuyModal()}
                underline={'hover'}
                target={'_blank'}
              />
            )}
          </Trans>
        </ZigTypography>
        <Box display={'flex'} gap={'5px'} minHeight={'50px'}>
          <ZigTypography variant={'body2'}>
            {t(`how-to-invest-steps.step-${step}.time`)}
          </ZigTypography>
          <AccessTimeFilledRoundedIcon
            fontSize={'inherit'}
            color={'secondary'}
          />
        </Box>
        <Box sx={{ marginTop: step === 1 && '25px' }}>
          <Box
            component='img'
            sx={{
              maxHeight: step === 1 ? 120 : 145,
              opacity: step === 2 && 0.75,
            }}
            src={`/images/portfolio/step${step}.svg`}
            alt={t(`how-to-invest-steps.step-${step}.title`)}
          />
        </Box>
      </Box>
    </StepBox>
  );
};

export default InvestingStep;
