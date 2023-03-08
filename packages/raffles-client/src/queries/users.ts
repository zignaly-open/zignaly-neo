import { gql } from '@apollo/client';
import { UserType } from '@zignaly-open/raffles-shared/types';

export interface GetCurrentUserResponseModel {
  loading: boolean;
  data?: { me: UserType };
}

export const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      email
      username
      discordName
      onboardingCompletedAt
      emailVerificationSent
      zhitRewarded
      publicAddress
      emailVerified
    }
  }
`;

export const GET_OR_CREATE_USER = gql`
  mutation getOrCreateUser($walletType: String!, $publicAddress: String!) {
    getOrCreateUser(walletType: $walletType, publicAddress: $publicAddress) {
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
  mutation editProfile(
    $username: String
    $email: String
    $discordName: String
  ) {
    updateProfile(
      username: $username
      email: $email
      discordName: $discordName
    ) {
      id
      username
      email
      discordName
    }
  }
`;

export const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username)
  }
`;

export const GET_CURRENT_USER_BALANCE = gql`
  query balance {
    balance {
      balance
      id
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

export const EMAIL_SUBSCRIPTION = gql`
  subscription onBalanceChanged($token: String!) {
    balanceChanged(token: $token) {
      id
      emailVerificationSent
      emailVerified
      zhitRewarded
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($userId: Int!, $email: String!) {
    verifyEmail(userId: $userId, email: $email)
  }
`;

export const CONFIRM_EMAIL_MUTATION = gql`
  mutation confirmEmail($hashStr: string!) {
    confirmEmail(hashStr: $hashStr)
  }
`;
