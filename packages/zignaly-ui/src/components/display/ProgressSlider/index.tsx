import * as React from "react";
import { ReactElement } from "react";

import { Bar, Dot, DotContainer, Label, Layout } from "./styles";

import { ProgressSliderProps } from "./types";

function ProgressSlider({ className, value, max = 100 }: ProgressSliderProps): ReactElement {
  const normalizedValue = (100 * Math.min(value, max)) / max;
  return (
    <Layout className={className}>
      <Label>0%</Label>
      <Bar>
        <DotContainer value={normalizedValue}>
          <Dot />
          <Label>{value}%</Label>
        </DotContainer>
      </Bar>
      <Label>{max}%</Label>
    </Layout>
  );
}

export default ProgressSlider;
