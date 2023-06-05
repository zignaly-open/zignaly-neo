import React, { forwardRef } from "react";
import { ZigInputAmountProps } from "./types";
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
  } = props;
  const coinVal = typeof coin === "object" ? coin.coin : coin ?? "";

  /**
   * @description Call custom onMax function or call onChange with max value event for RHF
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

  return (
    <Layout display={wide ? "flex" : "inline-flex"}>
      <TopDivider>
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
          {...props}
          id={id}
          inputRef={ref}
          type="number"
          wide={wide}
          label={null}
          sx={{ width: wide ? 1 : "auto" }}
          error={!!error}
          placeholder={placeholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MaxButton variant="outlined" onClick={handleMax}>
                  Max
                </MaxButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box alignSelf="flex-start" mt="11px">
        {error && typeof error === "string" && (
          <ErrorMessage text={error} id={id && `${id}-error`} />
        )}
      </Box>
      <Box mt={extraInfo && error && typeof error === "string" ? "7px" : "14px"} width={1}>
        <>
          {typeof extraInfo === "function" ? (
            extraInfo
          ) : extraInfo ? (
            <InputExtraInfo
              coin={coinVal}
              wrapExtraInfo={wrapExtraInfo}
              balance={balance}
              min={min}
              max={max}
              {...extraInfo}
            />
          ) : null}
          <Box display="flex" justifyContent="center" mt={3} mb={1}>
            {children}
          </Box>
        </>
      </Box>
    </Layout>
  );
});

export default ZigInputAmount;
