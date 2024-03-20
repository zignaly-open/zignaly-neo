import { AdditionalProps } from "components/types";

export type ZigRiskProps = AdditionalProps & {
  value: number;
  width?: number;
  height?: number;
  short?: boolean;
};

export type ZigRisk = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  color: string;
  id: number;
  zrisk: number;
};
