import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  type UserInfo {
    id: Int
    username: String
    discordName: String
  }
  type Bid {
    id: Int
    position: Int
    value: String
    date: Date
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
    startingBid: String
    currentBid: String
    description: String
    claimSuccess: String
    basketItems: [BasketItem]
    bids: [Bid]
    userBid: Bid
    numberOfWinners: Int
  }

  extend type Query {
    auctions(id: ID): [Auction]
  }

  extend type Subscription {
    auctionUpdated: Auction
  }

  extend type Mutation {
    bid(id: ID!): Auction
    claim(id: ID!): Auction
  }
`;
