import React, { useState, forwardRef } from "react";
import { ZigInputAmountProps } from "./types";
import { InputAdornment, TextField, Box } from "@mui/material";
import ZigButton from "../ZigButton";
import { ErrorMessage } from "../../display/ZigAlertMessage";
import ZigInput from "../ZigInput";
import { Layout } from "./styles";
import ZigTypography from "components/display/ZigTypography";
import { InputExtraInfo } from "./atoms";
import ZigCoinIcon from "../../display/ZigCoinIcon";
export { InputExtraInfo } from "./atoms";

const ZigInputAmount = forwardRef((props: ZigInputAmountProps, ref) => {
  // How to add fees but keep default label, maybe even pick order
  // How can I pass all these values, and optionally override label?
  const {
    label,
    error,
    wide,
    sensitive,
    coin,
    id,
    extraInfo,
    // extraInfo = [
    //   { value: 1000, text: "Available" },
    //   { value: 100, text: "Min. deposit" },
    // ],
    // extraInfo = [
    //   <ZigTypography key={0}>Available: 1,000 USDT</ZigTypography>,
    //   <ZigTypography key={1}>Min. deposit: 100 USDT</ZigTypography>,
    // ],
  } = props;
  const coinVal = typeof coin === "object" ? coin.coin : coin ?? "";

  return (
    <Layout>
      <ZigTypography>{label}</ZigTypography>
      <Box display="flex" alignItems="center" gap={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <ZigCoinIcon size="small" coin={coinVal} />
          <ZigTypography color="neutral100" variant="h3">
            {coinVal}
          </ZigTypography>
        </Box>
        <ZigInput {...props} label={null} />
      </Box>
      {typeof extraInfo === "function" ? (
        extraInfo
      ) : extraInfo ? (
        <InputExtraInfo coin={coinVal} {...extraInfo} />
      ) : null}
      {/* {Number() >= 0 && showBalance && (
        <Box mt={1}>
          <BalanceLabel variant="body2" color="neutral200" id={id && `${id}-balance-label`}>
            {labelBalance}
          </BalanceLabel>
          <ZigPriceLabel
            id={id && `${id}-balance`}
            value={value?.token.balance}
            variant="body2"
            component="span"
            color="neutral000"
            precision={8}
            coin={value?.token.id}
            coinProps={{
              color: "neutral000",
              fontWeight: 500,
            }}
          />
        </Box>
      )} */}
    </Layout>
  );

  return (
    <TextField
      id={id}
      inputRef={ref}
      {...props}
      inputProps={{
        ...(props.inputProps || {}),
        "data-testid":
          props?.inputProps?.["data-testid"] ||
          (process.env.NODE_ENV === "test" && id) ||
          undefined,
      }}
      label={
        !props.label ? null : (
          <>
            {props.label}
            {labelAction && (
              <ZigButton
                variant={"text"}
                sx={{ fontSize: "13px", fontWeight: 400 }}
                tabIndex={labelAction.tabIndex}
                onClick={labelAction.onClick}
                href={labelAction.href}
                id={labelAction.id}
              >
                {labelAction.text}
              </ZigButton>
            )}
          </>
        )
      }
      variant={"standard"}
      error={!!error}
      helperText={
        typeof error === "string" && error !== ""
          ? error && <ErrorMessage text={error} />
          : helperText
      }
      type={sensitive ? (!isShown ? "password" : "text") : props.type}
      InputProps={{
        disableUnderline: true,
        ...(props.InputProps || {}),
        ...(sensitive
          ? {
              endAdornment: [
                <InputAdornment position="end" key={id + "-sensivive"}>
                  {!!sensitive && (
                    <EyeIcon
                      id={id && `${id}-visibility-icon`}
                      onClick={() => setIsShown((v) => !v)}
                      width={40}
                      height={40}
                      sx={ZigInputInteractiveAdornmentStyle}
                    />
                  )}
                </InputAdornment>,
                ...valueToArray(props?.InputProps?.endAdornment),
              ],
            }
          : {}),
      }}
      InputLabelProps={{ shrink: true, ...(props.InputLabelProps || {}) }}
    />
  );
});

export default ZigInputAmount;
