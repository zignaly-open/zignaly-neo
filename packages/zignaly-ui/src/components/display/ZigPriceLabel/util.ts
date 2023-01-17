import { coinPrecisions } from "./constants";

export function getPrecisionForCoin(coin: string, value: string | number): number {
  if (+value === 0) return 2;
  const coinPrecision = coinPrecisions[coin];
  // Show more decimals for stable coins with a value lower than 0.01
  return coinPrecision || 8;
}

export function shortenNumber(value: number): {
  value: number;
  precision: number;
  suffix: "G" | "K" | "M" | "μ" | "";
} {
  const log = Math.log10(Math.abs(value));
  if (log >= 9) {
    return {
      value: value / Math.pow(10, 9),
      suffix: "G",
      precision: log >= 10 ? 1 : 2,
    };
  } else if (log >= 6) {
    return {
      value: value / Math.pow(10, 6),
      suffix: "M",
      precision: log >= 7 ? 1 : 2,
    };
  } else if (log >= 3) {
    return {
      value: value / Math.pow(10, 3),
      suffix: "K",
      precision: log >= 4 ? 1 : 2,
    };
  } else if (log > -16 && log < -5) {
    return {
      value: value * Math.pow(10, 6),
      suffix: "μ",
      precision: 2,
    };
  } else {
    return {
      value,
      suffix: "",
      precision: log < -2 ? 3 : 2,
    };
  }
}
