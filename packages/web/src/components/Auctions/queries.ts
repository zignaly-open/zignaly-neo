import { gql } from '@apollo/client';

export const GET_AUCTIONS = gql`
  query singleAuction($id: ID) {
    auctions(id: $id) {
      id
      title
      image
      createdAt
      expiresAt
      description
      basket {
        ticker
        amount
      }
      bids {
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
      bids {
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
