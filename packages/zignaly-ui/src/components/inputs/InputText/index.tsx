import React, { useCallback, useRef, useState } from "react";
import {
  Layout,
  InputContainer,
  InputValue,
  Side,
  IconContainer,
  Label,
  ActionButton,
} from "./styles";
import { InputTextProps } from "./types";
import ErrorMessage from "components/display/ErrorMessage";
import Typography from "components/display/Typography";
import TextButton from "../TextButton";
import { ReactComponent as CheckIcon } from "assets/icons/check-icon.svg";
import { ReactComponent as CopyIcon } from "assets/icons/copy-icon.svg";
import { useTheme } from "styled-components";
import Theme from "../../../theme/theme";

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
    id,
    readOnly = false,
    name,
    multiline,
    onClickRightSideElement = null,
    leftSideElement = null,
    rightSideElement = null,
    withoutBorder = false,
    labelAction = null,
    minHeight,
    maxHeight,
    copyToClipboard = false,
    onTextCopied = () => null,
  }: InputTextProps,
  inputRef: React.Ref<HTMLInputElement>,
) {
  const isControlled = useRef(value !== undefined);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputValue = isControlled.current ? value : internalValue;
  const copyToClipboardTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isTextCopied, setIsTextCopied] = useState(false);
  const theme = useTheme() as Theme;

  const handleTextChange = useCallback((e: any) => {
    const newValue = e.target.value;
    if (isControlled) {
      setInternalValue(newValue);
    }
    onChange(e, { value: newValue });
  }, []);

  /**
   * @function handleCopyToClipboard():
   * @description Invoke when the user wants to copy the input value to the clipboard.
   */
  const handleCopyToClipboard = useCallback(async () => {
    const value = inputValue;

    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(String(value));
    } else {
      document.execCommand("copy", true, value);
    }

    if (!isTextCopied) {
      onTextCopied(internalValue);
    }

    if (copyToClipboardTimer.current) {
      clearTimeout(copyToClipboardTimer.current);
    }

    setIsTextCopied(true);
    copyToClipboardTimer.current = setTimeout(() => {
      setIsTextCopied(false);
    }, 2000);
  }, [inputValue, isTextCopied, copyToClipboardTimer]);

  return (
    <Layout withError={!!error} disabled={disabled}>
      <Label>
        <Typography variant="h3" weight="regular" color="neutral200">
          {label}
        </Typography>
        {labelAction && (
          <TextButton
            tabIndex={labelAction.tabIndex}
            href={labelAction.href}
            onClick={labelAction.onClick}
            caption={labelAction.text}
          />
        )}
      </Label>
      <InputContainer maxHeight={maxHeight} minHeight={minHeight} withoutBorder={withoutBorder}>
        <Side cursor="auto">
          {leftSideElement && <IconContainer>{leftSideElement}</IconContainer>}
          <InputValue
            id={id}
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
        {copyToClipboard && String(inputValue).trim().length ? (
          <ActionButton onClick={handleCopyToClipboard}>
            {isTextCopied ? (
              <CheckIcon width={"18px"} height={"18px"} color={theme.neutral300} />
            ) : (
              <CopyIcon width={"22px"} height={"22px"} color={theme.neutral300} />
            )}
          </ActionButton>
        ) : (
          rightSideElement && (
            <Side
              className={"right"}
              cursor={onClickRightSideElement === null ? "auto" : "pointer"}
              onClick={() => onClickRightSideElement}
            >
              {rightSideElement}
            </Side>
          )
        )}
      </InputContainer>

      {/* Show error Messages */}
      {error && <ErrorMessage text={error} />}
    </Layout>
  );
}

export default React.forwardRef(InputText);
