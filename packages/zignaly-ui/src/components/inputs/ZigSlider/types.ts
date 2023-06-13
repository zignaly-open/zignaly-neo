import { SliderProps } from "@mui/material";

export type SliderLabels = {
  top?: string | JSX.Element;
  start?: string;
  end?: string;
  className?: string;
  /** Format slider value, by default it will shows value + % if max is 100. Set to null to disable. */
  valueLabelFormat?: (value: number) => string;
  showValues?: boolean;
  /**
   * Left value: max - value, Right value: value
   * Default, Left value: min, Right value: max
   */
  invertSliderValues?: boolean;
};
export type ZigSliderProps = SliderProps & {
  prefixId?: string;
  labels?: SliderLabels;
};
