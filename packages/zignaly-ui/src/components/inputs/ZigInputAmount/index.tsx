import React, { useState, forwardRef } from "react";
import { ZigInputAmountProps } from "./types";
import { InputAdornment, TextField, Box, Divider } from "@mui/material";
import ZigButton from "../ZigButton";
import { ErrorMessage } from "../../display/ZigAlertMessage";
import ZigInput from "../ZigInput";
import { Layout, MaxButton, TopDivider } from "./styles";
import ZigTypography from "components/display/ZigTypography";
import { InputExtraInfo } from "./atoms";
import ZigCoinIcon from "../../display/ZigCoinIcon";
export { InputExtraInfo } from "./atoms";

const ZigInputAmount = forwardRef((props: ZigInputAmountProps, ref) => {
  const { label, error, wide, coin, extraInfo, onMax, placeholder = "0.0", wrapExtraInfo } = props;
  const coinVal = typeof coin === "object" ? coin.coin : coin ?? "";

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
                <MaxButton variant="outlined" onClick={onMax}>
                  Max
                </MaxButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box alignSelf="flex-start" mt="11px">
        {error && typeof error === "string" && <ErrorMessage text={error} />}
      </Box>
      <Box mt={extraInfo && error && typeof error === "string" ? "7px" : "14px"} width={1}>
        {typeof extraInfo === "function" ? (
          extraInfo
        ) : extraInfo ? (
          <InputExtraInfo coin={coinVal} wrapExtraInfo={wrapExtraInfo} {...extraInfo} />
        ) : null}
      </Box>
    </Layout>
  );
});

export default ZigInputAmount;
