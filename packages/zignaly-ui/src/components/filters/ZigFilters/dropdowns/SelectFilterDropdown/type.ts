import { SelectFilter } from "../../types";

export type SelectFilterDropdownProps = {
  onChange: (value: string) => void;
  filter: SelectFilter;
};
