import { SelectFilter } from "../../types";

export type SelectFilterDropdownProps = {
  onChange: (filter: SelectFilter) => void;
  filter: SelectFilter;
};
