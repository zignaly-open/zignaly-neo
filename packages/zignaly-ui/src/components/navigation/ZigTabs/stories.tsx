import React, { useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import Tabs from "./";
import Tab from "./components/Tab";
import TabPanel from "./components/TabPanel";

export default {
  title: "Navigation/ZigTabs",
  component: Tabs,
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
} as ComponentMeta<typeof Tabs>;

type IProps = {
  tabs: string[];
  content: string[];
};

const Template: Story<typeof Tabs & IProps> = (args) => {
  const [value, setValue] = useState(0);
  return (
    <>
      <Tabs
        {...args}
        onChange={(_: React.SyntheticEvent, newValue: any) => {
          setValue(newValue);
        }}
        value={value}
      >
        {args.tabs.map((t: string) => (
          <Tab label={t} key={t} />
        ))}
      </Tabs>
      {args.content.map((c: string, i: number) => (
        <TabPanel value={value} index={i} key={c}>
          {args.content[i]}
        </TabPanel>
      ))}
    </>
  );
};

export const TabsExample = Template.bind({});
TabsExample.args = {
  tabs: ["Tab 1", "Tab 2", "Tab with long title 3", "Another Tab 4"],
  content: ["Content 1", "Content 2", "Content 3"],
};
