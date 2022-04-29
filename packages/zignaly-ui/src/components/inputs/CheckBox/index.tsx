// Dependencies
import React, { useCallback, useState } from "react";

// Styled Components
import { Layout, Box, Label, Icon } from "./styles";

// Assets
import CheckmarkIcon from "assets/icons/checkmark-active-icon.svg?url";

// Types
import { CheckBoxProps } from "./types";

function CheckBox({ value, label, disabled = false, onChange = () => {} }: CheckBoxProps) {
  const [isChecked, setChecked] = useState(value ?? false);

  /**
   * @function handleClickChecked
   * @description Change the value of the check.
   */
  const handleClickChecked = useCallback(() => {
    if (!disabled) {
      const newValue = !isChecked;
      setChecked(newValue);
      onChange(newValue);
    }
  }, [disabled, isChecked]);

  return (
    <Layout onClick={handleClickChecked} isActive={isChecked} disabled={disabled}>
      <Box>
        <Icon src={CheckmarkIcon} alt={label} />
      </Box>
      <Label>{label}</Label>
    </Layout>
  );
}

export default CheckBox;
