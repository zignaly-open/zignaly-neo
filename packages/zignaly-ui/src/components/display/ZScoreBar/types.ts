import { AdditionalProps } from "components/types";
import { ZScoreRiskCategory } from "../ZScoreRing";

export type ZScoreBarProps = {
  value: number;
  max: number;
  category: `${ZScoreRiskCategory}`;
} & AdditionalProps;
