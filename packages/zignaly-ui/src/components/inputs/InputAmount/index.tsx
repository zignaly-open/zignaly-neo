import React, { useCallback, useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { parseUnits } from "@ethersproject/units";
import { BigNumber, utils } from "ethers";

import {
  InputContainer,
  InputValue,
  Layout,
  BalanceContainer,
  BalanceLabel,
  BalanceValue,
  MaxButton,
  Side,
  Unit,
  Wrapper,
  InputField,
} from "./styles";

import TokenSelector from "./components/TokenSelector";
import ErrorMessage from "components/display/ErrorMessage";
import Typography from "components/display/Typography";
import CoinIcon, { CoinSizes } from "../../display/CoinIcon";

import { InputAmountProps, TokenItem } from "./types";
import { changeEvent } from "utils/event";

// TODO: remove
function InputAmount(
  {
    onChange,
    onBlur,
    tokens = [],
    error = null,
    disabled = false,
    initialTokenIndex = 0,
    label = "Amount to Withdraw",
    labelBalance = "Balance:",
    value = BigNumber.from(0),
    name,
    readOnly = false,
    fullWidth,
    placeholder,
    showUnit = false,
    showMaxButton = true,
    customCoinIcon,
  }: InputAmountProps,
  inputRef: React.Ref<any>,
) {
  const [inputValue, setInputValue] = useState(value);
  const [selectedTokenId, setSelectedTokenId] = useState(initialTokenIndex);
  const selectedToken = tokens[selectedTokenId];

  /** ================= *
   *   Layout Effects
   *  ================= */
  useEffect(() => {
    // @ts-ignore
    if (selectedToken && inputValue.length) {
      const tokenBalance = BigNumber.from(selectedToken.balance);
      // @ts-ignore
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
        // onChange(BigNumber.from(0));
        onChange(e, { value: value, token: selectedToken });
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
        // @ts-ignore
        onChange(e, { value: number, token: selectedToken });
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
      const index = tokens.findIndex((t) => t === token);
      setSelectedTokenId(index);

      // @ts-ignore
      onChange(changeEvent(name, inputValue), {
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
      const number = utils.formatUnits(newValue);
      setInputValue(number);
      // @ts-ignore
      onChange(changeEvent(name, number), { value: newValue, token: selectedToken });
    }
  }, [disabled, onChange, selectedToken]);

  // @ts-ignore
  return (
    <Layout withError={!!error} disabled={disabled} fullWidth={fullWidth}>
      <Typography weight="regular" color="neutral200">
        {label}
      </Typography>
      <Wrapper>
        <InputContainer>
          <Side>
            {selectedToken?.id && tokens.length < 2 && (
              <>
                {customCoinIcon ? (
                  customCoinIcon
                ) : (
                  <CoinIcon
                    name={selectedToken.id}
                    size={CoinSizes.SMALL}
                    coin={selectedToken.id}
                  />
                )}
              </>
            )}
            <InputField>
              <InputValue
                ref={inputRef}
                // @ts-ignore
                value={readOnly ? value : inputValue}
                readOnly={readOnly}
                type={"text"}
                placeholder={placeholder || "0.0"}
                onChange={handleTextChange}
                onBlur={onBlur}
                disabled={disabled}
                name={name}
              />
            </InputField>
            {selectedToken && tokens && showMaxButton && (
              <MaxButton onClick={onClickMaxValue}>Max</MaxButton>
            )}
          </Side>
          {tokens?.length > 2 && (
            <Side>
              <TokenSelector
                value={selectedToken}
                tokens={tokens}
                onSelectToken={handleChangeToken}
              />
            </Side>
          )}
        </InputContainer>
        {tokens?.length === 1 && showUnit && (
          <Unit>
            <Typography color="neutral300" variant="h1">
              {selectedToken.id.toUpperCase()}
            </Typography>
          </Unit>
        )}
      </Wrapper>

      {selectedToken && selectedToken.balance && (
        <BalanceContainer>
          <BalanceLabel variant="body2" weight="medium">
            {labelBalance}
          </BalanceLabel>
          <BalanceValue variant="body2" weight="medium">
            <NumberFormat
              value={utils.formatUnits(selectedToken.balance)}
              displayType={"text"}
              suffix={selectedToken ? ` ${selectedToken.id.toUpperCase()}` : ""}
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
