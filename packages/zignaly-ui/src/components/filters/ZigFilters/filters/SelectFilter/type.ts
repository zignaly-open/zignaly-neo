import { SelectFilter } from "../../types";

export type SelectFilterProps = {
  filter: SelectFilter;
  onChange: (filter: SelectFilter) => void;
  mobile?: boolean;
};
