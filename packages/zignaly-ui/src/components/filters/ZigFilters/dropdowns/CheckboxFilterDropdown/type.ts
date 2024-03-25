import { CheckboxFilter } from "../../types";

export type CheckboxFilterDropdownProps = {
  onChange: (filter: CheckboxFilter) => void;
  filter: CheckboxFilter;
  resetFilter: () => void;
  minSpace?: number;
  mobile?: boolean;
  prefixId?: string;
  /**
   * If one selected value, show full value instead of count.
   */
  showFullSingleValue?: boolean;
  position?: "left" | "right";
};
