import React, { useState } from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ZigAutocomplete from "./index";
import "@mui/system";
import Box from "@mui/material/Box";

const result: ComponentMeta<typeof ZigAutocomplete> = {
  title: "Inputs/ZigAutocomplete",
  component: ZigAutocomplete,
  argTypes: {
    label: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    wide: {
      type: "boolean",
      defaultValue: false,
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

type EntryType = { label: string; value: number; image?: string };
const options: EntryType[] = [
  { label: "Regular cat", value: 1 },
  { label: "Regular dog", value: -1 },
  {
    image:
      "https://cdna.artstation.com/p/assets/images/images/014/532/698/20181209121125/smaller_square/catgirl-enthusiast-girl-4.jpg?1544379086",
    label: "Catgirl",
    value: 2,
  },
];

const Template: ComponentStory<typeof ZigAutocomplete> = (args) => {
  const [value, setValue] = useState<EntryType>();

  return (
    <>
      Value: {JSON.stringify(value?.value)}
      {value?.value === 2 ? " Meow" : ""}
      <br />
      <ZigAutocomplete
        renderOption={(props, entry) => {
          return (
            <Box component="li" {...props}>
              {entry.image && <img src={entry.image} height={24} width={24} />}
              {entry.label}
            </Box>
          );
        }}
        placeholder={args.placeholder}
        error={args.error}
        label={args.label}
        onChange={(event, v) => setValue(v)}
        options={options as EntryType[]}
      />
    </>
  );
};

export const BasicAutocomplete: ComponentMeta<typeof ZigAutocomplete> = Template.bind({});
BasicAutocomplete.args = {
  label: "Choose pet",
  placeholder: "Choose pet",
};
