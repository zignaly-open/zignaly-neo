import { Typography, TypographyProps } from "@mui/material";

export type ZigPriceLabelProps = Partial<TypographyProps> & {
  value: string | number;
  coin?: string;
  precision?: number;
  exact?: boolean;
  prefix?: string | JSX.Element;
  shorten?: boolean;
  showTooltip?: boolean;
  usd?: boolean;
  coinProps?: Partial<typeof Typography>;
  component?: string;
  alwaysShowSign?: boolean;
};
