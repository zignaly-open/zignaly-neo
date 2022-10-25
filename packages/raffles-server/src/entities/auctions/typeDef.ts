import { gql } from 'apollo-server-express';

const fields = `
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
  bidFee: String
  currentBid: String
  description: String
  claimSuccess: String
  isFinalized: Boolean
  numberOfWinners: Int
  chain: String
  isExclusiveToKuCoin: Boolean
  bidStep: Float
`;

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

  type Auction {
    ${fields}
  }

  input AuctionFilter {
    id: ID
    title: String
    userId: ID
    unannounced: Boolean
    privateCode: String
    chain: String
    q: String
    startDateGte: Date
    startDateLte: Date
  }

  extend type Query {
    auctions(id: ID, unannounced: Boolean, privateCode: String): [Auction]

    Auction(id: ID): Auction
    allAuctions(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: AuctionFilter
    ): [Auction]
    _allAuctionsMeta(
      filter: AuctionFilter
      page: Int
      perPage: Int
    ): ListMetadata
  }

  type ListMetadata {
    count: Int!
  }

  extend type Subscription {
    auctionUpdated: Auction
  }

  extend type Mutation {
    bid(id: ID!): String
    claim(id: ID!): Auction
    updateAuction(
      ${fields}
    ): Auction
    createAuction(${fields}): Auction
  }
`;
