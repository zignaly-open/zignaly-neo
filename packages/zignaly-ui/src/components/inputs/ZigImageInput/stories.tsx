import React, { useState } from "react";
import "@mui/system";
import { ComponentMeta, StoryObj } from "@storybook/react";
import ZigImageInput, { ZigImageInputProps } from "./index";
import "@mui/system";
import meta from "../ZigInputAmount/stories";

const result: ComponentMeta<typeof ZigImageInput> = {
  title: "Inputs/ZigImageInput",
  component: ZigImageInput,
  argTypes: {
    label: {
      type: "string",
    },
    description: {
      type: "string",
    },
    size: {
      type: "number",
      defaultValue: 32,
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    value: {
      type: "string",
    },
  },
};

export default result;

const ZigImageInputStory = (props: Omit<ZigImageInputProps, "value" | "onChange" | "uploadFn">) => {
  const [value, setValue] = useState(
    "https://upload.wikimedia.org/wikipedia/ru/thumb/c/c6/Vento_Aureo.jpg/500px-Vento_Aureo.jpg",
  );

  return (
    <ZigImageInput
      {...props}
      uploadFn={async (file) => URL.createObjectURL(file)}
      value={value}
      onChange={setValue}
    />
  );
};

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: "A label",
    description: "Description lorem ipsum lorem ipsum",
    buttonLabel: "Change image",
    buttonTooltip: "Change image tooltip",
    info: "Additional info",
    error: "Image too cool to be saved",
    size: 300,
  },
  render: (props) => <ZigImageInputStory {...props} />,
};
