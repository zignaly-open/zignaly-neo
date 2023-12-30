import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZigRisk from "./index";

type ZigRiskProps = React.ComponentProps<typeof ZigRisk>;
type Story = StoryObj<ZigRiskProps>;
const meta: Meta<ZigRiskProps> = {
  title: "Display/ZigRisk",
  component: ZigRisk,
};
export default meta;

export const Default: Story = {
  args: {
    value: 1,
  },
};
