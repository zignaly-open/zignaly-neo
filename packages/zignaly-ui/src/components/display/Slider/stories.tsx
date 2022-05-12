// Dependencies
import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// Component
import SliderProgress from ".";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
`;

export default {
  title: "Display/Slider",
  component: SliderProgress,
} as ComponentMeta<typeof SliderProgress>;

const Template: ComponentStory<typeof SliderProgress> = (args) => (
  <Container>
    <SliderProgress {...args} />
  </Container>
);

const defaultProps = {
  value: 25,
};

export const SliderProgressBar = Template.bind({});
SliderProgressBar.args = {
  ...defaultProps,
  max: 50,
};
