// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import Button, { ButtonSizes, ButtonVariants } from "./";

// Assets
import CloseIcon from "../../../assets/icons/close-icon.svg";
import ArrowDown from "../../../assets/icons/arrow-bottom-icon.svg";

export default {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/VaAFxJqlZERpeEHw5S5coY/Buttons?node-id=402%3A963",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryAndSmall = Template.bind({});
PrimaryAndSmall.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.SMALL,
};

export const PrimaryAndSmallDisabled = Template.bind({});
PrimaryAndSmallDisabled.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.SMALL,
  disabled: true,
};

export const PrimaryAndSmallOnlyIcon = Template.bind({});
PrimaryAndSmallOnlyIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.SMALL,
  icon: CloseIcon,
};

export const PrimaryAndSmallWithLeftIcon = Template.bind({});
PrimaryAndSmallWithLeftIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.SMALL,
  leftElement: CloseIcon,
};

export const PrimaryAndSmallWithRightIcon = Template.bind({});
PrimaryAndSmallWithRightIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.SMALL,
  rightElement: CloseIcon,
};

export const PrimaryAndSmallWithBothIcon = Template.bind({});
PrimaryAndSmallWithBothIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.SMALL,
  leftElement: CloseIcon,
  rightElement: ArrowDown,
};

export const PrimaryAndNormal = Template.bind({});
PrimaryAndNormal.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.NORMAL,
};

export const PrimaryAndNormalOnlyIcon = Template.bind({});
PrimaryAndNormalOnlyIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.NORMAL,
  icon: CloseIcon,
};

export const PrimaryAndNormalDisabled = Template.bind({});
PrimaryAndNormalDisabled.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.SMALL,
  disabled: true,
};

export const PrimaryAndNormalWithLeftIcon = Template.bind({});
PrimaryAndNormalWithLeftIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.NORMAL,
  leftElement: CloseIcon,
};

export const PrimaryAndNormalWithRightIcon = Template.bind({});
PrimaryAndNormalWithRightIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.NORMAL,
  rightElement: CloseIcon,
};

export const PrimaryAndNormalWithBothIcon = Template.bind({});
PrimaryAndNormalWithBothIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.NORMAL,
  leftElement: CloseIcon,
  rightElement: ArrowDown,
};

export const PrimaryAndLarge = Template.bind({});
PrimaryAndLarge.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.LARGE,
};

export const PrimaryAndLargeOnlyIcon = Template.bind({});
PrimaryAndLargeOnlyIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.LARGE,
  icon: CloseIcon,
};

export const PrimaryAndLargeDisabled = Template.bind({});
PrimaryAndLargeDisabled.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.LARGE,
  disabled: true,
};

export const PrimaryAndLargeWithLeftIcon = Template.bind({});
PrimaryAndLargeWithLeftIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.LARGE,
  leftElement: CloseIcon,
};

export const PrimaryAndLargeWithRightIcon = Template.bind({});
PrimaryAndLargeWithRightIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.LARGE,
  rightElement: CloseIcon,
};

export const PrimaryAndLargeWithBothIcon = Template.bind({});
PrimaryAndLargeWithBothIcon.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.LARGE,
  leftElement: CloseIcon,
  rightElement: ArrowDown,
};

export const SecondaryAndSmall = Template.bind({});
SecondaryAndSmall.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.SMALL,
};

export const SecondaryAndSmallOnlyIcon = Template.bind({});
SecondaryAndSmallOnlyIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.SMALL,
  icon: CloseIcon,
};

export const SecondaryAndSmallDisabled = Template.bind({});
SecondaryAndSmallDisabled.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.NORMAL,
  disabled: true,
};

export const SecondaryAndNormal = Template.bind({});
SecondaryAndNormal.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.NORMAL,
};

export const SecondaryAndNormalOnlyIcon = Template.bind({});
SecondaryAndNormalOnlyIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.LARGE,
  icon: CloseIcon,
};

export const SecondaryAndNormalDisabled = Template.bind({});
SecondaryAndNormalDisabled.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.LARGE,
  disabled: true,
};

export const SecondaryAndLarge = Template.bind({});
SecondaryAndLarge.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.LARGE,
};

export const SecondaryAndLargeOnlyIcon = Template.bind({});
SecondaryAndLargeOnlyIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.LARGE,
  icon: CloseIcon,
};

export const SecondaryAndLargeDisabled = Template.bind({});
SecondaryAndLargeDisabled.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.LARGE,
  disabled: true,
};

export const SecondaryAndNormalWithLeftIcon = Template.bind({});
SecondaryAndNormalWithLeftIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.NORMAL,
  leftElement: CloseIcon,
};

export const SecondaryAndNormalWithRightIcon = Template.bind({});
SecondaryAndNormalWithRightIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.NORMAL,
  rightElement: CloseIcon,
};

export const SecondaryAndNormalWithBothIcon = Template.bind({});
SecondaryAndNormalWithBothIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.NORMAL,
  leftElement: CloseIcon,
  rightElement: ArrowDown,
};

export const SecondaryAndLargeWithLeftIcon = Template.bind({});
SecondaryAndLargeWithLeftIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.LARGE,
  leftElement: CloseIcon,
};

export const SecondaryAndLargeWithRightIcon = Template.bind({});
SecondaryAndLargeWithRightIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.LARGE,
  rightElement: CloseIcon,
};

export const SecondaryAndLargeWithBothIcon = Template.bind({});
SecondaryAndLargeWithBothIcon.args = {
  variant: ButtonVariants.SECONDARY,
  size: ButtonSizes.LARGE,
  leftElement: CloseIcon,
  rightElement: ArrowDown,
};
