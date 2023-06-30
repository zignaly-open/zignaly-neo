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
import { trimZeros } from "utils/numbers";
import ZigSelect from "../ZigSelect";
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
    labelInline = true,
    withCoinSelector = false,
    tokenOptions,
    onTokenChange,
    ...rest
  } = props;
  const coinVal = typeof coin === "object" ? coin.coin : coin ?? "";

  const handleMax = () => {
    if (props.onChange && (balance !== undefined || max !== undefined)) {
      const newValue =
        max !== undefined &&
        (balance === undefined || new BigNumber(max!).isLessThan(new BigNumber(balance!)))
          ? max
          : balance;
      props.onChange(
        changeEvent(props.name, trimZeros(newValue!)) as React.ChangeEvent<HTMLInputElement>,
      );
    }

    // Optional callback
    onMax?.();
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems={withCoinSelector ? "center" : "unset"}
      className={className}
    >
      {!labelInline && label && <ZigTypography pb="10px">{label}</ZigTypography>}
      <Layout
        withCoinSelector={withCoinSelector}
        display={wide ? "flex" : "inline-flex"}
        error={!!error}
        labelInline={labelInline}
      >
        {labelInline && (
          <TopDivider error={!!error}>
            <ZigTypography color="neutral300" variant="body2" id={id && `${id}-top-label`}>
              {label}
            </ZigTypography>
          </TopDivider>
        )}
        <Box
          display="flex"
          alignItems="center"
          gap={!withCoinSelector ? 2 : 0}
          width={wide ? 1 : "auto"}
        >
          {!withCoinSelector && tokenOptions?.length < 2 && (
            <Box display="flex" alignItems="center" gap={1}>
              <ZigCoinIcon size="small" coin={coinVal} id={id && `${id}-coin-icon`} />
              <ZigTypography color="neutral100" variant="h3" id={id && `${id}-coin-name`}>
                {coinVal}
              </ZigTypography>
            </Box>
          )}
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
                    <MaxButton variant="outlined" onClick={handleMax} id={id && `${id}-max-button`}>
                      Max
                    </MaxButton>
                  </InputAdornment>
                ) : null,
            }}
            onChange={handleChange}
          />
          {withCoinSelector && tokenOptions?.length >= 2 && (
            <Box>
              <ZigSelect
                outlined
                width={150}
                value={coin}
                onChange={(v1, v2) => {
                  onTokenChange?.(v2);
                }}
                options={tokenOptions}
              />
            </Box>
          )}
        </Box>
        <Box mt="16px" width={1}>
          <>
            {React.isValidElement(extraInfo) ? (
              extraInfo
            ) : extraInfo !== null ? (
              <InputExtraInfo
                id={id && `${id}-extra-info`}
                coin={coinVal}
                min={min}
                max={max}
                balance={balance}
                extraInfo={extraInfo as InputExtraInfoObject}
              />
            ) : null}
            {children && (
              <Box display="flex" justifyContent="center" mt={3} mb="13px">
                {children}
              </Box>
            )}
          </>
        </Box>
      </Layout>
      {error && typeof error === "string" && (
        <Box alignSelf="flex-start">
          <ErrorMessage text={error} id={id && `${id}-error`} />
        </Box>
      )}
    </Box>
  );
});

export default ZigInputAmount;
