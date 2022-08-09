import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ButtonVariations } from "./storyLists";
import Button from "..";
import { NormalButton } from "../stories";
import { ReactComponent as ArrowDown } from "assets/icons/arrow-bottom-icon.svg";
import { ReactComponent as BTC } from "assets/icons/coins/btc.svg";

const icons = {
  arrowDown: <ArrowDown color={"#E1E9F0"} />,
  // eslint-disable-next-line react/jsx-pascal-case
  btc: <BTC />,
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
    {
      ...NormalButton.args,
      variant: "primary",
      rightElement: icons.btc,
      testIdRightElement: "MediumButtonIconVariation-right-element-1-2",
    },
    {
      ...NormalButton.args,
      variant: "primary",
      leftElement: icons.arrowDown,
      testIdLeftElement: "MediumButtonIconVariation-left-element-1-3",
    },
    {
      ...NormalButton.args,
      variant: "primary",
      leftElement: icons.arrowDown,
      rightElement: icons.btc,
      testIdLeftElement: "MediumButtonIconVariation-left-element-1-4",
      testIdRightElement: "MediumButtonIconVariation-right-element-1-4",
    },
  ],
  buttonsRow2: [
    { ...NormalButton.args, variant: "secondary" },
    {
      ...NormalButton.args,
      variant: "secondary",
      rightElement: icons.btc,
      testIdRightElement: "MediumButtonIconVariation-right-element-2-2",
    },
    {
      ...NormalButton.args,
      variant: "secondary",
      leftElement: icons.arrowDown,
      testIdLeftElement: "MediumButtonIconVariation-left-element-2-3",
    },
    {
      ...NormalButton.args,
      variant: "secondary",
      leftElement: icons.arrowDown,
      rightElement: icons.btc,
      testIdLeftElement: "MediumButtonIconVariation-left-element-2-4",
      testIdRightElement: "MediumButtonIconVariation-right-element-2-4",
    },
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
    {
      ...NormalButton.args,
      variant: "primary",
      size: "medium",
      color: "grey",
      testIdLeftElement: "MediumButtonTextColors-left-element-1-1",
      testIdCaptionElement: "MediumButtonTextColors-caption-element-1-1",
      testIdLoadingElement: "MediumButtonTextColors-loading-element-1-1",
      testIdRightElement: "MediumButtonTextColors-right-element-1-1",
    },
  ],
  buttonsRow2: [
    {
      ...NormalButton.args,
      variant: "secondary",
      size: "medium",
      color: "grey",
      testIdLeftElement: "MediumButtonTextColors-left-element-2-1",
      testIdCaptionElement: "MediumButtonTextColors-caption-element-2-1",
      testIdLoadingElement: "MediumButtonTextColors-loading-element-2-1",
      testIdRightElement: "MediumButtonTextColors-right-element-2-1",
    },
    {
      ...NormalButton.args,
      variant: "secondary",
      size: "medium",
      color: "green",
      testIdLeftElement: "MediumButtonTextColors-left-element-2-2",
      testIdCaptionElement: "MediumButtonTextColors-caption-element-2-2",
      testIdLoadingElement: "MediumButtonTextColors-loading-element-2-2",
      testIdRightElement: "MediumButtonTextColors-right-element-2-2",
    },
  ],
};

export const MediumButtonLoading = Template.bind({});
MediumButtonLoading.args = {
  buttonsRow1: [
    {
      ...NormalButton.args,
      variant: "primary",
      size: "medium",
      color: "grey",
      loading: true,
      testIdCaptionElement: "MediumButtonLoading-caption-element-1-1",
      testIdLoadingElement: "MediumButtonLoading-loading-element-1-1",
    },
    {
      ...NormalButton.args,
      variant: "primary",
      size: "medium",
      color: "grey",
      loading: true,
      caption: "Button",
      leftElement: icons.arrowDown,
      rightElement: icons.btc,
      testIdLeftElement: "MediumButtonLoading-left-element-1-2",
      testIdCaptionElement: "MediumButtonLoading-caption-element-1-2",
      testIdLoadingElement: "MediumButtonLoading-loading-element-1-2",
      testIdRightElement: "MediumButtonLoading-right-element-1-2",
    },
  ],
  buttonsRow2: [
    {
      ...NormalButton.args,
      variant: "secondary",
      size: "medium",
      color: "grey",
      loading: true,
      testIdCaptionElement: "MediumButtonLoading-caption-element-2-1",
      testIdLoadingElement: "MediumButtonLoading-loading-element-2-1",
    },
    {
      ...NormalButton.args,
      variant: "secondary",
      size: "medium",
      color: "grey",
      loading: true,
      caption: "Button",
      leftElement: icons.arrowDown,
      rightElement: icons.btc,
      testIdLeftElement: "MediumButtonLoading-left-element-2-2",
      testIdCaptionElement: "MediumButtonLoading-caption-element-2-2",
      testIdLoadingElement: "MediumButtonLoading-loading-element-2-2",
      testIdRightElement: "MediumButtonLoading-right-element-2-2",
    },
  ],
};
