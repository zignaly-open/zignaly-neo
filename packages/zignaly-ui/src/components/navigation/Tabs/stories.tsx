import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Tabs from "./";
import Tab from "./components/Tab";
import TabPanel from "./components/TabPanel";

export default {
  title: "Navigation/Tabs",
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

const Template: ComponentStory<typeof Tabs> = (args) => {
  const [value, setValue] = useState(args.value || 0);
  return (
    <>
      <Tabs
        {...args}
        onChange={(_: React.SyntheticEvent, newValue: any) => {
          setValue(newValue);
        }}
        value={value}
      >
        {args.tabs.map((t: string, i: number) => (
          <Tab label={t} key={i} />
        ))}
      </Tabs>
      {args.content.map((c: string, i: number) => (
        <TabPanel value={args.value} index={i} key={i}>
          {c}
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
