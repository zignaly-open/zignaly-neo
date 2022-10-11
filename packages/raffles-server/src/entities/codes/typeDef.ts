import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  type CodeInfo {
    name: String
    reqMinimumBalance: Int
    reqMinimumDeposit: Float
    reqDepositFrom: Date
    reqMinAuctions: Int
    reqWalletType: String
  }

  extend type Query {
    checkCode(code: String!): CodeInfo
  }

  extend type Mutation {
    redeemCode(code: String!): Boolean
  }
`;
