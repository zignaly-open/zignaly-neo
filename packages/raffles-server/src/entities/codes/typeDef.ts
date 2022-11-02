import { gql } from 'apollo-server-express';

const code = `
  code: String
  reqMinimumBalance: Float
  reqMinimumDeposit: Float
  reqDepositFrom: Date
  reqMinAuctions: Int
  reqWalletType: String
  benefitDirect: Float
  benefitBalanceFactor: Float
  benefitDepositFactor: Float
  maxTotalBenefits: Float
  welcomeType: Boolean
  maxRedemptions: Int
  currentRedemptions: Int
  rewardDirect: Float
  rewardFactor: Float
  rewardDepositFactor: Float
  maxTotalRewards: Int
  startDate: Date
  endDate: Date
`;

export const typeDef = gql`
  scalar Date

  type CodeInfo {
    ${code}
  }

  type CodeUser {
    id: ID
    username: String
  }

  type Code {
    ${code}
    user: CodeUser
    isDefault: Boolean
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

  input CodeFilter {
    id: ID
    code: String
    isDefault: Boolean
    userId: Int
    type: String
  }

  extend type Query {
    Code(id: ID!): Code
    checkCode(code: String!): CodeCheckInfo
    userCodes: [UserCodeInfo]
    userCodesRedemptions: [CodeRedemptionInfo]
    allCodes(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: CodeFilter
    ): [Code]
    _allCodesMeta(filter: CodeFilter, page: Int, perPage: Int): ListMetadata
  }

  type ListMetadata {
    count: Int!
  }

  extend type Mutation {
    redeemCode(code: String!): Float
    updateCode(
      id: ID
      userId: ID
      ${code}
    ): Code
    createCode(
      ${code}
      userId: ID
    ): Code
    deleteCode(id: ID): Boolean
  }
`;
