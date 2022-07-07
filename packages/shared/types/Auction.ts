export enum AuctionStatus {
  Draft = 'Draft',
  Active = 'Active',
  Complete = 'Complete',
}

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
};

export type AuctionType = {
  id: number;
  title: string;
  description: string;
  basketItems: BasketItem[];
  monetaryValue?: string;
  numberOfWinners?: number;
  bidStep?: string;
  bidFee?: string;
  imageUrl?: string;
  createdAt?: Date;
  expiresAt?: Date;
  startingBid: string;
  status: AuctionStatus;

  // new fields we add on the backend
  minimalBid?: string;
  userBid?: AuctionBidType;
  bids: AuctionBidType[];
};
