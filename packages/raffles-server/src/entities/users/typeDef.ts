import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type User {
    id: ID!
    publicAddress: String!
    username: String
    onboardingCompletedAt: Date
    discordName: String
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

  extend type Query {
    me: User
    balance: String!
    checkUsername(username: String!): Boolean
  }

  extend type Mutation {
    completeOnboarding: User
    updateProfile(username: String, discordName: String): User
    getOrCreateUser(publicAddress: String!): AuthUser
    authenticate(publicAddress: String!, signature: String!): AccessToken!
  }
`;
