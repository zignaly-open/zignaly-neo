import React, { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZigDropdown, { ZigDropdownHandleType } from "./index";
import { Box } from "@mui/material";
import ZigButton from "../../inputs/ZigButton";
import EditIcon from "@mui/icons-material/Edit";

// type ZigDropdownProps = Partial<React.ComponentProps<typeof ZigDropdown>>;
type ZigDropdownProps = React.ComponentProps<typeof ZigDropdown>;
const ZigDropdownWrapper = (props: ZigDropdownProps) => {
  console.log(props);
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
      {...props}
    />
  );
};

// type Story = StoryObj<ZigDropdownProps>;
const meta = {
  title: "Display/ZigDropdown",
  component: ZigDropdown,
  render: (props) => <ZigDropdownWrapper {...props} />,
  argTypes: {
    component: {
      description: "(open: boolean) => JSX.Element",
    },
    options: {
      description: "ZigDropdownOption[]",
    },
    placement: {
      control: "select",
      options: [
        ...["top", "bottom", "right", "left", "start", "end", "auto"],
        ...[
          "top-start",
          "top-end",
          "bottom-start",
          "bottom-end",
          "right-start",
          "right-end",
          "left-start",
          "left-end",
        ],
        ...["auto", "auto-start", "auto-end"],
      ],
      description: "Menu popper placement",
    },
    matchAnchorWidth: {
      control: "boolean",
      description: "Match anchor width",
    },
  },
  args: {
    placement: "bottom-start",
  },
} as Meta<ZigDropdownProps>;
export default meta;
// type ZigDropdownProps = React.ComponentProps<typeof ZigDropdown>;
type Story = StoryObj<ZigDropdownProps>;

export const Default: Story = {};

// export const Default: Story;

// const DropdownStorybookCrutch: React.FC = () => {
//   const ref = useRef<ZigDropdownHandleType>(null);
//   return (

//   );
// };

// export default {
//   title: "Display/ZigDropdown",
//   component: DropdownStorybookCrutch,
//   argTypes: {
//     component: {
//       description: "(open: boolean) => JSX.Element",
//     },
//     options: {
//       description: "ZigDropdownOption[]",
//     },
//   },
// } as ComponentMeta<typeof DropdownStorybookCrutch>;

// const Template: ComponentStory<typeof DropdownStorybookCrutch> = (args) => {
//   return <DropdownStorybookCrutch {...args} />;
// };

// export const Basic = Template.bind({});
// Basic.args = {};
