import { Typography, TypographyProps } from "@mui/material";

export type ZigPriceLabelProps = Partial<TypographyProps> & {
  value: string | number;
  coin?: string;
  noWrap?: boolean;
  precision?: number;
  usd?: boolean;
  coinProps?: Partial<typeof Typography>;
  component?: string;
};
