import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type UserBalance {
    id: ID!
    balance: Int!
  }

  extend type Subscription {
    balanceChanged: UserBalance
  }

  extend type Query {
    balance: UserBalance
  }
`;
