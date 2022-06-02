import { gql } from "apollo-server-express";

export const typeDef = gql`
    scalar Date
    
    type Bid {
        value: Int,
        date: Date
    }
    
    type Auction {
        id: Int!
        createdAt: Date
        expiresAt: Date
        title: String!
        bids: [Bid]
    }
    
    input AuctionInput {
        title: String
        author: String
    }
    
    extend type Query {
        auctions: [Auction]
        auction (id: Int!): Auction
    }    
    
    extend type Mutation {
        bid (id: Int!, bid: Int!): Auction
    }
`;
