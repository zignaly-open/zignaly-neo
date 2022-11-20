import { TypographyTypeMap } from "@mui/material";

type TypographyProps = Pick<
  TypographyTypeMap["props"],
  "color" | "component" | "variant" | "fontWeight" | "sx"
>;

export type ZigPriceLabelProps = TypographyProps & {
  value: string | number;
  coin?: string;
  precision?: number;
  usd?: boolean;
  coinProps?: TypographyProps;
};
