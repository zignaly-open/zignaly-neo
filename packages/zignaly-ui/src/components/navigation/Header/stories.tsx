import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from "./";
import BrandImage from "./components/BrandImage";
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
  ],
};
