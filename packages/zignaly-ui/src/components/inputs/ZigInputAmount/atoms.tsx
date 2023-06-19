import { Box, Divider } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import React, { useMemo } from "react";
import { InputExtraInfoFalseableItem, InputExtraInfoItem, InputExtraInfoProps } from "./types";
import ZigPriceLabel from "components/display/ZigPriceLabel";

const DEFAULT_ITEMS = {
  balance: "Available:",
  min: "Min:",
  max: "Max:",
};

const extractItem = (
  item?: InputExtraInfoFalseableItem,
  defaultValue?: string | number,
  defaultLabel?: string,
) => {
  if (item === false) return null;

  if (typeof item === "object") {
    return {
      value: item.value ?? defaultValue,
      label: item.label ?? defaultLabel ?? "",
    };
  } else {
    if (!defaultValue) return null;
    return { value: defaultValue, label: item ?? defaultLabel ?? "" };
  }
};

export const InputExtraInfo = (
  props: InputExtraInfoProps & {
    coin: string;
  },
) => {
  const { balance, min, max, coin, extraInfo = {} } = props;
  const { wrapExtraInfo = 2 } = extraInfo;

  const items = useMemo(() => {
    // Default items
    let itemsList = Object.keys(DEFAULT_ITEMS).map((key) => {
      const validKey = key as keyof typeof DEFAULT_ITEMS;
      const infoItem = extraInfo[validKey];
      if (infoItem === false) return null;

      return extractItem(
        infoItem,
        props[key as keyof InputExtraInfoProps] as string | number,
        DEFAULT_ITEMS[validKey],
      );
    }) as (InputExtraInfoItem | JSX.Element | null)[];

    // Custom items
    if (extraInfo.others) {
      itemsList = itemsList.concat(
        extraInfo.others.map((item) =>
          React.isValidElement(item) ? item : extractItem(item as InputExtraInfoFalseableItem),
        ),
      );
    }
    return itemsList.filter(Boolean);
  }, [balance, min, max, coin, extraInfo]);

  const displayInRow =
    typeof wrapExtraInfo === "number" ? items?.length <= wrapExtraInfo : !wrapExtraInfo;

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
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={i}>
          {React.isValidElement(item) ? (
            item
          ) : (
            <ZigTypography variant="body2">
              {(item as InputExtraInfoItem).label}
              &nbsp;
              <ZigPriceLabel
                value={(item as InputExtraInfoItem).value}
                coin={coin}
                coinProps={{ color: "neutral100" }}
                color="neutral100"
                variant="body2"
                fontWeight="regular"
              />
            </ZigTypography>
          )}
          {displayInRow && i < items.length - 1 && (
            <Divider
              orientation="vertical"
              sx={{ borderColor: "neutral600", m: "1px 12px" }}
              flexItem
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};
