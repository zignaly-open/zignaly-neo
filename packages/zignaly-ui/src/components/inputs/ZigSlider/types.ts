import { SliderProps } from "@mui/material";

export type SliderLabels = {
  top: string | JSX.Element;
  start: string;
  end: string;
  percent?: boolean;
};
export type ZigSliderProps = SliderProps & { prefixId?: string; labels?: SliderLabels };
