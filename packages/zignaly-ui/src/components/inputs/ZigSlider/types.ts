import { SliderProps } from "@mui/material";

export type SliderLabels = {
  start: string;
  end: string;
  percent?: boolean;
};
export type ZigSliderProps = SliderProps & { labels?: SliderLabels };
