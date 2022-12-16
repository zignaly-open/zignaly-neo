import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Balance {
    id: ID!
    walletAddress: String!
    note: String!
    amount: String!
    currency: String!
    zhits: Int!
  }

  type AmountBalance {
    walletAddress: String!
    currency: String!
    amount: String!
  }

  type ZhitsBalance {
    walletAddress: String!
    zhits: Int!
  }

  extend type Query {
    balances: [Balance]
    allBalances: [Balance]
    getBalanceByWalletAddress(walletAddress: String!): [AmountBalance]
    getZhitsByWalletAddress(walletAddress: String!): [ZhitsBalance]
  }
`;
