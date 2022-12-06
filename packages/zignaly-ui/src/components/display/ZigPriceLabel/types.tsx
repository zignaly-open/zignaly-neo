import { TypographyTypeMap } from "@mui/material";

export type ZigPriceLabelProps = Partial<TypographyTypeMap["props"]> & {
  value: string | number;
  coin?: string;
  precision?: number;
  usd?: boolean;
  coinProps?: Partial<TypographyTypeMap["props"]>;
};
