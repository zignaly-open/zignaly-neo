import React from "react";

export type ZigSliderInputProps = {
  value: number;
  style?: React.CSSProperties;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  mode?: keyof typeof SliderModes | null;
  labels?: {
    top: string | null;
    left: string | null;
    right: string | null;
  };
};

export const SliderModes = {
  normal: "normal",
  range: "range",
};
