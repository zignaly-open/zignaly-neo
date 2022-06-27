// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import Select from "./";

// Assets
import EthereumIcon from "assets/icons/coins/eth.svg?url";
import BitcoinIcon from "assets/icons/coins/btc.svg?url";
import DogecoinIcon from "assets/icons/coins/doge.svg?url";

const options = [
  {
    index: 0,
    caption: "Ethereum",
    leftElement: EthereumIcon,
  },
  {
    index: 1,
    caption: "Bitcoin",
    leftElement: BitcoinIcon,
  },
  {
    index: 2,
    caption: "Dogecoin",
    leftElement: DogecoinIcon,
  },
];

export default {
  title: "Inputs/Select",
  component: Select,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/ab8A8un5PEQRHyyJgSIt2J/Forms?node-id=307%3A241",
    },
  },
  argTypes: {
    fullWidth: {
      control: { type: "boolean" },
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = React.useState(null);
  return <Select {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Currencies",
  placeholder: "Select your currency",
  options,
};

export const MenuIsActive = Template.bind({});
MenuIsActive.args = {
  label: "Currencies",
  placeholder: "Select your currency",
  options,
  isMenuActive: true,
};
