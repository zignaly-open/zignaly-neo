import React, { useState } from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ZigSelect from "./index";
import "@mui/system";

const result: ComponentMeta<typeof ZigSelect> = {
  title: "Inputs/ZigSelect",
  component: ZigSelect,
  argTypes: {
    label: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    defaultValue: {
      type: "string",
    },
    error: {
      type: "string",
      defaultValue: "",
    },
  },
};

export default result;

const options = [
  { label: "Regular cat", value: 1 },
  { label: "Regular dog", value: -1 },
  {
    label: (
      <>
        <img
          height={30}
          width={30}
          src={
            "https://cdna.artstation.com/p/assets/images/images/014/532/698/20181209121125/smaller_square/catgirl-enthusiast-girl-4.jpg?1544379086"
          }
        />{" "}
        Catgirl
      </>
    ),
    value: 2,
  },
];

const Template: ComponentStory<typeof ZigSelect> = (args) => {
  const [value, setValue] = useState<number>();

  return (
    <>
      Value: {JSON.stringify(value)}
      {value === 2 ? " Meow" : ""}
      <br />
      <ZigSelect
        disabled={args.disabled}
        placeholder={args.placeholder}
        error={args.error}
        label={args.label}
        value={value}
        onChange={(v) => setValue(v!)}
        options={options}
      />
    </>
  );
};

export const BasicSelect: ComponentMeta<typeof ZigSelect> = Template.bind({});
BasicSelect.args = {
  label: "Choose pet",
  placeholder: "Choose pet",
};
