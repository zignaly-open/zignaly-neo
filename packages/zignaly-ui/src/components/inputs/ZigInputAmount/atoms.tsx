import { Box, Divider } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import React from "react";
import { InputExtraInfoFalseableItem, InputExtraInfoItem, InputExtraInfoProps } from "./types";
import { NumericFormat } from "react-number-format";
import { getPrecisionForCoin } from "components/display/ZigPriceLabel/util";

const DEFAULT_ITEMS = {
  balance: "Available:",
  min: "Min:",
  max: "Max:",
};

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
  max,
  others,
  coin,
  wrapExtraInfo = 2,
}: InputExtraInfoProps & {
  coin: string;
}) => {
  // Default items
  let items = [
    extractItem(balance ?? false, "balance"),
    extractItem(min ?? false, "min"),
    extractItem(max ?? false, "max"),
  ] as (InputExtraInfoItem | JSX.Element | null)[];

  if (others) {
    items = items.concat(
      others.map((item) =>
        React.isValidElement(item) ? item : extractItem(item as InputExtraInfoFalseableItem),
      ),
    );
  }
  items = items.filter(Boolean);

  const displayInRow =
    typeof wrapExtraInfo === "number" ? items.length <= wrapExtraInfo : !wrapExtraInfo;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection={displayInRow ? "row" : "column"}
      gap="6px"
      alignItems={displayInRow ? "center" : "flex-start"}
      justifyContent={displayInRow ? "center" : "flex-start"}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {React.isValidElement(item) ? (
            item
          ) : (
            <ZigTypography variant="body2">
              {(item as InputExtraInfoItem).label}
              &nbsp;
              <ZigTypography variant="body2" color="neutral100">
                <NumericFormat
                  value={(item as InputExtraInfoItem).value}
                  displayType="text"
                  thousandSeparator={true}
                  suffix={` ${coin}`}
                  decimalScale={getPrecisionForCoin(coin, (item as InputExtraInfoItem).value)}
                />
              </ZigTypography>
            </ZigTypography>
          )}
          {displayInRow && i < items.length - 1 && (
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#35334a", m: "1px 12px" }}
              flexItem
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};
