export const BALANCE_QUERY = `
  query balance {
    balance {
      id
      balance
    }
  }
`;

export const PAYOUTS_QUERY = `
  query payouts {
    payouts {
      id
      auction {
        id
        title
      }
      toWallet
    }
  }
`;

export const AUCTIONS_QUERY = `
  query {
    auctions {
      id
      title
      createdAt
      expiresAt
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
