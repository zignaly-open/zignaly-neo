import React, { useState } from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ZigButton from "./index";
import "@mui/system";
import { ButtonGroup } from "@mui/material";

const result: ComponentMeta<typeof ZigButton> = {
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
};

export default result;

const Template: ComponentStory<typeof ZigButton> = (args) => <ZigButton {...args} />;

export const Default: ComponentMeta<typeof ZigButton> = Template.bind({});
Default.args = {
  children: "Amount to Withdraw",
  tooltip: "Hello",
  variant: "outlined",
};

const TemplateGroup: ComponentStory<typeof ZigButton> = ({ variant, size, ...args }) => {
  const [value, setValue] = useState<number>(1);
  return (
    <ButtonGroup variant="outlined" size={size}>
      <ZigButton active={value === 1} onClick={() => setValue(1)} variant="outlined" {...args} />
      <ZigButton active={value === 2} onClick={() => setValue(2)} variant="outlined" {...args} />
      <ZigButton active={value === 3} onClick={() => setValue(3)} variant="outlined" {...args} />
    </ButtonGroup>
  );
};

export const Group: ComponentMeta<typeof ZigButton> = TemplateGroup.bind({});
Group.args = {
  children: "Amount to Withdraw",
};

const TemplateSizes: ComponentStory<typeof ZigButton> = ({ variant, size, ...args }) => {
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

export const Sizes: ComponentMeta<typeof ZigButton> = TemplateSizes.bind({});
Sizes.args = {
  children: "Amount to Withdraw",
};
