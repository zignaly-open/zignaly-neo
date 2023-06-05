import { SliderProps } from "@mui/material";

export type SliderLabels = {
  start: string;
  end: string;
  displayDifference?: boolean;
};
export type ZigSliderProps = SliderProps & { labels?: SliderLabels };
