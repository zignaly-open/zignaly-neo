import { Box, Divider } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import React from "react";
import { InputExtraInfoFalseableItem, InputExtraInfoItem, InputExtraInfoProps } from "./types";
import { NumericFormat } from "react-number-format";
import BigNumber from "bignumber.js";

const DEFAULT_ITEMS = {
  balance: "Available:",
  min: "Min:",
};

// const DEFAULT_ITEMS = [{}];

const extractItem = (item: InputExtraInfoFalseableItem, key?: keyof typeof DEFAULT_ITEMS) => {
  if (!item) return null;

  if (typeof item === "object") {
    return {
      value: item.value,
      label: item.label ?? (key ? DEFAULT_ITEMS[key] : ""),
    };
  } else {
    return { value: item, label: key ? DEFAULT_ITEMS[key] : "" };
  }
};

export const InputExtraInfo = ({
  balance,
  min,
  others,
  coin,
}: InputExtraInfoProps & {
  coin: string;
}) => {
  let items = [
    extractItem(balance ?? false, "balance"),
    extractItem(min ?? false, "min"),
    // { value: balance, text: DEFAULT_ITEMS.balance },
    // { value: min, text: LABELS.min },
    // { value: balance, text },
  ] as (InputExtraInfoItem | JSX.Element | null)[];

  // let items = [];
  if (others) {
    items = items.concat(
      others.map((item) =>
        React.isValidElement(item) ? item : extractItem(item as InputExtraInfoFalseableItem),
      ),
    );
  }
  console.log(items);

  // return (
  //   <Divider orientation="vertical" sx={{ backgroundColor: "red" }} variant="middle">
  //     <div>
  //       <ZigTypography variant="body2">
  //         {/* {LABELS.balance} */}
  //         {item.label}
  //         &nbsp;
  //         <ZigTypography variant="body2" color="neutral100">
  //           <NumericFormat
  //             value={item.value}
  //             displayType="text"
  //             thousandSeparator={true}
  //             suffix={` ${coin}`}
  //           />
  //         </ZigTypography>
  //       </ZigTypography>
  //     </div>
  //   </Divider>
  // );

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection={items.length <= 2 ? "row" : "column"}
      gap="6px"
    >
      {items.filter(Boolean).map((item, i) => (
        <React.Fragment key={i}>
          {React.isValidElement(item) ? (
            item
          ) : (
            <ZigTypography variant="body2">
              {/* {LABELS.balance} */}
              {(item as InputExtraInfoItem).label}
              &nbsp;
              <ZigTypography variant="body2" color="neutral100">
                <NumericFormat
                  value={(item as InputExtraInfoItem).value}
                  displayType="text"
                  thousandSeparator={true}
                  suffix={` ${coin}`}
                />
              </ZigTypography>
            </ZigTypography>
          )}
          {i === 0 && items.length === 2 && (
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#35334a", m: "1px 22px" }}
              flexItem
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};
