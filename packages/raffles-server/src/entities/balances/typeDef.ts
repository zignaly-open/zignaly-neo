import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Balance {
    id: ID!
    walletAddress: String!
    node: String!
    amount: String!
    currency: String!
    zhits: Int!
  }

  extend type Query {
    balances: [Balance]
  }
`;
