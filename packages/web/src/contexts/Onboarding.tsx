import React, { createContext, useCallback } from 'react';

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
  const startOnboarding = useCallback(() => alert('Onboarding'), []);
  const balanceOnboarding = useCallback(
    () => alert('Money me money now me money needing alot now'),
    [],
  );
  return (
    <Provider
      value={{
        startOnboarding,
        balanceOnboarding,
      }}
    >
      {children}
    </Provider>
  );
};
