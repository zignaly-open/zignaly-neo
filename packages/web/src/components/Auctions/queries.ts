import { gql } from '@apollo/client';

export const GET_AUCTIONS = gql`
  query singleAuction($id: ID) {
    auctions(id: $id) {
      id
      title
      image
      createdAt
      expiresAt
      status
      description
      basket {
        ticker
        amount
      }
      monetaryValue
      lastBid {
        value
      }
    }
  }
`;

export const BID_AUCTION = gql`
  mutation createBid($id: ID!, $value: Int!) {
    bid(id: $id, bid: $value) {
      id
      title
      createdAt
      expiresAt
      lastBid {
        value
      }
    }
  }
`;

export const GET_AUCTION_IDS = gql`
  query getIds($id: ID) {
    auctions(id: $id) {
      id
    }
  }
`;

export const BIDS_SUBSCRIPTION = gql`
  subscription onBidAdded {
    bidAdded {
      id
      lastBid {
        value
      }
    }
  }
`;
