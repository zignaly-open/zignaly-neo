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
    isClaimed: Boolean
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
    status: String
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
    bids: [Bid]
    numberOfWinners: Int
    chain: String
  }

  extend type Query {
    auctions(id: ID): [Auction]
  }

  extend type Subscription {
    auctionUpdated: Auction
  }

  extend type Mutation {
    bid(id: ID!): String
    claim(id: ID!): Auction
  }
`;
