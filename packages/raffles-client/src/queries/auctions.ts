import { gql } from '@apollo/client';
import { UserType } from '@zignaly-open/raffles-shared/types';

export interface GetCurrentUserResponseModel {
  loading: boolean;
  data?: { me: UserType };
}

export const GET_AUCTIONS = gql`
  query getAuctions(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: AuctionFilter
  ) {
    items: allAuctions(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      id
      title
      expiresAt
      maxClaimDate
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
      isFinalized
      isExclusiveToKuCoin
      bids {
        position
        user {
          id
          username
        }
      }
      isClaimed
    }
    total: _allAuctionsMeta(filter: $filter) {
      count
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

export const AUCTION_UPDATED_SUBSCRIPTION = gql`
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
