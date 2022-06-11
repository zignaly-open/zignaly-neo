import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type User {
    id: ID!
    publicAddress: String!
    username: String
  }

  type AuthUser {
    id: ID!
    nonce: Int!
    publicAddress: String!
    messageToSign: String
    username: String
    isNew: Boolean
  }

  type AccessToken {
    accessToken: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    getOrCreateUser(publicAddress: String!): AuthUser
    authenticate(publicAddress: String!, signature: String!): AccessToken!
  }
`;
