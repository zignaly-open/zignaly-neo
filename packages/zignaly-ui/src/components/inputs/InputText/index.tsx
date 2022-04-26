// Dependencies
import React, { useCallback, useState } from "react";

// Styled Components
import { Layout, InputContainer, InputValue, Side, Label, RightSideElement } from "./styles";
import { InputTextProps } from "./types";

import ErrorMessage from "components/display/ErrorMessage";

function InputText(
  {
    onBlur,
    error = null,
    disabled = false,
    placeholder = "Please enter a value",
    label,
    onChange,
    rightSideElement,
    type,
  }: InputTextProps,
  inputRef: React.Ref<any>,
) {
  const [inputValue, setInputValue] = useState("");

  const handleTextChange = useCallback((e: any) => {
    const value = e.target.value;

    setInputValue(value);
    onChange(e, { value: value });
    return;
  }, []);
  return (
    <Layout withError={!!error} disabled={disabled}>
      <Label>{label}</Label>
      <InputContainer>
        <Side>
          <InputValue
            ref={inputRef}
            onChange={handleTextChange}
            placeholder={placeholder}
            value={inputValue}
            disabled={disabled}
            type={type}
            onBlur={onBlur}
          />
        </Side>
        <Side>
          <RightSideElement src={rightSideElement} alt= {null} />
        </Side>
      </InputContainer>

      {/* Show error Messages */}
      {error && <ErrorMessage text={error} />}
    </Layout>
  );
}

export default React.forwardRef(InputText);
