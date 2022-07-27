import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Payout {
    id: ID!
    auction: Auction!
    toWallet: String
  }

  extend type Query {
    payouts: [Payout]
  }
`;
