export const COIN_SIZES = {
  Small: "small",
  Medium: "medium",
  Large: "large",
} as const;

type CoinSizesKeys = keyof typeof COIN_SIZES;
export type CoinSizes = typeof COIN_SIZES[CoinSizesKeys] | number;

export const sizes = {
  [COIN_SIZES.Small]: 24,
  [COIN_SIZES.Medium]: 36,
  [COIN_SIZES.Large]: 42,
};

export type ZIGCoinIconProps = {
  size?: CoinSizes;
  coin: string;
  className?: string;
  bucket?: string;
  id?: string;
};
