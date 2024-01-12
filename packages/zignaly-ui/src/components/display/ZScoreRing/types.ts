import { AdditionalProps } from "components/types";

export type ZScoreRiskCategory = "profits" | "risk" | "service" | "balanced";
export type ZScoreRingProps = {
  value: number;
  max: number;
  category: ZScoreRiskCategory;
} & AdditionalProps;
