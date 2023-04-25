import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Loader, CenteredLoader } from "./";

export default {
  title: "Display/Loaders",
  component: CenteredLoader,
} as ComponentMeta<typeof CenteredLoader>;

const TemplateSmall: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;
const TemplateCentered: ComponentStory<typeof CenteredLoader> = (args) => (
  <CenteredLoader {...args} />
);

export const Small = TemplateSmall.bind({});
Small.args = {};

export const Centered = TemplateCentered.bind({});
Centered.args = {};
