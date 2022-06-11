import React, { createContext, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DepositInput from '../components/Deposit/DepositInput';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

type OnboardingType = {
  startOnboarding: () => void;
  balanceOnboarding: () => void;
};

export const onboardingContext = createContext<OnboardingType>(
  {} as OnboardingType,
);

const { Provider } = onboardingContext;

export const OnboardingProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false);
  const startOnboarding = useCallback(() => alert('Onboarding'), []);
  const balanceOnboarding = useCallback(() => setIsMoneyModalOpen(true), []);
  const { t } = useTranslation('global');
  useTranslation('balance');
  return (
    <Provider
      value={{
        startOnboarding,
        balanceOnboarding,
      }}
    >
      <Dialog
        open={isMoneyModalOpen}
        onClose={() => setIsMoneyModalOpen(false)}
      >
        <DialogTitle>{t('balance:buy-bids')}</DialogTitle>
        <DialogContent>
          <Typography marginBottom={2}>
            {t('balance:buy-bids-explainer')}
          </Typography>
          <DepositInput />
        </DialogContent>
      </Dialog>
      {children}
    </Provider>
  );
};
