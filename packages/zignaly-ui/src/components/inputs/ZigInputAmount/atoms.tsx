import { Box, Divider } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import React, { useMemo } from "react";
import { InputExtraInfoFalseableItem, InputExtraInfoItem, InputExtraInfoProps } from "./types";
import ZigPriceLabel from "components/display/ZigPriceLabel";
import { useTranslation } from "react-i18next";

const extractItem = (
  item?: InputExtraInfoFalseableItem,
  defaultValue?: string | number,
  defaultLabel?: string,
) => {
  if (item === false) return null;
  if (React.isValidElement(item)) return item;

  if (typeof item === "object") {
    return {
      value: (item as InputExtraInfoItem).value ?? defaultValue,
      label: (item as InputExtraInfoItem).label ?? defaultLabel ?? "",
    };
  } else {
    if (!defaultValue) return null;
    return { value: defaultValue, label: item ?? defaultLabel ?? "" };
  }
};

export const InputExtraInfo = (
  props: InputExtraInfoProps & {
    coin: string;
    id?: string;
  },
) => {
  const { balance, min, max, coin, extraInfo = {} } = props;
  const { wrapExtraInfo = 2 } = extraInfo;
  const { t } = useTranslation("zignaly-ui", { keyPrefix: "ZigInputAmount" });

  const DEFAULT_ITEMS = useMemo(
    () => ({
      balance: t("info.available"),
      min: t("info.min"),
      max: t("info.max"),
    }),
    [t],
  );

  const items = useMemo(() => {
    // Default items
    let itemsList = Object.keys(DEFAULT_ITEMS).map((key) => {
      const validKey = key as keyof typeof DEFAULT_ITEMS;
      const infoItem = extraInfo[validKey];

      return extractItem(
        infoItem,
        props[key as keyof InputExtraInfoProps] as string | number,
        DEFAULT_ITEMS[validKey],
      );
    }) as (InputExtraInfoItem | JSX.Element | null)[];

    // Custom items
    if (extraInfo.others) {
      itemsList = itemsList.concat(extraInfo.others.map((item) => extractItem(item)));
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
      gap={"5px"}
      alignItems={displayInRow ? "center" : "flex-start"}
      justifyContent={displayInRow ? "center" : "flex-start"}
      id={props.id}
    >
      {items.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={i}>
          {React.isValidElement(item) ? (
            item
          ) : (
            <ZigTypography
              variant="body2"
              id={
                props.id &&
                `${props.id}-${(item as InputExtraInfoItem).label
                  .toLowerCase()
                  .replace(/[\s.:,%]/g, "")}`
              }
            >
              {(item as InputExtraInfoItem).label}
              &nbsp;
              <ZigPriceLabel
                id={props.id && `${props.id}-value-${(item as InputExtraInfoItem).label}`}
                value={(item as InputExtraInfoItem).value}
                coin={coin}
                coinProps={{ color: "neutral100" }}
                color="neutral100"
                variant="body2"
                fontWeight="regular"
                {...extraInfo.amountProps}
              />
            </ZigTypography>
          )}
          {displayInRow && i < items.length - 1 && (
            <Divider
              id={props.id && `${props.id}-divider`}
              orientation="vertical"
              sx={{ borderColor: "neutral600", m: "1px 7px" }}
              flexItem
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};
