import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZScoreRings from "./index";

type Props = React.ComponentProps<typeof ZScoreRings>;
type Story = StoryObj<Props>;
const meta: Meta<Props> = {
  title: "Display/ZScoreRings",
  component: ZScoreRings,
};
export default meta;

export const Default: Story = {
  args: {
    zScore: 86,
    profits: 45,
    risk: 24,
    service: 17,
    profitsMax: 45,
    riskMax: 25,
    serviceMax: 20,
  },
};
