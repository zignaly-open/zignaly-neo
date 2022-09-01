import React from "react";

export type SliderInputProps = {
  value: number;
  className?: string;
  style?: React.CSSProperties;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  initialValue: number;
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
