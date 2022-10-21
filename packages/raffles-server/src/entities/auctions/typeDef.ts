import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  type UserInfo {
    id: Int
    username: String
    discordName: String
  }
  type Bid {
    position: Int
    user: UserInfo
  }

  type BasketItem {
    ticker: String!
    amount: String!
  }

  type Auction {
    id: ID!
    createdAt: Date
    expiresAt: Date
    maxExpiryDate: Date
    maxClaimDate: Date
    title: String!
    imageUrl: String
    startDate: Date
    website: String
    discord: String
    telegram: String
    twitter: String
    monetaryValue: String
    bidFee: String
    currentBid: String
    description: String
    claimSuccess: String
    isClaimed: Boolean
    isFinalized: Boolean
    bids: [Bid]
    numberOfWinners: Int
    chain: String
    isExclusiveToKuCoin: Boolean
  }

  input auctions_set_input {
    expiresAt: Date
    maxExpiryDate: Date
    maxClaimDate: Date
    title: String!
    imageUrl: String
    startDate: Date
    website: String
    discord: String
    telegram: String
    twitter: String
    bidFee: String
    currentBid: String
    description: String
    claimSuccess: String
    isFinalized: Boolean
    numberOfWinners: Int
    chain: String
    isExclusiveToKuCoin: Boolean
    bidStep: Float
  }

  extend type Query {
    auctions(id: ID, unannounced: Boolean, privateCode: String): [Auction]
  }

  extend type Subscription {
    auctionUpdated: Auction
  }

  extend type Mutation {
    bid(id: ID!): String
    claim(id: ID!): Auction
    update_auctions_by_pk(id: ID!, data: auctions_set_input!): Auction
  }
`;
