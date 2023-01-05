export const COIN_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

type CoinSizesKeys = keyof typeof COIN_SIZES;
export type CoinSizes = typeof COIN_SIZES[CoinSizesKeys];

export const sizes = {
  [COIN_SIZES.SMALL]: 24,
  [COIN_SIZES.MEDIUM]: 36,
  [COIN_SIZES.LARGE]: 42,
};

export type ZIGCoinIconProps = {
  size?: CoinSizes | number;
  name: string;
  coin: string;
  className?: string;
};
