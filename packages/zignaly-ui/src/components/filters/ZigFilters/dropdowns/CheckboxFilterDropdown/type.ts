import { CheckboxFilter } from "../../types";

export type CheckboxFilterDropdownProps = {
  onChange: (filter: CheckboxFilter) => void;
  filter: CheckboxFilter;
  resetFilter: () => void;
  minSpace?: number;
  mobile?: boolean;
  prefixId?: string;
};
