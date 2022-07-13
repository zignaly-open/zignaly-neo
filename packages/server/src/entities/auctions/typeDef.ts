import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  type UserInfo {
    id: Int
    username: String
  }
  type Bid {
    id: Int
    position: Int
    value: String
    date: Date
    user: UserInfo
    position: String
  }

  type BasketItem {
    ticker: String!
    amount: String!
  }

  type Auction {
    id: ID!
    createdAt: Date
    expiresAt: Date
    title: String!
    imageUrl: String
    status: String
    website: String
    discord: String
    telegram: String
    twitter: String
    monetaryValue: String
    bidFee: String
    startingBid: String
    minimalBid: String
    description: String
    basketItems: [BasketItem]
    bids: [Bid]
    userBid: Bid
    numberOfWinners: Int
  }

  extend type Query {
    auctions(id: ID): [Auction]
  }

  extend type Subscription {
    bidAdded: Auction
  }

  extend type Mutation {
    bid(id: ID!): Auction
  }
`;
