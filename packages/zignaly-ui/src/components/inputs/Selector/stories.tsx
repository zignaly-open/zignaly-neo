// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import Select from "./";

// Assets
import EthereumIcon from "assets/icons/coins/eth.svg";
import BitcoinIcon from "assets/icons/coins/btc.svg";
import DogecoinIcon from "assets/icons/coins/doge.svg";

const options = [
  {
    caption: "Ethereum",
    leftElement: EthereumIcon,
  },
  {
    caption: "Bitcoin",
    leftElement: BitcoinIcon,
  },
  {
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
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Currencies",
  placeholder: "Select your currency",
  options,
};
