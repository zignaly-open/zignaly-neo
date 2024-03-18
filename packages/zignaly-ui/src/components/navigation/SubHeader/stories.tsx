import React, { useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import SubHeader from "./";

export default {
  title: "Navigation/SubHeader",
  component: SubHeader,
} as ComponentMeta<typeof SubHeader>;

const Template: ComponentStory<typeof SubHeader> = (args) => <SubHeader {...args} />;

export const Main = () => {
  const [activeRoute, setActiveRoute] = useState("sub-menu__user");
  const options = useMemo(
    () => [
      {
        name: "User",
        onClick: () => setActiveRoute("sub-menu__user"),
        id: "sub-menu__user",
        active: activeRoute === "sub-menu__user",
      },
      {
        name: "Robot",
        routes: [
          {
            name: "Robot A",
            onClick: () => setActiveRoute("sub-menu__robot-1"),
            id: "sub-menu__robot-1",
            active: activeRoute === "sub-menu__robot-1",
          },
          {
            name: "Robot B",
            onClick: () => setActiveRoute("sub-menu__robot-2"),
            id: "sub-menu__robot-2",
            active: activeRoute === "sub-menu__robot-2",
          },
        ],
        id: "sub-menu__robot",
      },
      {
        name: "Catgirl",
        onClick: () => setActiveRoute("sub-menu__catgirl"),
        id: "sub-menu__catgirl",
        sideElement: <FemaleIcon />,
        active: activeRoute === "sub-menu__catgirl",
      },
      {
        name: "Catboy",
        onClick: () => setActiveRoute("sub-menu__catboy"),
        id: "sub-menu__catboy",
        sideElement: <MaleIcon />,
        active: activeRoute === "sub-menu__catboy",
      },
      {
        name: "Какая в жопу разница",
        onClick: () => setActiveRoute("sub-menu__catxxx"),
        id: "sub-menu__catxxx",
        sideElement: <TransgenderIcon />,
        active: activeRoute === "sub-menu__catxxx",
      },
    ],
    [activeRoute],
  );

  return <Template routes={options} />;
};
