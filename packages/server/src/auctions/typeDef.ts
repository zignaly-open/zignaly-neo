import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  type UserInfo {
    id: Int
    username: String
  }
  type Bid {
    id: Int
    value: Int
    date: Date
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
    title: String!
    status: String
    monetaryValue: String
    startingBid: String
    description: String
    basketItems: [BasketItem]
    bids: [Bid]
    userBid: [Bid]
  }

  extend type Query {
    auctions(id: ID): [Auction]
  }

  extend type Subscription {
    bidAdded: Auction
    auctionStatusChanged: Auction
  }

  extend type Mutation {
    bid(id: ID!, bid: Int!): Auction
  }
`;
