import { SliderFilter } from "../../types";

export type SliderFilterProps = {
  filter: SliderFilter;
  onChange: (value: SliderFilter["value"]) => void;
};
