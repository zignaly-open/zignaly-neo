export enum CoinSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type CoinTypeProps = {
  size?: CoinSizes;
  name: string;
  coin: string;
  className?: string;
};
