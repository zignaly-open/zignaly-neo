import React, { useCallback, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { Layout } from "./styles";
import { ExpandableInputProps } from "./types";

function Expandable({ value = "", children }: ExpandableInputProps) {
  const innerRef = useRef(null);
  const [isExpanded, setExpanded] = useState(false);

  useClickAway(innerRef, () => {
    if (isExpanded && !value.trim().length) {
      setExpanded(false);
    }
  });

  const handleClick = useCallback(() => {
    if (!value.trim().length) {
      setExpanded(true);
    }
  }, []);

  return (
    <Layout ref={innerRef} onClick={handleClick} isExpanded={isExpanded}>
      {children({ isExpanded, setExpanded })}
    </Layout>
  );
}

export default Expandable;
