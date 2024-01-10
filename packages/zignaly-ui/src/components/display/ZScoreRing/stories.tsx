import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZScoreRing from "./index";

type Props = React.ComponentProps<typeof ZScoreRing>;
type Story = StoryObj<Props>;
const meta: Meta<Props> = {
  title: "Display/ZScoreRing",
  component: ZScoreRing,
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
    category: "balance",
  },
};
