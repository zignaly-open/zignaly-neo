import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type User {
    id: ID!
    nonce: Int!
    publicAddress: String!
    messageToSign: String
    username: String
  }

  type AccessToken {
    accessToken: String!
  }

  extend type Mutation {
    getOrCreateUser(publicAddress: String!): User
    authenticate(publicAddress: String!, signature: String!): AccessToken!
  }
`;
