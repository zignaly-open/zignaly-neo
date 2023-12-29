import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZigLink from "./index";
import ZigTypography from "../../display/ZigTypography";

type ZigLinkProps = React.ComponentProps<typeof ZigLink>;

export default {
  title: "Inputs/ZigLink",
  component: ZigLink,
  argTypes: {
    href: {
      type: "string",
      defaultValue: "https://xfuturum.com",
    },
  },
} as Meta<ZigLinkProps>;

type Story = StoryObj<ZigLinkProps>;
export const Default: Story = {
  args: {
    children: "Amount to Withdraw",
  },
};

const TemplateTextButton = (args: ZigLinkProps) => {
  return (
    <>
      <ZigTypography component={"p"}>
        THis is basically the same thing as the ZigButton with type text, but with shorted syntax
        and less shenanigans
      </ZigTypography>

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

export const AllSamples: Story = {
  args: {
    children: "Amount to Withdraw",
    href: "https://xfuturum.com",
  },
  render: (props) => <TemplateTextButton {...props} />,
};
