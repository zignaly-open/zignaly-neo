import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import ZigLink from "./index";
import { ButtonGroup, ButtonGroupProps } from "@mui/material";
import { Add } from "@mui/icons-material";
import type * as All from "@mui/material/node_modules/@mui/system/styleFunctionSx";
import ZigTypography from "../../display/ZigTypography";

export default {
  title: "Inputs/ZigLink",
  component: ZigLink,
  argTypes: {
    href: {
      type: "string",
      defaultValue: "https://xfuturum.com",
    },
  },
} as Meta<typeof ZigLink>;

const Template: Story<typeof ZigLink> = (args) => <ZigLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Amount to Withdraw",
};

const TemplateTextButton: Story<typeof ZigLink> = (args) => {
  return (
    <>
      <ZigTypography variant={"h1"}>
        Hello <ZigLink {...args} />
      </ZigTypography>
      <ZigTypography variant={"h2"}>
        Hello <ZigLink {...args} />
      </ZigTypography>
      <ZigTypography variant={"h3"}>
        Hello <ZigLink {...args} />
      </ZigTypography>
      <ZigTypography variant={"h4"}>
        Hello <ZigLink {...args} />
      </ZigTypography>
      <ZigTypography variant={"body1"} component={"p"}>
        Hello, let me tell you a story of a button that lived in a very very long text. Hello, let
        me tell you a story of a button that lived in a very very long text. Hello, let me tell you
        a story of a button that lived in a very very long text. Yes, an <ZigLink {...args} /> lived
        in a very long text and then died unhappily ever after. Yes, that was story of a button that
        lived in a very very long text.
      </ZigTypography>

      <ZigTypography variant={"body1"} component={"p"}>
        Hello, let me tell you a story of a button that lived in a very very long text. Hello, let
        me tell you a story of a button that lived in a very very long text. Yes, a{" "}
        <ZigLink href="https://xfuturum.com">Button</ZigLink> can be a link, imagine that.
      </ZigTypography>

      <ZigTypography variant={"body2"} component={"p"}>
        Hello <ZigLink {...args} /> button in text in a very long
      </ZigTypography>
    </>
  );
};

const buttonExampleArgs = {
  children: "Amount to Withdraw",
  href: "https://xfuturum.com",
};

export const TextButton = TemplateTextButton.bind({});
TextButton.args = buttonExampleArgs;
