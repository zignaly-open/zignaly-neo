import React from 'react';
import { Box, Link } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { StepBox, StepCounter } from './styles';
import { Trans, useTranslation } from 'react-i18next';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import { useZModal } from '../../../../components/ZModal/use';
import DepositModal from '../ManageInvestmentModals/DepositModal';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PROFIT_SHARING } from '../../../../routes';
import { BUY_CRYPTO_URL } from '../../../../util/constants';
import { OpenInNew } from '@mui/icons-material';

const InvestingStep: React.FC<{ step: number }> = ({ step }) => {
  const { t } = useTranslation('my-dashboard');
  const { showModal } = useZModal();
  const navigate = useNavigate();

  return (
    <StepBox sx={{ display: 'flex', flexDirection: 'row' }}>
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
            <ZigTypography
              id={
                step === 1
                  ? 'my-portfolio-steps__step-marketplace'
                  : 'my-portfolio-steps__step-deposit'
              }
              component='span'
              color={'links'}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={() => {
                step === 1 && navigate(ROUTE_PROFIT_SHARING);
                step === 2 && showModal(DepositModal);
              }}
            />
            {step === 2 && (
              <Link
                id={'my-portfolio-steps__step-purchase'}
                href={BUY_CRYPTO_URL}
                underline={'hover'}
                target={'_blank'}
              />
            )}
            {step === 2 && (
              <OpenInNew
                sx={{ width: '13px', height: '13px', color: 'links' }}
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
        <Box>
          <img
            src={`/images/portfolio/step${step}.svg`}
            alt={t(`how-to-invest-steps.step-${step}.title`)}
          />
        </Box>
      </Box>
    </StepBox>
  );
};

export default InvestingStep;
