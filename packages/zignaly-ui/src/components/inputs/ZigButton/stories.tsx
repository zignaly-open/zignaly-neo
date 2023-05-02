import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import ZigButton, { ZigButtonProps } from "./index";
import { ButtonGroup, ButtonGroupProps } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Add } from "@mui/icons-material";
import ZigTypography from "../../display/ZigTypography";

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

export const Tooltip = Template.bind({});
Tooltip.args = {
  children: "Amount to Withdraw",
  variant: "contained",
  tooltip: "I will never give you up I will never let you down",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Amount to Withdraw",
  variant: "contained",
  tooltip: "Molodoy chelovek, vy chto, ne vidite, u nas obed",
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  children: "Amount to Withdraw",
  variant: "contained",
  loading: true,
};

export const Link = Template.bind({});
Link.args = {
  children: "The technical partner you can rely on",
  variant: "contained",
  href: "https://xfuturum.com",
};

const Wrapper = styled("div")`
  & > * {
    display: inline-block;
    margin-right: 15px !important;
  }
`;

const TemplateTextButton: Story<typeof ZigButton> = (args) => {
  return (
    <>
      <ZigTypography variant={"h1"}>
        Hello <ZigButton variant={"text"} {...args} />
      </ZigTypography>
      <ZigTypography variant={"h2"}>
        Hello <ZigButton variant={"text"} {...args} />
      </ZigTypography>
      <ZigTypography variant={"h3"}>
        Hello <ZigButton variant={"text"} {...args} />
      </ZigTypography>
      <ZigTypography variant={"h4"}>
        Hello <ZigButton variant={"text"} {...args} />
      </ZigTypography>
      <ZigTypography variant={"body1"} component={"p"}>
        Hello, let me tell you a story of a button that lived in a very very long text. Hello, let
        me tell you a story of a button that lived in a very very long text. Hello, let me tell you
        a story of a button that lived in a very very long text. Yes, an{" "}
        <ZigButton variant={"text"} {...args} /> lived in a very long text and then died unhappily
        ever after. Yes, that was story of a button that lived in a very very long text.
      </ZigTypography>

      <ZigTypography variant={"body1"} component={"p"}>
        Hello, let me tell you a story of a button that lived in a very very long text. Hello, let
        me tell you a story of a button that lived in a very very long text. Yes, a{" "}
        <ZigButton startIcon={<Add />} endIcon={<Add />} variant={"text"}>
          Button
        </ZigButton>{" "}
        can have icons, imagine that.
      </ZigTypography>

      <ZigTypography variant={"body1"} component={"p"}>
        Hello, let me tell you a story of a button that lived in a very very long text. Hello, let
        me tell you a story of a button that lived in a very very long text. Yes, a{" "}
        <ZigButton href="https://xfuturum.com" variant={"text"}>
          Button
        </ZigButton>{" "}
        can be a link, imagine that.
      </ZigTypography>

      <ZigTypography variant={"body2"} component={"p"}>
        Hello <ZigButton variant={"text"} {...args} /> button in text in a very long
      </ZigTypography>
    </>
  );
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

const TemplateTwoStorey: Story<typeof ZigButton> = (args) => {
  return (
    <Wrapper>
      <ZigButton
        variant={"contained"}
        size="large"
        startIcon={<Add sx={{ height: 30, width: 30 }} />}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          Invest
          <ZigTypography variant={"h5"} color="neutral150">
            Invest fee 146%
          </ZigTypography>
        </Box>
      </ZigButton>

      <ZigButton variant={"contained"} size="large">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          Invest
          <ZigTypography variant={"h5"} color="neutral150">
            Invest fee 146%
          </ZigTypography>
        </Box>
      </ZigButton>

      {/*Hack to show "Show code"*/}
      {args.children}
    </Wrapper>
  );
};

const TemplateLoadingButtons: Story<typeof ZigButton> = (args) => {
  return (
    <>
      <Wrapper>
        <ZigButton variant={"outlined"} loading size="small" {...args} />
        <ZigButton variant={"outlined"} loading size="medium" {...args} />
        <ZigButton variant={"outlined"} loading size="large" {...args} />
        <ZigButton variant={"outlined"} loading size="xlarge" {...args} />
      </Wrapper>
      <Wrapper>
        <ZigButton variant={"contained"} loading size="small" {...args} />
        <ZigButton variant={"contained"} loading size="medium" {...args} />
        <ZigButton variant={"contained"} loading size="large" {...args} />
        <ZigButton variant={"contained"} loading size="xlarge" {...args} />
      </Wrapper>
      <Wrapper>
        <ZigTypography variant={"body1"} component={"p"}>
          Please welcome the{" "}
          <ZigButton loading variant={"text"}>
            Button
          </ZigButton>
          !
        </ZigTypography>
      </Wrapper>
    </>
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
export const LoadingAll = TemplateLoadingButtons.bind({});
export const TwoStorey = TemplateTwoStorey.bind({});

TextButton.args = buttonExampleArgs;
OutlinedButton.args = buttonExampleArgs;
ContainedButton.args = buttonExampleArgs;
Icon.args = buttonExampleArgs;
LoadingAll.args = buttonExampleArgs;
TwoStorey.args = {};
