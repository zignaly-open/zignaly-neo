import { SliderFilter } from "../../types";

export type SliderFilterDropdownProps = {
  onChange: (value: SliderFilter["value"]) => void;
  filter: SliderFilter;
};
