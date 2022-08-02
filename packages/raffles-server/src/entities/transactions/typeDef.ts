import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type UserBalance {
    id: ID!
    balance: String!
  }

  extend type Subscription {
    balanceChanged(token: String!): UserBalance
  }

  extend type Query {
    balance: UserBalance
  }
`;
