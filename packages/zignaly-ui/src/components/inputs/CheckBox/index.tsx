import React, { useCallback, useRef, useState } from "react";

import { Layout, Box, Label, Icon } from "./styles";

import { CheckBoxProps } from "./types";

/**
 * @deprecated
 */

function CheckBox({
  defaultValue = false,
  value,
  label,
  disabled = false,
  onChange,
  id,
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
      onChange?.(newValue);
    }
  }, [disabled, isChecked, onChange]);

  return (
    <Layout onClick={handleClickChecked} isActive={isChecked} disabled={disabled} id={id}>
      <Box id={id && `${id}-checkbox`}>{isChecked && <Icon />}</Box>
      <Label variant={"body2"} color={"neutral300"} id={id && `${id}-label`}>
        {label}
      </Label>
    </Layout>
  );
}

export default CheckBox;
