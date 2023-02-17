import { Typography, TypographyProps } from "@mui/material";

export type ZigPriceLabelProps = Partial<TypographyProps> & {
  sign?: string;
  value: string | number;
  coin?: string;
  precision?: number;
  exact?: boolean;
  shorten?: boolean;
  showTooltip?: boolean;
  usd?: boolean;
  coinProps?: Partial<typeof Typography>;
  component?: string;
  alwaysShowSign?: boolean;
};
