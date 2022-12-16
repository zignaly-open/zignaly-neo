import React, { useCallback } from "react";
import { useController } from "react-hook-form";
import {
  InputContainer,
  InputValue,
  Layout,
  BalanceLabel,
  MaxButton,
  Side,
  Unit,
  UnitInvisible,
  Wrapper,
  InputField,
} from "./styles";
import TokenSelector from "./components/TokenSelector";
import ErrorMessage from "components/display/ErrorMessage";
import Typography from "components/display/Typography";
import CoinIcon, { CoinSizes } from "../../display/CoinIcon";
import { InputAmountProps, TokenItem } from "./types";
import { changeEvent } from "utils/event";
import { useUpdateEffect } from "react-use";
import ZigPriceLabel from "components/display/ZigPriceLabel";
import { Box } from "@mui/material";

// FIXME this component still needs Jesus
function InputAmount({
  tokens = [],
  name = "amountValue",
  control,
  disabled = false,
  error = null,
  label,
  labelBalance = "Balance:",
  readOnly = false,
  placeholder,
  maxLength = 35,
  showUnit = false,
  fullWidth,
  showMaxButton = true,
  showBalance = true,
}: InputAmountProps) {
  const {
    field: { ref, onChange, onBlur, value },
  } = useController({
    name,
    control,
    defaultValue: {
      value: "",
      token: tokens[0],
    },
  });

  useUpdateEffect(() => {
    // Update token when prop changes
    onChange({
      token: tokens[0],
      value: "",
    });
  }, [tokens[0].id]);

  const onValueChange: typeof onChange = (e) => {
    onChange({
      token: value?.token,
      value: e.target.value,
    });
  };

  const onTokenChange: typeof onChange = (token: TokenItem) => {
    onChange({
      token,
      value: value?.value,
    });
  };

  const onClickMaxValue = useCallback(() => {
    if (!disabled && value?.token?.balance) {
      onValueChange(
        changeEvent(
          name,
          value?.token.balance
            ?.toString()
            .replace(/([^1-9])0+$/, "$1")
            .replace(/\.0*$/, ""),
        ),
      );
    }
  }, [disabled, onChange, value?.token]);

  return (
    <Layout withError={!!error} disabled={disabled} fullWidth={fullWidth}>
      <Typography weight="regular" color="neutral200">
        {label}
      </Typography>
      <Wrapper>
        <InputContainer>
          <Side>
            {value?.token?.id && tokens.length < 2 && (
              <CoinIcon name={value?.token.id} size={CoinSizes.SMALL} coin={value?.token.id} />
            )}
            <InputField>
              <InputValue
                autoComplete={"off"}
                name={name}
                ref={ref}
                value={value?.value}
                readOnly={readOnly}
                type={"text"}
                placeholder={placeholder}
                onChange={onValueChange}
                onBlur={onBlur}
                maxLength={maxLength}
                disabled={disabled}
              />
            </InputField>

            {tokens?.length === 1 && showUnit && value?.value.length !== 0 && (
              <>
                {/*TODO: calculate wiotdth properly*/}
                <Unit widthCharacters={String(value?.value)?.length ?? 1}>
                  <Typography color="neutral300" variant="h3">
                    {value?.token?.id.toUpperCase()}
                  </Typography>
                </Unit>
                <UnitInvisible />
              </>
            )}
            {value?.token && tokens && showMaxButton && (
              <MaxButton onClick={onClickMaxValue}>MAX</MaxButton>
            )}
          </Side>

          {tokens?.length >= 2 && (
            <Side>
              <TokenSelector value={value?.token} tokens={tokens} onSelectToken={onTokenChange} />
            </Side>
          )}
        </InputContainer>
      </Wrapper>

      {value?.token?.balance && showBalance && (
        <BalanceContainer>
          <BalanceLabel variant="body2" color="neutral200">
            {labelBalance}
          </BalanceLabel>
          <ZigPriceLabel
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
      )}

      {error && (
        <Box mt={value?.token?.balance && showBalance ? 1 : 0}>
          <ErrorMessage text={error} />
        </Box>
      )}
    </Layout>
  );
}

export default InputAmount;
