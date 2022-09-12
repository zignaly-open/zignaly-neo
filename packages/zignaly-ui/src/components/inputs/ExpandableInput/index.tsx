import React, { useCallback, useRef, useState, useEffect, RefObject } from "react";
import { useClickAway } from "react-use";
import { Layout, Field, Input, Icon } from "./styles";
import { ExpandableInputProps } from "./types";

function ExpandableInput({ icon, placeholder = "", value = "", onChange }: ExpandableInputProps) {
  const innerRef = useRef(null);
  const inputRef = useRef(null) as RefObject<HTMLInputElement>;
  const [isActive, setActive] = useState(false);

  /**
   * @function handleClickIcon():
   * @description Trigger the click of the button.
   */
  const handleClickIcon = useCallback(() => {
    if (!isActive) {
      setActive(true);
    }
  }, [inputRef]);

  useClickAway(innerRef, () => {
    if (isActive && !value.trim().length) {
      setActive(false);
    }
  });

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        if (inputRef && inputRef.current) {
          inputRef.current.focus();
        }
      }, 200);
    }
  }, [isActive]);

  return (
    <Layout ref={innerRef} isActive={isActive}>
      <Icon onClick={handleClickIcon}>{icon}</Icon>
      <Field>
        <Input
          ref={inputRef}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </Field>
    </Layout>
  );
}

export default ExpandableInput;
