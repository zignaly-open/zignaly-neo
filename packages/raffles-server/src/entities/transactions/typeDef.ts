import { gql } from 'apollo-server-express';

export const typeDef = gql`
  extend type Subscription {
    balanceChanged(token: String!): String
  }
`;
