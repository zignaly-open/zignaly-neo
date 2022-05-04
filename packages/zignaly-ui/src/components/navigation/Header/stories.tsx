// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
import Header from "./";
import BrandImage from "./components/BrandImage";
import Navigation from "./components/Navigation";
import IconButton from "../../inputs/IconButton";

import ThreeDotsIcon from "assets/icons/horizontal-three-dots-icon.svg";
import UserIcon from "assets/icons/user-icon.svg";
import ZigBalance from "./components/ZigsBalance";

export default {
  title: "Navigation/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Main = Template.bind({});
Main.args = {
  leftElements: [
    <BrandImage key={"logo"} type={"isotype"} width={"32px"} height={"32px"} />,
    <Navigation
      key={"navigation"}
      routes={[
        {
          path: "#",
          label: "Profit Sharing",
          isActive: true,
        },
        {
          path: "#",
          label: "Staking",
        },
        {
          path: "#",
          label: "ZIGpad",
        },
      ]}
    />,
    <IconButton
      key={"menu"}
      variant={"secondary"}
      icon={<ThreeDotsIcon />}
      renderDropDown={<div>DropDown Container</div>}
      dropDownOptions={{
        position: "static",
      }}
    />,
  ],
  rightElements: [
    <ZigBalance key={"balance"} balance={0} />,
    <IconButton
      key={"user"}
      variant={"flat"}
      icon={<UserIcon />}
      renderDropDown={<div>DropDown Container</div>}
      dropDownOptions={{
        alignment: "right",
        position: "static",
      }}
    />,
  ],
};
