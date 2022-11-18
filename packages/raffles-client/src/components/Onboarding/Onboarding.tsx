import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { useContext, useState } from 'react';
import HowItWorks from './HowItWorks';
import Deposit from './Deposit';
import Profile from './Profile';
import { useMutation } from '@apollo/client';
import { onboardingContext } from '../../contexts/Onboarding';
import { COMPLETE_ONBOARDING } from 'config/apollo/queries';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className='QontoStepIcon-completedIcon' />
      ) : (
        <div className='QontoStepIcon-circle' />
      )}
    </QontoStepIconRoot>
  );
}

const steps = ['steps.info', 'steps.profile', 'steps.deposit'];

export default function Onboarding() {
  const { t } = useTranslation('onboarding');
  const [step, setStep] = useState(0);
  const { closeOnboarding } = useContext(onboardingContext);
  const profileFormRef = React.useRef(null);
  const handleBack = () => setStep((x) => x - 1);
  const handleNext = () => setStep((x) => x + 1);
  const [completeOnboarding] = useMutation(COMPLETE_ONBOARDING);
  const onNext = () => {
    if (step === 0) {
      handleNext();
    } else if (step === 1) {
      // submit a form in child component
      profileFormRef.current?.submit();
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    completeOnboarding();
    closeOnboarding();
  };

  return (
    <Box>
      <Stepper
        style={{
          margin: '30px 0',
        }}
        alternativeLabel
        activeStep={step}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{t(label)}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box margin={2}>
        {step === 0 && <HowItWorks />}
        {step === 1 && (
          <Box textAlign={'center'}>
            <Profile ref={profileFormRef} onSuccess={handleNext} />
          </Box>
        )}
        {step === 2 && <Deposit />}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color='inherit'
          disabled={step === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          {t('back')}
        </Button>

        {step !== 2 && (
          <Button color='error' onClick={handleClose} sx={{ mr: 1 }}>
            {t('skip')}
          </Button>
        )}

        <Box sx={{ flex: '1 1 auto' }} />

        <Button onClick={onNext} sx={{ mr: 1 }}>
          {t(step === 2 ? 'finish' : 'next')}
        </Button>
      </Box>
    </Box>
  );
}
