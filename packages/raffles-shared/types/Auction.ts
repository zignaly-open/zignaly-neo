export type BasketItem = {
  ticker: string;
  amount: string;
};

export type AuctionBidType = {
  id?: number;
  auctionId?: number;
  position: number;
  user: {
    id: number;
    username: string;
  };
  isClaimed?: boolean;
  isWinner?: boolean;
  transactionId?: string;
  claimTransactionId?: string;
};

export type AuctionType = {
  id: number;
  title: string;
  description: string;
  claimSuccess: string;
  numberOfWinners?: number;
  website?: string;
  discord?: string;
  telegram?: string;
  twitter?: string;
  bidStep?: string;
  bidFee?: string;
  imageUrl?: string;
  createdAt?: Date;
  expiresAt?: Date;
  maxExpiryDate: Date;
  maxClaimDate: Date;
  startingBid: string;
  currentBid?: string;
  bids: AuctionBidType[];
  startDate: Date;
  chain: string;
  isClaimed: boolean;
  inRedis: boolean;
  isFinalized: boolean;
  isExclusiveToKuCoin: boolean;
};
