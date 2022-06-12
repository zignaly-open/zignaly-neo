import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type User {
    id: ID!
    publicAddress: String!
    username: String
    onboardingCompletedAt: Date
  }

  type AuthUser {
    id: ID!
    nonce: Int!
    publicAddress: String!
    messageToSign: String
    username: String
    onboardingCompletedAt: Date
  }

  type AccessToken {
    accessToken: String!
  }

  extend type Query {
    me: User
    checkUsername(username: String!): Boolean
  }

  extend type Mutation {
    completeOnboarding: User
    updateProfile(username: String): User
    getOrCreateUser(publicAddress: String!): AuthUser
    authenticate(publicAddress: String!, signature: String!): AccessToken!
  }
`;
