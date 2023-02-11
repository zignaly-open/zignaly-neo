import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type User {
    id: ID!
    publicAddress: String!
    username: String
    onboardingCompletedAt: Date
    discordName: String
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
    confirmEmail(userId: Int!): Boolean
  }

  extend type Subscription {
    balanceChanged(token: String!): UserBalance
  }
`;
