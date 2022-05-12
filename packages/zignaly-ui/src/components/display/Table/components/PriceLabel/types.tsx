import React from "react";

export interface PriceLabelProps {
  value: number | string;
  coin: string;
  fiat?: boolean;
  symbol?: string;
  bottomElement?: React.ReactNode;
  className?: string;
}
