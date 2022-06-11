import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  type UserInfo {
    id: Int
    username: String
  }
  type Bid {
    id: Int
    value: String
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
    imageUrl: String
    status: String
    monetaryValue: String
    startingBid: String
    minimalBid: String
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
  }

  extend type Mutation {
    bid(id: ID!, bid: String!): Auction
  }
`;
