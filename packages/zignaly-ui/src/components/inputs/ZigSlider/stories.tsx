import { Meta, StoryObj } from "@storybook/react";
import { ZigSlider } from "./index";

const meta = {
  title: "Inputs/ZigSlider",
  component: ZigSlider,
  argTypes: {
    // label: {
    //   type: "string",
    // },
    // placeholder: {
    //   type: "string",
    // },
    // wide: {
    //   type: "boolean",
    //   defaultValue: false,
    // },
    // disabled: {
    //   type: "boolean",
    //   defaultValue: false,
    // },
    // defaultValue: {
    //   type: "string",
    // },
    // error: {
    //   type: "string",
    //   defaultValue: "",
    // },
  },
} as Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = { args: {} };

export const WithLabel: Story = {
  args: {
    labels: { start: "Start", end: "End", displayDifference: true },
  },
};
