// Dependencies
import React, { useCallback, useRef, useState } from "react";

// Styled Components
import { Layout, Box, Label, Icon } from "./styles";

// Types
import { CheckBoxProps } from "./types";

function CheckBox({
  defaultValue = false,
  value,
  label,
  disabled = false,
  onChange = () => {},
}: CheckBoxProps) {
  const isControlled = useRef(value !== undefined);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isChecked = isControlled.current ? value ?? false : internalValue;

  /**
   * @function handleClickChecked
   * @description Change the value of the check.
   */
  const handleClickChecked = useCallback(() => {
    if (!disabled) {
      const newValue = !isChecked;
      setInternalValue(newValue);
      onChange(newValue);
    }
  }, [disabled, isChecked]);

  return (
    <Layout onClick={handleClickChecked} isActive={isChecked} disabled={disabled}>
      <Box>
        <Icon />
      </Box>
      <Label>{label}</Label>
    </Layout>
  );
}

export default CheckBox;
