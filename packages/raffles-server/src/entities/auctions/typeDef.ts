import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  interface IAuction {
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
  }

  interface IAuctionPrivate {
    announcementDate: Date
    maxExpiryDate: Date
    createdAt: Date
    privateCode: String
  }

  type UserInfo {
    id: Int
    username: String
    discordName: String
  }

  type Bid {
    isWinner: Boolean
    position: Int
    user: UserInfo
    isClaimed: Boolean
  }

  type Auction implements IAuction, IAuctionPrivate {
    id: ID
    bids: [Bid]
    isClaimed: Boolean
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
    announcementDate: Date
    maxExpiryDate: Date
    createdAt: Date
    privateCode: String
  }

  type AdmAuction {
    id: ID
    bids: [Bid]
    isClaimed: Boolean
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
    announcementDate: Date
    maxExpiryDate: Date
    createdAt: Date
    privateCode: String
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

    _allAuctionsMeta(filter: AuctionFilter): ListMetadata

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
    # TODO make this shit accept an object type
    updateAuction(
      id: ID!
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
      announcementDate: Date
      maxExpiryDate: Date
      createdAt: Date
      privateCode: String
    ): AdmAuction

    # TODO: Same here
    createAuction(
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
      announcementDate: Date
      maxExpiryDate: Date
      createdAt: Date
      privateCode: String
    ): AdmAuction
    deleteAuction(id: ID): Boolean
  }
`;
