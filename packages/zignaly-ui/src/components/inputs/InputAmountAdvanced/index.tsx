import React, { useCallback } from "react";
import NumberFormat from "react-number-format";
import { useController } from "react-hook-form";
import {
  InputContainer,
  InputValue,
  Layout,
  BalanceContainer,
  BalanceLabel,
  MaxButton,
  Side,
  Unit,
  UnitInvisible,
  Wrapper,
  InputField,
  ErrorContainer,
} from "./styles";
import TokenSelector from "./components/TokenSelector";
import ErrorMessage from "components/display/ErrorMessage";
import Typography from "components/display/Typography";
import CoinIcon, { CoinSizes } from "../../display/CoinIcon";
import { InputAmountProps, TokenItem } from "./types";
import { changeEvent } from "utils/event";

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
}: InputAmountProps) {
  const {
    field: { ref, onChange, onBlur, value },
  } = useController({
    name,
    control,
    defaultValue: {
      value: 0,
      token: tokens[0],
    },
  });

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
  /**
   * @function onClickMaxValue:
   * @description Changes the input value to the maximum value declared in the balance.
   */
  const onClickMaxValue = useCallback(() => {
    if (!disabled && value?.token?.balance) {
      onValueChange(changeEvent(name, value?.token.balance));
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

      {value?.token?.balance && (
        <BalanceContainer>
          <BalanceLabel variant="body2" color="neutral200">
            {labelBalance}
          </BalanceLabel>
          <Typography variant="body2" color="neutral000">
            <NumberFormat
              value={value?.token.balance as string}
              displayType={"text"}
              suffix={value?.token ? ` ${value?.token?.id?.toUpperCase() ?? ""}` : ""}
              thousandSeparator={true}
            />
          </Typography>
        </BalanceContainer>
      )}

      {error && (
        <ErrorContainer>
          <ErrorMessage text={error} />
        </ErrorContainer>
      )}
    </Layout>
  );
}

export default InputAmount;
