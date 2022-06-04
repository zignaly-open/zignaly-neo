export enum AuctionStatus {
  Draft = 'Draft',
  Active = 'Active',
  Complete = 'Complete',
}

export type BasketItem = {
  ticker: string;
  amount: number;
};

export type AuctionType = {
  id: number;
  title: string;
  description: string;
  basket: BasketItem[];
  monetaryValue?: String;
  createdAt?: Date;
  expiresAt?: Date;
  image?: String;
  status: AuctionStatus;
  lastBid: {
    value: number; // TODO: BigInt?
    date: Date;
  };
};
