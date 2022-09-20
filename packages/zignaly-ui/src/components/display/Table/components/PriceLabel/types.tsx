import React from "react";

export interface PriceLabelProps {
  value: number | string;
  coin: string;
  hideCoinName?: boolean;
  green?: boolean;
  red?: boolean;
  textColor?: boolean;
  bottomElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
  className?: string;
}
