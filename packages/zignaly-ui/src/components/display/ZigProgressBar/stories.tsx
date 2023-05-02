import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ZigProgressBar from ".";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
`;

export default {
  title: "Display/ZigProgressBar",
  component: ZigProgressBar,
} as ComponentMeta<typeof ZigProgressBar>;

const Template: ComponentStory<typeof ZigProgressBar> = (args) => (
  <Container>
    <ZigProgressBar {...args} />
  </Container>
);

const defaultProps = {
  value: 25,
};

export const ZigProgressBarBar = Template.bind({});
ZigProgressBarBar.args = {
  ...defaultProps,
  max: 50,
};
