export type AuctionFilter = {
  unannounced?: boolean;
  privateCode?: string;
  title?: string;
  q?: string;
  startDateLte?: Date;
  startDateGte?: Date;
};

export type AuctionPayload = Partial<
  Auction & {
    startDate: string;
    expiresAt: string;
    maxExpiryDate: string;
    announcementDate: string;
    maxClaimDate: string;
  }
>;
