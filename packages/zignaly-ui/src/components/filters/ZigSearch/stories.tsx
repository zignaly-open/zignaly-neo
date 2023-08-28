import React, { useState } from "react";
import "@mui/system";
import { Meta, StoryObj } from "@storybook/react";
import ZigSearch from "./index";
import "@mui/system";
import ZigTypography from "components/display/ZigTypography";
import { ZigInputAmountProps } from "./types";
import { Box } from "@mui/material";

const meta = {
  title: "Filters/ZigSearch",
  component: ZigSearch,
} as Meta;
export default meta;

// const ZigInputAmountWithState = (props: ZigInputAmountProps) => {
//   const [value, setValue] = useState(props.value);

//   return (
//     <ZigInputAmount
//       {...props}
//       onMax={props.balance ? () => setValue(props.balance) : undefined}
//       value={value}
//     />
//   );
// };

const ZigSearchWrapper = (props: ZigInputAmountProps) => {
  return (
    <Box display="flex" justifyContent={"flex-end"} mr={5}>
      <ZigSearch {...props} />
    </Box>
  );
};

type Story = StoryObj<typeof meta>;

// export const WithLabel: Story = {
//   args: {
//     label: "A label",
//     coin: "USDT",
//     balance: 1000,
//     min: 100,
//     extraInfo: {
//       min: "Min. deposit:",
//     },
//   },
//   render: (props) => <ZigInputAmountWithState {...props} />,
// };

export const Default: Story = {
  args: {},
  render: (props) => <ZigSearchWrapper {...props} />,
};

// export const WithCustomExtraInfo: Story = {
//   args: {
//     label: "A label",
//     balance: 1000,
//     coin: "USDT",
//     min: 100,
//     extraInfo: {
//       min: "Min. deposit:",
//       others: [
//         {
//           label: "Custom label:",
//           value: 200,
//         },
//         <ZigTypography variant="body2" color="neutral100" key="1">
//           Custom element
//         </ZigTypography>,
//       ],
//     },
//   },
//   render: (props) => <ZigInputAmountWithState {...props} />,
// };

// export const WithNestedComponent: Story = {
//   args: {
//     label: "A label",
//     balance: 1000,
//     coin: "USDT",
//     min: 100,
//     children: <ZigTypography variant="body2">Custom nested element</ZigTypography>,
//   },
//   render: (props) => <ZigInputAmountWithState {...props} />,
// };
