import { AdditionalProps } from "components/types";

export type ZScoreRingsProps = {
  zScore: number;
  profits: number;
  risk: number;
  service: number;
  profitsMax: number;
  riskMax: number;
  serviceMax: number;
} & AdditionalProps;
