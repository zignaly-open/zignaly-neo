import { gql } from '@apollo/client';
import { UserType } from '@zignaly-open/raffles-shared/types';

export interface GetCurrentUserResponseModel {
  loading: boolean;
  data?: { me: UserType };
}

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
      comingSoon
      currentBid
      website
      twitter
      telegram
      discord
      bidFee
      description
      claimSuccess
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
        isClaimed
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
        isClaimed
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
      currentBid
      comingSoon
      userBid {
        id
        position
        user {
          id
          username
        }
        value
        date
        isClaimed
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
