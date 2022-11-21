import React, { ReactNode } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

export default {
  title: "Display/ZigTypography",
  component: Typography,
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Hello",
    },
    text: {
      control: "text",
      defaultValue: "Hello",
    },
  },
  parameters: {
    jest: ["typography"],
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<React.FC<{ title: string; text: string; children: ReactNode }>> = ({
  title,
  text,
}) => {
  const titles: Variant[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
  return (
    <>
      {titles.map((t) => (
        <Typography key={t} variant={t}>
          {t} {title}
        </Typography>
      ))}

      <Typography component={"p"} variant={"subtitle1"}>
        Subtitle 1 {text}
      </Typography>

      <Typography component={"p"} variant={"subtitle2"}>
        Subtitle 2 {text}
      </Typography>

      <Typography component={"p"} variant={"caption"}>
        Caption {text}
      </Typography>

      <Typography component={"p"} variant={"body1"}>
        Body 1 {text}
      </Typography>

      <Typography component={"p"} variant={"body2"}>
        Body 2 {text}
      </Typography>
    </>
  );
};

export const Text = Template.bind({});
Text.args = {
  title: "Example Title",
  text: "To be or not to be this is the question whether it's nobler in the mind",
};
