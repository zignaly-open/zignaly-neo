import { coinPrecisions } from "./constants";

export function getPrecisionForCoin(coin: string, value: string | number): number {
  return (+value === 0 && 2) || coinPrecisions[coin] || 8;
}
