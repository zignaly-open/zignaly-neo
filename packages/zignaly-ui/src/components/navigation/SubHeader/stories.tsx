import React, { useMemo, useState } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import SubHeader from "./";
import { Meta, StoryObj } from "@storybook/react";

const SubHeaderWrapper = () => {
  const [activeRoute, setActiveRoute] = useState("sub-menu__user");
  const options = useMemo(
    () => [
      {
        label: "User",
        onClick: () => setActiveRoute("sub-menu__user"),
        id: "sub-menu__user",
        active: activeRoute === "sub-menu__user",
      },
      {
        label: "Robot",
        routes: [
          {
            label: "Robot A",
            onClick: () => setActiveRoute("sub-menu__robot-1"),
            id: "sub-menu__robot-1",
            active: activeRoute === "sub-menu__robot-1",
          },
          {
            label: "Robot B",
            onClick: () => setActiveRoute("sub-menu__robot-2"),
            id: "sub-menu__robot-2",
            active: activeRoute === "sub-menu__robot-2",
          },
        ],
        id: "sub-menu__robot",
      },
      {
        label: "Catgirl",
        onClick: () => setActiveRoute("sub-menu__catgirl"),
        id: "sub-menu__catgirl",
        sideElement: <FemaleIcon />,
        active: activeRoute === "sub-menu__catgirl",
      },
      {
        label: "Catboy",
        onClick: () => setActiveRoute("sub-menu__catboy"),
        id: "sub-menu__catboy",
        sideElement: <MaleIcon />,
        active: activeRoute === "sub-menu__catboy",
      },
      {
        label: "Какая в жопу разница",
        onClick: () => setActiveRoute("sub-menu__catxxx"),
        id: "sub-menu__catxxx",
        sideElement: <TransgenderIcon />,
        active: activeRoute === "sub-menu__catxxx",
      },
    ],
    [activeRoute],
  );

  return <SubHeader routes={options} />;
};

const meta = {
  title: "Navigation/SubHeader",
  component: SubHeader,
  render: (props) => <SubHeaderWrapper {...props} />,
} as Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
