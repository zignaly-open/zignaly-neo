import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZigTabs from "./";
import ZigTab from "./components/Tab";
import ZigTabPanel from "./components/TabPanel";

type PropsAndCustomArgs = React.ComponentProps<typeof ZigTabs> & {
  tabs: string[];
  content: string[];
};

const Template = (props: PropsAndCustomArgs) => {
  const [value, setValue] = useState(0);
  return (
    <>
      <ZigTabs
        {...props}
        onChange={(_: React.SyntheticEvent, newValue: any) => {
          setValue(newValue);
        }}
        value={value}
      >
        {props.tabs.map((t: string) => (
          <ZigTab label={t} key={t} />
        ))}
      </ZigTabs>
      {props.content.map((c: string, i: number) => (
        <ZigTabPanel value={value} index={i} key={c}>
          {props.content[i]}
        </ZigTabPanel>
      ))}
    </>
  );
};

const meta: Meta<PropsAndCustomArgs> = {
  title: "Navigation/ZigTabs",
  component: ZigTabs,
  argTypes: {
    tabs: {
      table: {
        disable: true,
      },
    },
    content: {
      table: {
        disable: true,
      },
    },
  },
  render: (props) => <Template {...props} />,
};
export default meta;

type Story = StoryObj<PropsAndCustomArgs>;

export const TabsExample: Story = {
  args: {
    tabs: ["Tab 1", "Tab 2", "Tab with long title 3", "Another Tab 4"],
    content: ["Content 1", "Content 2", "Content 3", "Content 4"],
  },
};
