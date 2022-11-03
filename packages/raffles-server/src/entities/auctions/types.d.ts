export type AuctionFilter = {
  unannounced?: boolean;
  privateCode?: string;
  title?: string;
  q?: string;
  startDateLte?: Date;
  startDateGte?: Date;
};
