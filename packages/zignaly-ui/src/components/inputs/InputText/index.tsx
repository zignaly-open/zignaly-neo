// Dependencies
import React, { useCallback, useState } from "react";

// Styled Components
import { Layout, InputContainer, InputValue, Side, Label } from "./styles";
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
    defaultValue = "",
    readOnly = false,
    name,
  }: InputTextProps,
  inputRef: React.Ref<any>,
) {
  const [inputValue, setInputValue] = useState(defaultValue);

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
            readOnly={readOnly}
            ref={inputRef}
            onChange={handleTextChange}
            placeholder={placeholder}
            value={inputValue}
            disabled={disabled}
            type={type}
            onBlur={onBlur}
            name={name}
          />
        </Side>
        <Side>{rightSideElement}</Side>
      </InputContainer>

      {/* Show error Messages */}
      {error && <ErrorMessage text={error} />}
    </Layout>
  );
}

export default React.forwardRef(InputText);
