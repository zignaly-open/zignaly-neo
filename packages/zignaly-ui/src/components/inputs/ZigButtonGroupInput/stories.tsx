import React, { useMemo, useState } from "react";
import { Meta, Story } from "@storybook/react";
import ZigButtonGroupInput from "./index";

export default {
  title: "Inputs/ZigButtonGroupInput",
  component: ZigButtonGroupInput,
  argTypes: {},
} as Meta<typeof ZigButtonGroupInput>;

const Template: Story = () => {
  const [value, setValue] = useState("1");
  const options = useMemo(
    () => [
      { label: "Value #1", value: "1" },
      { label: "Value #2", value: "2" },
      { label: "Value #3", value: "3", extraProps: { tooltip: "Invalid value" } },
    ],
    [],
  );
  return (
    <>
      <ZigButtonGroupInput
        onChange={(v) => {
          setValue(v);
        }}
        value={value}
        label={"Select somehting"}
        error={+value === 3 ? "Can not be 3" : undefined}
        options={options}
      />
    </>
  );
};

export const Default = Template.bind({});
