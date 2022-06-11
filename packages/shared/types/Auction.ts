export enum AuctionStatus {
  Draft = 'Draft',
  Active = 'Active',
  Complete = 'Complete',
}

export type BasketItem = {
  ticker: string;
  amount: string;
};

export type AuctionBid = {
  id: number;
  value: string; // TODO: BigInt?
  date: Date;
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
  minimalBid?: string;
  imageUrl?: string;
  createdAt?: Date;
  expiresAt?: Date;
  startingBid: string;
  status: AuctionStatus;
  userBid: AuctionBid[]; // we'll be receiving only the last bid
  bids: AuctionBid[]; // we'll be receiving only the last bid
};
