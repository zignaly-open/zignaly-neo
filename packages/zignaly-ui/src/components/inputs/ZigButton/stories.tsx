import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import ZigButton, { ZigButtonProps } from "./index";
import { ButtonGroup } from "@mui/material";

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

const TemplateGroup: Story = ({ size, ...args }) => {
  const [value, setValue] = useState<number>(1);
  return (
    <ButtonGroup variant="outlined" size={size}>
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

const TemplateSizes: Story<typeof ZigButton> = (args) => {
  return (
    <>
      <ZigButton size="small" {...args} />
      <ZigButton size="medium" {...args} />
      <ZigButton size="large" {...args} />
      <br />
      <ZigButton variant={"outlined"} size="small" {...args} />
      <ZigButton variant={"outlined"} size="medium" {...args} />
      <ZigButton variant={"outlined"} size="large" {...args} />
      <br />
      <ZigButton variant={"contained"} size="small" {...args} />
      <ZigButton variant={"contained"} size="medium" {...args} />
      <ZigButton variant={"contained"} size="large" {...args} />
    </>
  );
};

export const Sizes = TemplateSizes.bind({});
Sizes.args = {
  children: "Amount to Withdraw",
};
