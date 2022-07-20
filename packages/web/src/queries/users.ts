import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      username
      discordName
      onboardingCompletedAt
    }
  }
`;

export const GET_OR_CREATE_USER = gql`
  mutation getOrCreateUser($publicAddress: String!) {
    getOrCreateUser(publicAddress: $publicAddress) {
      id
      onboardingCompletedAt
      messageToSign
    }
  }
`;

export const AUTHENTICATE_METAMASK = gql`
  mutation getOrCreateUser($publicAddress: String!, $signature: String!) {
    authenticate(publicAddress: $publicAddress, signature: $signature) {
      accessToken
    }
  }
`;

export const CHANGE_PROFILE = gql`
  mutation editProfile($username: String) {
    updateProfile(username: $username) {
      id
      username
    }
  }
`;

export const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username)
  }
`;

export const GET_CURRENT_USER_BALANCE = gql`
  query balanced {
    balance {
      id
      balance
    }
  }
`;

export const COMPLETE_ONBOARDING = gql`
  mutation completeOnboarding {
    completeOnboarding {
      id
      onboardingCompletedAt
    }
  }
`;

export const BALANCE_SUBSCRIPTION = gql`
  subscription onBalanceChanged($token: String!) {
    balanceChanged(token: $token) {
      id
      balance
    }
  }
`;
