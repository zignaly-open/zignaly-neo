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
      startDate
      currentBid
      website
      twitter
      telegram
      discord
      bidFee
      description
      claimSuccess
      imageUrl
      numberOfWinners
      chain
      isClaimed
      isFinalized
      bids {
        position
        user {
          id
          username
        }
      }
    }
  }
`;

export const BID_AUCTION = gql`
  mutation createBid($id: ID!) {
    bid(id: $id)
  }
`;

export const CLAIM = gql`
  mutation claim($id: ID!) {
    claim(id: $id) {
      id
      isClaimed
    }
  }
`;

export const BIDS_SUBSCRIPTION = gql`
  subscription onAuctionUpdated {
    auctionUpdated {
      id
      expiresAt
      currentBid
      startDate
      isFinalized
      bids {
        position
        user {
          id
          username
        }
      }
    }
  }
`;
