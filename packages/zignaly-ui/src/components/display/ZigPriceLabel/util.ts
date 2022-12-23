import { coinPrecisions } from "./constants";

export function getPrecisionForCoin(coin: string, value: string | number): number {
  if (+value === 0) return 2;
  const coinPrecision = coinPrecisions[coin];
  // Show exact decimals for stable coins with a value lower than 0.01
  if (coinPrecision === 2 && +value > 0 && +value < 0.01) return undefined;
  return coinPrecision || 8;
}
