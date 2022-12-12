import { Typography, TypographyProps } from "@mui/material";

export type ZigPriceLabelProps = Partial<TypographyProps> & {
  value: string | number;
  coin?: string;
  precision?: number;
  exact?: boolean;
  usd?: boolean;
  coinProps?: Partial<TypographyProps>;
  alwaysShowSign?: boolean;
};
