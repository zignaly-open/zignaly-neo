import { SelectFilter } from "../../types";

export type SelectFilterDropdownProps = {
  onChange: (filter: SelectFilter) => void;
  filter: SelectFilter;
  id?: string;
  minSpace?: number;
  resetFilter: () => void;
  mobile: boolean;
};
