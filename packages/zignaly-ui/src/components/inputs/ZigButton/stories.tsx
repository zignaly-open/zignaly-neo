import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import ZigButton, { ZigButtonProps } from "./index";
import { ButtonGroup, ButtonGroupProps, Grid } from "@mui/material";
import theme from "@zignaly-open/ps2/src/theme";
import { UserIcon } from "../../../index";
import { styled } from "@mui/system";
import { Add } from "@mui/icons-material";

export default {
  title: "Inputs/ZigButton",
  component: ZigButton,
  argTypes: {
    children: {
      type: "string",
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["outlined", "contained"],
    },
    tooltip: {
      type: "string",
    },
    size: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
  },
} as Meta<ZigButtonProps>;

const Template: Story<ZigButtonProps> = (args) => <ZigButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Amount to Withdraw",
  tooltip: "Hello",
  variant: "outlined",
};

const TemplateGroup: Story<ZigButtonProps> = ({ size, ...args }) => {
  const [value, setValue] = useState<number>(1);
  return (
    <ButtonGroup variant="outlined" size={size as ButtonGroupProps["size"]}>
      <ZigButton active={value === 1} onClick={() => setValue(1)} variant="outlined" {...args} />
      <ZigButton active={value === 2} onClick={() => setValue(2)} variant="outlined" {...args} />
      <ZigButton active={value === 3} onClick={() => setValue(3)} variant="outlined" {...args} />
    </ButtonGroup>
  );
};

export const Group = TemplateGroup.bind({});
Group.args = {
  children: "Amount to Withdraw",
};

const Wrapper = styled("div")`
  & > * {
    display: inline-block;
    margin-right: 15px !important;
  }
`;

const TemplateTextButton: Story<typeof ZigButton> = (args) => {
  return <ZigButton variant={"text"} {...args} />;
};

const TemplateOutlinedButton: Story<typeof ZigButton> = (args) => {
  return (
    <Wrapper>
      <ZigButton variant={"outlined"} size="small" {...args} />
      <ZigButton variant={"outlined"} size="medium" {...args} />
      <ZigButton variant={"outlined"} size="large" {...args} />
      <ZigButton variant={"outlined"} size="xlarge" {...args} />
    </Wrapper>
  );
};

const TemplateContainedButton: Story<typeof ZigButton> = (args) => {
  return (
    <Wrapper>
      <ZigButton variant={"contained"} size="small" {...args} />
      <ZigButton variant={"contained"} size="medium" {...args} />
      <ZigButton variant={"contained"} size="large" {...args} />
      <ZigButton variant={"contained"} size="xlarge" {...args} />
    </Wrapper>
  );
};

const TemplateIconButton: Story<typeof ZigButton> = (args) => {
  return (
    <Wrapper>
      <ZigButton startIcon={<Add />} variant={"contained"} size="small">
        {args.children}
      </ZigButton>
      <ZigButton startIcon={<Add />} variant={"contained"} size="medium">
        {args.children}
      </ZigButton>
      <ZigButton startIcon={<Add />} variant={"contained"} size="large">
        {args.children}
      </ZigButton>
      <ZigButton startIcon={<Add />} variant={"contained"} size="xlarge">
        {args.children}
      </ZigButton>
    </Wrapper>
  );
};

const buttonExampleArgs = {
  children: "Amount to Withdraw",
};

export const TextButton = TemplateTextButton.bind({});
export const ContainedButton = TemplateContainedButton.bind({});
export const OutlinedButton = TemplateOutlinedButton.bind({});
export const Icon = TemplateIconButton.bind({});

TextButton.args = buttonExampleArgs;
OutlinedButton.args = buttonExampleArgs;
ContainedButton.args = buttonExampleArgs;
Icon.args = buttonExampleArgs;
