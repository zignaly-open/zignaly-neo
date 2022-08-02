import Typography from "components/display/Typography";
import React, { useCallback, useRef, useState } from "react";
import * as styled from "./styles";
import { ToggleButtonProps } from "./types";

function ToggleButton({
  value,
  onChange = () => {},
  defaultValue = false,
  size = "large",
}: ToggleButtonProps) {
  const isControlled = useRef(value !== undefined);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isChecked = isControlled.current ? value ?? false : internalValue;

  /**
   * @function handleClickToggle
   * @description Change the value of the toggle button.
   */
  const handleClickToggle = useCallback(() => {
    const newValue = !isChecked;
    setInternalValue(newValue);
    onChange(newValue);
  }, [isChecked]);

  const LargeSize = () => {
    return (
      <styled.Toggle size={size} onClick={handleClickToggle} checked={isChecked}>
        <styled.ToggleContainer>
          <styled.ToggleCheck>
            <Typography variant="body1" weight="demibold" color="white">
              Yes
            </Typography>
          </styled.ToggleCheck>
          <styled.ToggleUncheck>
            <Typography variant="body1" weight="demibold" color="white">
              No
            </Typography>
          </styled.ToggleUncheck>
        </styled.ToggleContainer>
        <styled.ToggleCircle></styled.ToggleCircle>
        <styled.ToggleInput type="checkbox" aria-label="Toggle Button" />
      </styled.Toggle>
    );
  };

  const SmallOrMediumSize = () => {
    return (
      <styled.Toggle size={size} onClick={handleClickToggle} checked={isChecked}>
        <styled.ToggleContainer>
          <styled.ToggleCheck></styled.ToggleCheck>
          <styled.ToggleUncheck></styled.ToggleUncheck>
        </styled.ToggleContainer>
        <styled.ToggleCircle></styled.ToggleCircle>
        <styled.ToggleInput type="checkbox" aria-label="Toggle Button" />
      </styled.Toggle>
    );
  };

  if (size === "small" || size === "medium") {
    return <SmallOrMediumSize />;
  } else if (size === "large") {
    return <LargeSize />;
  } else {
    return null;
  }
}

export default ToggleButton;
