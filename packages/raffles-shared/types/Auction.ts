export type BasketItem = {
  ticker: string;
  amount: string;
};

export type AuctionBidType = {
  id: number;
  auctionId: number;
  value: string;
  position: number;
  user: {
    id: number;
    username: string;
  };
  isClaimed?: boolean;
};

export type AuctionType = {
  id: number;
  title: string;
  description: string;
  claimSuccess: string;
  basketItems: BasketItem[];
  monetaryValue?: string;
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
  // new fields we add on the backend
  currentBid?: string;
  userBid?: AuctionBidType;
  bids: AuctionBidType[];
  startDate: Date;
  chain: string;
  isExclusiveToKuCoin: boolean;
};
