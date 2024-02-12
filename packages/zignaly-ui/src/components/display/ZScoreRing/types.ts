import { AdditionalProps } from "components/types";

export enum ZScoreRiskCategory {
  Profits = "profits",
  Risk = "risk",
  Service = "service",
  Balanced = "balanced",
}

export type ZScoreRingProps = {
  value: number;
  max: number;
  category: `${ZScoreRiskCategory}`;
} & AdditionalProps;
