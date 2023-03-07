import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type User {
    id: ID!
    publicAddress: String!
    username: String
    onboardingCompletedAt: Date
    discordName: String
    emailVerified: Boolean
    emailVerificationSent: Boolean
    zhitRewarded: Boolean
    email: String
    createdAt: Date
  }

  type AuthUser {
    id: ID!
    nonce: Int!
    publicAddress: String!
    messageToSign: String
    username: String
    discordName: String
    onboardingCompletedAt: Date
  }

  type AccessToken {
    accessToken: String!
  }

  type UserBalance {
    id: ID!
    balance: String!
  }

  type UserVerification {
    id: ID!
    emailVerificationSent: Boolean
    emailVerified: Boolean
    zhitRewarded: Boolean
  }

  input UserFilter {
    id: ID
    q: String
  }

  extend type Query {
    me: User
    balance: UserBalance!
    checkUsername(username: String!): Boolean
    allUsers(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: UserFilter
    ): [User]
    _allUsersMeta(filter: UserFilter, page: Int, perPage: Int): ListMetadata
  }

  type ListMetadata {
    count: Int!
  }

  extend type Mutation {
    completeOnboarding: User
    updateProfile(username: String, email: String, discordName: String): User
    getOrCreateUser(walletType: String!, publicAddress: String!): AuthUser
    authenticate(publicAddress: String!, signature: String!): AccessToken!
    verifyEmail(userId: Int!, email: String!): Boolean
    confirmEmail(hashStr: String!): String
  }

  extend type Subscription {
    balanceChanged(token: String!): UserBalance
    emailChanged(token: String!): UserVerification
  }
`;
