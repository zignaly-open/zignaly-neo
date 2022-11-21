import { TypographyTypeMap } from "@mui/material";

type TypographyProps = Pick<
  TypographyTypeMap["props"],
  "color" | "variant" | "fontWeight" | "sx"
> & {
  component: string; // actualy this comes from the typographymap but whatever
};

export type ZigPriceLabelProps = Partial<TypographyProps> & {
  value: string | number;
  coin?: string;
  precision?: number;
  usd?: boolean;
  coinProps?: Partial<TypographyProps>;
};
