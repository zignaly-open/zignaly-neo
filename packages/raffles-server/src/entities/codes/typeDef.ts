import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  type CodeInfo {
    code: String
    reqMinimumBalance: Int
    reqMinimumDeposit: Float
    reqDepositFrom: Date
    reqMinAuctions: Int
    reqWalletType: String
    benefitDirect: Float
    rewardDirect: Float
    maxRedemptions: Int
    currentRedemptions: Int
    endDate: Date
  }

  type InvitedInfo {
    shortAddress: String
    username: String
  }

  type CodeRedemptionInfo {
    code: String
    redemptionDate: Date
    inviterBenefit: Float
    invitedBenefit: Float
    invited: InvitedInfo
  }

  extend type Query {
    checkCode(code: String!): CodeInfo
    userCodes: [CodeInfo]
    userCodesRedemptions: [CodeRedemptionInfo]
  }

  extend type Mutation {
    redeemCode(code: String!): Float
  }
`;
