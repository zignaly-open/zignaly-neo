import { gql } from '@apollo/client';

export const GET_AUCTIONS = gql`
  query singleAuction($id: ID) {
    auctions(id: $id) {
      id
      title
      createdAt
      expiresAt
      maxExpiryDate
      maxClaimDate
      status
      minimalBid
      website
      twitter
      telegram
      discord
      bidFee
      description
      imageUrl
      startingBid
      numberOfWinners
      basketItems {
        ticker
        amount
      }
      monetaryValue
      bids {
        id
        position
        value
        user {
          id
          username
        }
      }

      userBid {
        id
        value
        position
      }
    }
  }
`;

export const BID_AUCTION = gql`
  mutation createBid($id: ID!) {
    bid(id: $id) {
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
        position
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
        position
        value
        user {
          id
          username
        }
      }
    }
  }
`;
