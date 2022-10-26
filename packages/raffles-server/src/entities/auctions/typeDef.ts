import { gql } from 'apollo-server-express';

const fields = `
  createdAt: Date
  expiresAt: Date
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

const privateFields = `
  announcementDate: Date
  maxExpiryDate: Date
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

  type AuctionLite {
    id: ID
    bids: [Bid]
    isClaimed: Boolean
    ${fields}
  }

  type Auction {
    id: ID
    bids: [Bid]
    isClaimed: Boolean
    ${fields}
    ${privateFields}
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
    auctionUpdated: AuctionLite
  }

  extend type Mutation {
    bid(id: ID!): String
    claim(id: ID!): AuctionLite
    updateAuction(
      id: ID!
      ${fields}
      ${privateFields}
    ): Auction
    createAuction(
      ${fields}
      ${privateFields}
    ): Auction
  }
`;
