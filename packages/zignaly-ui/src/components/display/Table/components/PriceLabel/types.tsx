import React from "react";

export interface PriceLabelProps {
  value: number | string;
  coin: string;
  stableCoinOperative?: boolean;
  green?: boolean;
  red?: boolean;
  textColor?: boolean;
  symbol?: string;
  bottomElement?: React.ReactNode;
  className?: string;
}
