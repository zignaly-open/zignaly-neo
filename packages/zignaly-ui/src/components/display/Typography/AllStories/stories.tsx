import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextVariations } from "./storyLists";
import { Text } from "../stories";
import Typography from "..";

export default {
  title: "Display/Typography/All Stories",
  component: TextVariations,
  subcomponents: { Typography },
  argTypes: {
    textsRow1: {
      table: {
        disable: true,
      },
    },
    textsRow2: {
      table: {
        disable: true,
      },
    },
    textsRow3: {
      table: {
        disable: true,
      },
    },
    textsRow4: {
      table: {
        disable: true,
      },
    },
    textsRow5: {
      table: {
        disable: true,
      },
    }
  },
  parameters: {
    jest: ["test.tsx"],
  },
  decorators: [(story) => <div style={{ padding: "0.2rem" }}>{story()}</div>],
} as ComponentMeta<typeof TextVariations>;

const Template: ComponentStory<typeof TextVariations> = (args) => <TextVariations {...args} />;

export const Heading = Template.bind({});
Heading.args = {
  textsRow1: [
    { ...Text.args, variant: "h1", caption: "H1" },
    { ...Text.args, variant: "h2", caption: "H2" },
    { ...Text.args, variant: "h3", caption: "H3"},
    { ...Text.args, variant: "h4",caption: "H4" },
    { ...Text.args, variant: "h5", caption: "H5"},
  ],
};

export const Body = Template.bind({});
Body.args = {
  textsRow1: [
    { ...Text.args, variant: "body1", weight: "regular", caption: "Body1 Regular" },
    { ...Text.args, variant: "body1", weight: "demibold", caption: "Body1 Demibold" },
    { ...Text.args, variant: "body1", weight: "medium", caption: "Body1 Medium" },
    { ...Text.args, variant: "body1", weight: "regular", underline: true, caption: "Body1 Underline" },
  ],
  textsRow2: [
    { ...Text.args, variant: "body2", weight: "regular", caption: "Body2 Regular"  },
    { ...Text.args, variant: "body2", weight: "demibold", caption: "Body2 Demibold" },
    { ...Text.args, variant: "body2", weight: "medium", caption: "Body2 Medium" },
    { ...Text.args, variant: "body2", weight: "regular", underline: true, caption: "Body2 Underline" },
  ],
};

export const ButtonText = Template.bind({});
ButtonText.args = {
  textsRow1: [
    { ...Text.args, variant: "buttonxl", caption: "Button-xl" },
    { ...Text.args, variant: "buttonl", caption: "Button-l" },
    { ...Text.args, variant: "buttonm", caption: "Button-m" },
    { ...Text.args, variant: "buttonsm", caption: "Button-sm" },
  ],
};

export const BigNumber = Template.bind({});
BigNumber.args = {
  textsRow1: [{ ...Text.args, variant: "bigNumber", caption: "Big Number" }],
};
