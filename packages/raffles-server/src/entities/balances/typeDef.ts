import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Balance {
    id: ID!
    walletAddress: String!
    transactionType: String!
    note: String
    amount: String
    currency: String
    zhits: Int
    fromAddressWallet: String
    toAddressWallet: String
    locked: Boolean
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
    allBalances: [Balance]
    getBalanceByWalletAddress(walletAddress: String!): [AmountBalance]
    getZhitsByWalletAddress(walletAddress: String!): [ZhitsBalance]
    getDepositsByWalletAddress(walletAddress: String!): [Balance]
    getDepositBalanceByWalletAddress(walletAddress: String!): [Balance]
    getInternalTransfersByWalletAddress(walletAddress: String!): [Balance]
  }

  extend type Mutation {
    internalTransfer(
      walletAddress: String!
      amount: String!
      currency: String!
      zhits: Int
      fromAddressWallet: String!
      toAddressWallet: String!
      locked: Boolean
    ): Balance
    deposit(
      walletAddress: String!
      transactionType: String!
      note: String!
      amount: String!
      currency: String!
      zhits: Int!
    ): Balance
  }
`;
