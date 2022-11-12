import React, { CSSProperties } from "react";

export type PriceLabelProps = {
  value: number | string;
  coin: string;
  precision?: number;
  valuePrefix?: string;
  hideCoinName?: boolean;
  green?: boolean;
  red?: boolean;
  textColor?: boolean;
  style?: CSSProperties;
  bottomElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
  className?: string;
};

export type UsdPriceLabelProps = Omit<
  PriceLabelProps,
  "coin" | "bottomElement" | "suffixElement" | "className" | "hideCoinName"
>;
