import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import InvestSlider from ".";

const Container = styled.div`
  width: 300px;
  margin: 15px;
`;
export default {
  title: "Display/InvestSlider",
  component: InvestSlider,
} as ComponentMeta<typeof InvestSlider>;

const Template: ComponentStory<typeof InvestSlider> = (args) => (
  <Container>
    <InvestSlider {...args} />
  </Container>
);

export const Deposit = Template.bind({});
Deposit.args = {
  type: "deposit",
};

export const Withdraw = Template.bind({});
Withdraw.args = {
  type: "withdraw",
};
