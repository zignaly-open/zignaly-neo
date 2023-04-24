import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from "./";
import BrandImage from "./components/BrandImage";
import IconButton from "../../inputs/IconButton";

import { ReactComponent as ThreeDotsIcon } from "assets/icons/horizontal-three-dots-icon.svg";
import { ReactComponent as UserIcon } from "assets/icons/user-icon.svg";
import { HeaderLinksContainer } from "./styles";

export default {
  title: "Navigation/___FIXME____Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Main = Template.bind({});
Main.args = {
  leftElements: [
    <BrandImage key={"logo"} type={"isotype"} width={"32px"} height={"32px"} />,
    // we cannot put the logic for rendering the actiual links inside here because of different router implementations
    // and even if we use react-router-dom in all the places, it needs to be peer-dependat versions of react and react-dom
    <HeaderLinksContainer key="links">
      <a href={"javascript:void(0)"} key={"header-link-1"} className={"active"}>
        Menu 1
      </a>
      <a href={"javascript:void(0)"} key={"header-link-2"}>
        Menu 2
      </a>
      <a href={"javascript:void(0)"} key={"header-link-3"}>
        Menu 3
      </a>
    </HeaderLinksContainer>,
    <IconButton key={"menu"} variant={"secondary"} icon={<ThreeDotsIcon />} />,
  ],
  rightElements: [<IconButton key={"user"} variant={"flat"} icon={<UserIcon color="#65647E" />} />],
};
