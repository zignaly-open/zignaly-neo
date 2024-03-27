import React, { useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import EditIcon from "@mui/icons-material/Edit";

import ZigButton from "../../inputs/ZigButton";
import { Box } from "@mui/system";
import ZigDropdown, { ZigDropdownHandleType } from "./index";

const DropdownStorybookCrutch: React.FC = () => {
  const ref = useRef<ZigDropdownHandleType>(null);
  return (
    <ZigDropdown
      ref={ref}
      component={(open) => (
        <ZigButton narrow variant={"outlined"} active={!!open}>
          <EditIcon />
        </ZigButton>
      )}
      options={[
        {
          element: (
            <Box sx={{ background: "#f00" }}>It is shifted becasue of storybook shenannigans</Box>
          ),
        },
        {
          label: "Important link 1",
          id: "dropwown-one",
          target: "_blank",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        {
          label: "Important link 2",
          id: "dropwown-one",
          target: "_blank",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        { separator: true },
        {
          label: "Important link 3 with separator",
          id: "dropwown-one",
          target: "_blank",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        {
          label: "Alert",
          id: "dropwown-one",
          target: "_blank",
          onClick: () => alert(),
        },
        {
          label: "Close from inside",
          id: "dropwown-one",
          target: "_blank",
          onClick: () => ref.current?.closeDropDown?.(),
        },
        {
          element: <Box sx={{ background: "#f00" }}>Element</Box>,
        },
      ]}
    />
  );
};

export default {
  title: "Display/ZigDropdown",
  component: DropdownStorybookCrutch,
  argTypes: {
    component: {
      description: "(open: boolean) => JSX.Element",
    },
    options: {
      description: "ZigDropdownOption[]",
    },
  },
} as ComponentMeta<typeof DropdownStorybookCrutch>;

const Template: ComponentStory<typeof DropdownStorybookCrutch> = (args) => {
  return <DropdownStorybookCrutch {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {};
