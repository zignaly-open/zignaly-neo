import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZScore from "./index";

type ZScoreProps = React.ComponentProps<typeof ZScore>;
type Story = StoryObj<ZScoreProps>;
const meta: Meta<ZScoreProps> = {
  title: "Display/ZScore",
  component: ZScore,
};
export default meta;

export const Default: Story = {
  args: {
    value: 90,
  },
};

export const Mini: Story = {
  args: {
    value: 23,
    mini: true,
  },
};
