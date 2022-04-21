// Dependencies
import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// Component
import Loader, { LoaderTypes } from "./";

export default {
  title: "Display/Loader",
  component: Loader,
  parameters: {
    jest: ["test.tsx"],
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

const defaultProps = {
  width: "34px",
  height: "34px",
  color: "#FFF",
  ariaLabel: "Loader Example",
};

export const Bars = Template.bind({});
Bars.args = {
  type: LoaderTypes.BARS,
  ...defaultProps,
};

export const Audio = Template.bind({});
Audio.args = {
  type: LoaderTypes.AUDIO,
  ...defaultProps,
};

export const Circles = Template.bind({});
Circles.args = {
  type: LoaderTypes.CIRCLES,
  ...defaultProps,
};

export const Grid = Template.bind({});
Grid.args = {
  type: LoaderTypes.GRID,
  ...defaultProps,
};

export const Oval = Template.bind({});
Oval.args = {
  type: LoaderTypes.OVAL,
  strokeWidth: "2",
  secondaryColor: "rgba(255, 255, 255, 0.3)",
  ...defaultProps,
};

export const FallingLines = Template.bind({});
FallingLines.args = {
  type: LoaderTypes.FALLING_LINES,
  ...defaultProps,
};

export const TailSpin = Template.bind({});
TailSpin.args = {
  type: LoaderTypes.TAILSPIN,
  ...defaultProps,
};

export const ThreeDots = Template.bind({});
ThreeDots.args = {
  type: LoaderTypes.THREE_DOTS,
  ...defaultProps,
};
