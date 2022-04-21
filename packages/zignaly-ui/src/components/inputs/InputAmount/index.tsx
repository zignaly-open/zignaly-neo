// Dependencies
import React, { useCallback, useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { parseUnits } from "@ethersproject/units";
import { BigNumber, utils } from "ethers";

// Styled Components
import {
  InputContainer,
  InputValue,
  Label,
  Layout,
  TokenImage,
  BalanceContainer,
  BalanceLabel,
  BalanceValue,
  MaxButton,
  Side,
} from "./styles";

// Components
import TokenSelector from "./components/TokenSelector";
import ErrorMessage from "components/display/ErrorMessage";

// Types
import { InputAmountProps, TokenItem } from "./types";

function InputAmount(
  {
    onChange,
    tokens = [],
    error = null,
    disabled = false,
    initialTokenIndex = 0,
    label = "Amount to Withdraw",
    value = BigNumber.from(0),
  }: InputAmountProps,
  inputRef: React.Ref<any>,
) {
  // Hooks
  const [inputValue, setInputValue] = useState("");
  const [selectedToken, setSelectedToken] = useState(tokens[initialTokenIndex] ?? null);

  /** ================= *
   *   Layout Effects
   *  ================= */
  useEffect(() => {
    if (selectedToken && inputValue.length) {
      const tokenBalance = BigNumber.from(selectedToken.balance);
      const number = BigNumber.from(parseUnits(inputValue === "" ? "0.0" : inputValue, 18));
      const currentValue = BigNumber.from(number);

      if (currentValue.gt(tokenBalance)) {
        onClickMaxValue();
      }
    }
  }, [selectedToken]);

  /**
   * @function handleTextChange:
   * @description Invoked when the field is changed, both the quantity and the selected unit will be sent if available.
   */
  const handleTextChange = useCallback(
    (e: any) => {
      const value = e.target.value;

      if (value === "") {
        onChange(BigNumber.from(0));
        setInputValue(value);
        return;
      }

      let bigNumberValue;
      try {
        bigNumberValue = parseUnits(value, 18);
      } catch (e) {
        return;
      }

      if (selectedToken && selectedToken.balance && bigNumberValue.gt(selectedToken.balance)) {
        return;
      }

      const decimals = value.toString().split(".")[1]?.length ?? 0;

      if (decimals <= 18) {
        const number = BigNumber.from(parseUnits(value === "" ? "0.0" : value, 18));
        setInputValue(value);
        onChange({
          value: number,
          token: selectedToken,
        });
      }
    },
    [selectedToken],
  );

  /**
   * @function handleChangeToken:
   * @description Function invoked when a token is changed.
   */
  const handleChangeToken = useCallback(
    (token: TokenItem) => {
      setSelectedToken(token);

      onChange({
        value,
        token,
      });
    },
    [value],
  );

  /**
   * @function onClickMaxValue:
   * @description Changes the input value to the maximum value declared in the balance.
   */
  const onClickMaxValue = useCallback(() => {
    if (!disabled && selectedToken) {
      const newValue = BigNumber.from(selectedToken.balance);
      setInputValue(utils.formatUnits(newValue));
      onChange({
        value: newValue,
        token: selectedToken,
      });
    }
  }, [disabled, onChange, selectedToken]);

  return (
    <Layout withError={!!error} disabled={disabled}>
      <Label>{label}</Label>
      <InputContainer>
        <Side>
          {selectedToken && tokens.length < 2 && <TokenImage src={selectedToken.image} />}
          <InputValue
            ref={inputRef}
            value={inputValue}
            type={"text"}
            placeholder={"0.0"}
            onChange={handleTextChange}
            disabled={disabled}
          />
          {selectedToken && tokens && <MaxButton onClick={onClickMaxValue}>Max</MaxButton>}
        </Side>
        {tokens && tokens.length > 2 && (
          <Side>
            <TokenSelector
              value={selectedToken}
              tokens={tokens}
              onSelectToken={handleChangeToken}
            />
          </Side>
        )}
      </InputContainer>

      {/* Show Balance of the Input */}
      {selectedToken && selectedToken.balance && (
        <BalanceContainer>
          <BalanceLabel>Balance:</BalanceLabel>
          <BalanceValue>
            <NumberFormat
              value={utils.formatUnits(selectedToken.balance)}
              displayType={"text"}
              suffix={selectedToken ? ` ${selectedToken.name}` : ""}
              thousandSeparator={true}
            />
          </BalanceValue>
        </BalanceContainer>
      )}

      {/* Show error Messages */}
      {error && <ErrorMessage text={error} />}
    </Layout>
  );
}

export default React.forwardRef(InputAmount);
