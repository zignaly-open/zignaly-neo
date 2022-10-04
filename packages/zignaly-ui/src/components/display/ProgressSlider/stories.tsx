import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ProgressSlider from ".";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
`;

export default {
  title: "Display/ProgressSlider",
  component: ProgressSlider,
} as ComponentMeta<typeof ProgressSlider>;

const Template: ComponentStory<typeof ProgressSlider> = (args) => (
  <Container>
    <ProgressSlider {...args} />
  </Container>
);

const defaultProps = {
  value: 25,
};

export const ProgressSliderBar = Template.bind({});
ProgressSliderBar.args = {
  ...defaultProps,
  max: 50,
};
