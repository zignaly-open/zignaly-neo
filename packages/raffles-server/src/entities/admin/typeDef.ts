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
    benefitBalanceFactor: Float
    benefitDepositFactor: Float
    maxTotalBenefits: Int
  }

  type CodeCheckInfo {
    code: CodeInfo
    balance: Float
    deposits: Float
  }

  type UserCodeInfo {
    code: String
    benefitDirect: Float
    rewardDirect: Float
    maxRedemptions: Int
    currentRedemptions: Int
    endDate: Date
    rewardFactor: Float
    rewardDepositFactor: Float
    maxTotalRewards: Int
    maxTotalBenefits: Int
    benefitBalanceFactor: Float
    benefitDepositFactor: Float
    reqMinimumBalance: Float
    reqMinimumDeposit: Float
    reqDepositFrom: Date
    reqMinAuctions: Int
    reqWalletType: String
    reqAuctionBids: Int
  }

  type InvitedInfo {
    shortAddress: String
    username: String
    id: ID
  }

  type CodeRedemptionInfo {
    code: String
    redemptionDate: Date
    inviterBenefit: Float
    invitedBenefit: Float
    invited: InvitedInfo
  }

  extend type Query {
    checkCode(code: String!): CodeCheckInfo
    userCodes: [UserCodeInfo]
    userCodesRedemptions: [CodeRedemptionInfo]
  }

  extend type Mutation {
    redeemCode(code: String!): Float
  }
`;
