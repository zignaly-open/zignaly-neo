import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ButtonVariations } from "./storyLists";
import Button from "..";
import { NormalButton } from "../stories";
import ArrowDown from "assets/icons/arrow-bottom-icon.svg";
import BTC from "assets/icons/coins/btc.svg";

const icons = {
  arrowDown: <ArrowDown color={"#E1E9F0"} />,
  btc: <BTC />
};

export default {
  title: "Inputs/Button/All stories",
  component: ButtonVariations,
  subcomponents: { Button },
  parameters: {
    jest: ["test.tsx"],
  },
  decorators: [(story) => <div style={{ padding: "0.2rem" }}>{story()}</div>],
} as ComponentMeta<typeof ButtonVariations>;

const Template: ComponentStory<typeof ButtonVariations> = (args) => <ButtonVariations {...args} />;

export const MediumButtonIconVariation = Template.bind({});
MediumButtonIconVariation.args = {
  buttonsRow1: [
    { ...NormalButton.args, variant: "primary" },
    { ...NormalButton.args, variant: "primary", rightElement: icons.btc},
    { ...NormalButton.args, variant: "primary", leftElement: icons.arrowDown },
    { ...NormalButton.args, variant: "primary", leftElement: icons.arrowDown, rightElement: icons.btc },
  ],
  buttonsRow2: [
    { ...NormalButton.args, variant: "secondary" },
    { ...NormalButton.args, variant: "secondary", rightElement: icons.btc },
    { ...NormalButton.args, variant: "secondary", leftElement: icons.arrowDown },
    { ...NormalButton.args, variant: "secondary", leftElement: icons.arrowDown, rightElement: icons.btc },
  ],
};

export const ButtonSizes = Template.bind({});
ButtonSizes.args = {
  buttonsRow1: [
    { ...NormalButton.args, variant: "primary", size: "small" },
    { ...NormalButton.args, variant: "primary", size: "medium" },
    { ...NormalButton.args, variant: "primary", size: "large" },
    { ...NormalButton.args, variant: "primary", size: "xlarge" },
  ],
  buttonsRow2: [
    { ...NormalButton.args, variant: "secondary", size: "small" },
    { ...NormalButton.args, variant: "secondary", size: "medium" },
    { ...NormalButton.args, variant: "secondary", size: "large" },
    { ...NormalButton.args, variant: "secondary", size: "xlarge" },
  ],
};

export const MediumButtonDisabled = Template.bind({});
MediumButtonDisabled.args = {
  buttonsRow1: [
    { ...NormalButton.args, variant: "primary", size: "medium", disabled: false },
    { ...NormalButton.args, variant: "primary", size: "medium", disabled: true },
  ],
  buttonsRow2: [
    { ...NormalButton.args, variant: "secondary", size: "medium", disabled: false },
    { ...NormalButton.args, variant: "secondary", size: "medium", disabled: true },
  ],
};

export const MediumButtonTextColors = Template.bind({});
MediumButtonTextColors.args = {
  buttonsRow1: [
    { ...NormalButton.args, variant: "primary", size: "medium", color: "grey" },
  ],
  buttonsRow2: [
    { ...NormalButton.args, variant: "secondary", size: "medium", color: "grey" },
    { ...NormalButton.args, variant: "secondary", size: "medium", color: "green" },
  ],
};
