import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZScore from "./index";

type ZScoreProps = React.ComponentProps<typeof ZScore>;
type Story = StoryObj<ZScoreProps>;
const meta: Meta<ZScoreProps> = {
  title: "Display/ZScoreBar",
  component: ZScore,
};
export default meta;

export const Profits: Story = {
  args: {
    value: 10,
    max: 20,
    category: "profits",
  },
};

export const Risk: Story = {
  args: {
    value: 12,
    max: 20,
    category: "risk",
  },
};

export const Service: Story = {
  args: {
    value: 3,
    max: 20,
    category: "service",
  },
};

export const Balance: Story = {
  args: {
    value: 20,
    max: 20,
    category: "balanced",
  },
};
