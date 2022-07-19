import { gql } from '@apollo/client';

export const COMPLETE_ONBOARDING = gql`
  mutation completeOnboarding {
    completeOnboarding {
      id
      onboardingCompletedAt
    }
  }
`;
