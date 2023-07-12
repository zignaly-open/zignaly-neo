import { SliderProps } from "@mui/material";

export type SliderLabels = {
  top?: string | JSX.Element;
  start?: string;
  end?: string;
  showValues?: boolean;
  /**
   * Default, Left value: min, Right value: max
   * Inverted: Left value: max - value, Right value: value
   */
  invertSliderValues?: boolean;
  /**
   * Show labels above the values, default to true.
   */
  labelsAbove?: boolean;
};

export type ZigSliderProps = SliderProps & {
  prefixId?: string;
  labels?: SliderLabels;
  /** Format slider value, by default it will add a % sign if max is 100. Set to null to always show the number only. */
  valueLabelFormat?: (value: number) => string;
  className?: string;
};
