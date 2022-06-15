// Dependencies
import React, { useCallback, useRef, useState } from "react";

// Styled Components
import { Layout, InputContainer, InputValue, Side, IconContainer, Label } from "./styles";
import { InputTextProps } from "./types";

import ErrorMessage from "components/display/ErrorMessage";
import Typography from "components/display/Typography";
import TextButton from "../TextButton";

function InputText(
  {
    onBlur,
    error = null,
    disabled = false,
    placeholder = "Please enter a value",
    label,
    onChange = () => {},
    type,
    defaultValue = "",
    value,
    readOnly = false,
    name,
    multiline,
    onClickRightSideElement = null,
    leftSideElement = null,
    rightSideElement = null,
    withoutBorder = false,
    labelAction = null,
  }: InputTextProps,
  inputRef: React.Ref<any>,
) {
  const isControlled = useRef(value !== undefined);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputValue = isControlled.current ? value : internalValue;

  const handleTextChange = useCallback((e: any) => {
    const newValue = e.target.value;
    if (isControlled) {
      setInternalValue(newValue);
    }
    onChange(e, { value: newValue });
  }, []);

  return (
    <Layout withError={!!error} disabled={disabled}>
      <Label>
        <Typography variant="h3" weight="regular" color="neutral200">
          {label}
        </Typography>
        {labelAction && <TextButton href={labelAction.href} caption={labelAction.text} />}
      </Label>
      <InputContainer withoutBorder={withoutBorder}>
        <Side cursor="auto">
          {leftSideElement && <IconContainer>{leftSideElement}</IconContainer>}
          <InputValue
            as={multiline ? "textarea" : "input"}
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
        {rightSideElement && (
          <Side
            className={"right"}
            cursor={onClickRightSideElement === null ? "auto" : "pointer"}
            onClick={() => onClickRightSideElement}
          >
            {rightSideElement}
          </Side>
        )}
      </InputContainer>

      {/* Show error Messages */}
      {error && <ErrorMessage text={error} />}
    </Layout>
  );
}

export default React.forwardRef(InputText);
