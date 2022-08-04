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
        position
        user {
          id
          username
        }
        value
        date
      }
    }
  }
`;

export const CLAIM = gql`
  mutation claim($id: ID!) {
    claim(id: $id) {
      id
    }
  }
`;

export const BIDS_SUBSCRIPTION = gql`
  subscription onAuctionUpdated {
    auctionUpdated {
      id
      expiresAt
      minimalBid
      userBid {
        id
        position
        user {
          id
          username
        }
        value
        date
      }
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
