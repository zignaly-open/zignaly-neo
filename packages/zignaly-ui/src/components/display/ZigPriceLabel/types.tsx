import { TypographyTypeMap } from "@mui/material";

type TypographyProps = Pick<
  TypographyTypeMap["props"],
  "color" | "variant" | "fontWeight" | "sx"
> & {
  component: string; // actualy this comes from the typographymap but whatever
};

export type ZigPriceLabelProps = TypographyProps & {
  value: string | number;
  coin?: string;
  precision?: number;
  usd?: boolean;
  coinProps?: TypographyProps;
};
