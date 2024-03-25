import { SelectFilter } from "../../types";

export type SelectFilterDropdownProps = {
  onChange: (filter: SelectFilter) => void;
  filter: SelectFilter;
  minSpace?: number;
  resetFilter: () => void;
  mobile: boolean;
  prefixId?: string;
  position?: "left" | "right";
};
