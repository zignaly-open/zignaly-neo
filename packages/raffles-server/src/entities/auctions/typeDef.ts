import { gql } from 'apollo-server-express';

const fields = `
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
  createdAt: Date
  privateCode: String
`;

export const typeDef = gql`
  scalar Date

  type UserInfo {
    id: Int
    username: String
    discordName: String
  }

  type Bid {
    isWinner: Boolean
    position: Int
    user: UserInfo
  }

  type Auction {
    id: ID
    bids: [Bid]
    isClaimed: Boolean
    ${fields}
  }

  type AdmAuction {
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
    AdmAuction(id: ID): AdmAuction
    allAuctions(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: AuctionFilter
    ): [Auction]

    allAdmAuctions(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: AuctionFilter
    ): [AdmAuction]

    _allAuctionsMeta(
      filter: AuctionFilter
    ): ListMetadata
    
    _allAdmAuctionsMeta(
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
      id: ID!
      ${fields}
      ${privateFields}
    ): AdmAuction
    createAuction(
      ${fields}
      ${privateFields}
    ): AdmAuction
    deleteAuction(id: ID): Boolean
  }
`;
