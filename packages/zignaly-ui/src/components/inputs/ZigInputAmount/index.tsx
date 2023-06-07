import React, { forwardRef } from "react";
import { InputExtraInfoObject, ZigInputAmountProps } from "./types";
import { InputAdornment, Box } from "@mui/material";
import { ErrorMessage } from "../../display/ZigAlertMessage";
import ZigInput from "../ZigInput";
import { Layout, MaxButton, TopDivider } from "./styles";
import ZigTypography from "components/display/ZigTypography";
import { InputExtraInfo } from "./atoms";
import ZigCoinIcon from "../../display/ZigCoinIcon";
import { changeEvent } from "utils/event";
import BigNumber from "bignumber.js";
export { InputExtraInfo } from "./atoms";

const ZigInputAmount = forwardRef((props: ZigInputAmountProps, ref) => {
  const {
    label,
    error,
    wide,
    coin,
    extraInfo,
    onMax,
    placeholder = "0.0",
    wrapExtraInfo,
    balance,
    min,
    max,
    id,
    children,
    className = "",
    ...rest
  } = props;
  const coinVal = typeof coin === "object" ? coin.coin : coin ?? "";

  /**
   * Call custom onMax function or call onChange with max value event for RHF
   */
  const handleMax = () => {
    if (onMax) return onMax();
    if (props.onChange && balance !== "undefined") {
      props.onChange(
        changeEvent(
          props.name,
          max !== "undefined" && new BigNumber(max!).isLessThan(new BigNumber(balance!))
            ? max
            : balance,
        ) as React.ChangeEvent<HTMLInputElement>,
      );
    }
  };

  /**
   * Format the input value to keep only decimals.
   * We can't use type=number because it allows commas, which we replace by dots here.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove all non-numeric characters except the comma and dot
    value = value.replace(/[^0-9,\.]/g, "");

    // if the value ends with a comma, replace it with a dot
    if (value.endsWith(",")) {
      value = value.slice(0, -1) + ".";
    } else {
      // otherwise, remove all commas
      value = value.replace(/,/g, "");
    }

    // eslint-disable-next-line no-param-reassign
    e.target.value = value;
    props.onChange?.(e);
  };

  return (
    <Box display="flex" flexDirection="column" className={className}>
      <Layout display={wide ? "flex" : "inline-flex"} error={!!error}>
        <TopDivider error={!!error}>
          <ZigTypography color="neutral300" variant="body2">
            {label}
          </ZigTypography>
        </TopDivider>
        <Box display="flex" alignItems="center" gap={2} width={wide ? 1 : "auto"}>
          <Box display="flex" alignItems="center" gap={1}>
            <ZigCoinIcon size="small" coin={coinVal} />
            <ZigTypography color="neutral100" variant="h3">
              {coinVal}
            </ZigTypography>
          </Box>
          <ZigInput
            {...rest}
            id={id}
            inputRef={ref}
            type="string"
            wide={wide}
            label={null}
            sx={{ width: wide ? 1 : "auto" }}
            error={!!error}
            placeholder={placeholder}
            InputProps={{
              endAdornment:
                balance || handleMax ? (
                  <InputAdornment position="end">
                    <MaxButton variant="outlined" onClick={handleMax}>
                      Max
                    </MaxButton>
                  </InputAdornment>
                ) : null,
            }}
            onChange={handleChange}
          />
        </Box>
        <Box mt="16px" width={1}>
          <>
            {React.isValidElement(extraInfo) ? (
              extraInfo
            ) : extraInfo !== null ? (
              <InputExtraInfo
                coin={coinVal}
                min={min}
                max={max}
                balance={balance}
                extraInfo={extraInfo as InputExtraInfoObject}
              />
            ) : null}
            {children && (
              <Box display="flex" justifyContent="center" mt={3} mb={1}>
                {children}
              </Box>
            )}
          </>
        </Box>
      </Layout>
      {error && typeof error === "string" && (
        <Box alignSelf="flex-start" mt="11px">
          <ErrorMessage text={error} id={id && `${id}-error`} />
        </Box>
      )}
    </Box>
  );
});

export default ZigInputAmount;
