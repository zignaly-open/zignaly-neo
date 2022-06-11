import { gql } from '@apollo/client';

export const GET_AUCTIONS = gql`
  query singleAuction($id: ID) {
    auctions(id: $id) {
      id
      title
      createdAt
      expiresAt
      status
      minimalBid
      description
      startingBid
      basketItems {
        ticker
        amount
      }
      monetaryValue
      bids {
        id
        value
        user {
          id
          username
        }
      }

      userBid {
        id
        value
      }
    }
  }
`;

export const BID_AUCTION = gql`
  mutation createBid($id: ID!, $value: String!) {
    bid(id: $id, bid: $value) {
      id
      title
      createdAt
      expiresAt
      bids {
        id
        value
        user {
          id
          username
        }
      }

      userBid {
        id
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
      expiresAt
      minimalBid
      bids {
        id
        value
        user {
          id
          username
        }
      }
    }
  }
`;
