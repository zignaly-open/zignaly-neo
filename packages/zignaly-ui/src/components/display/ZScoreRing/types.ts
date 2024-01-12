import { AdditionalProps } from "components/types";

export type RiskCategory = "profits" | "risk" | "service" | "balanced";
export type ZScoreRingProps = {
  value: number;
  max: number;
  category: RiskCategory;
} & AdditionalProps;
