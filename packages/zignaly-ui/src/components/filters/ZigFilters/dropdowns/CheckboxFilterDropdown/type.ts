import { CheckboxFilter } from "../../types";

export type CheckboxFilterDropdownProps = {
  onChange: (filter: CheckboxFilter) => void;
  filter: CheckboxFilter;
  id?: string;
  resetFilter: () => void;
  minSpace?: number;
  mobile?: boolean;
};
