export const CoinSizes = {
  Small: "small",
  Medium: "medium",
  Large: "large",
};

export type CoinSize = typeof CoinSizes[keyof typeof CoinSizes];

export type CoinTypeProps = {
  size?: CoinSize | any;
  name: string;
  coin: string;
  className?: string;
};
