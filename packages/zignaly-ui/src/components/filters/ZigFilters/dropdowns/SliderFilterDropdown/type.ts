import { SliderFilter } from "../../types";

export type SliderFilterDropdownProps = {
  onChange: (filter: SliderFilter) => void;
  resetFilter: () => void;
  filter: SliderFilter;
};
