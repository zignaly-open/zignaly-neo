import { AdditionalProps } from "components/types";
import { RiskCategory } from "../ZScoreRing/types";

export type ZScoreBarProps = {
  value: number;
  max: number;
  category: RiskCategory;
} & AdditionalProps;
