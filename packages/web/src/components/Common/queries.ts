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

export const GET_OR_CREATE_USER = gql`
  mutation getOrCreateUser($publicAddress: String!) {
    getOrCreateUser(publicAddress: $publicAddress) {
      id
      messageToSign
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
