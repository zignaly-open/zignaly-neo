import { SliderFilter } from "../../types";

export type SliderFilterProps = {
  filter: SliderFilter;
  onChange: (filter: SliderFilter) => void;
  mobile?: boolean;
};
