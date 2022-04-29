// Dependencies
import * as React from "react";
import { ReactElement } from "react";

// Styled Components
import * as styled from "./styles";
import { ButtonProps } from "./types";

function TextButton({
  caption = "Button",
  leftElement,
  rightElement,
  underline,
  onClick = () => {},
}: ButtonProps): ReactElement {
  return (
    <styled.Layout
      underline={underline}
      withElements={!!leftElement || !!rightElement}
      onClick={onClick}
    >
      <styled.Container>
        {leftElement && <styled.LeftElement>{leftElement}</styled.LeftElement>}
        {caption}
        {rightElement && <styled.RightElement>{rightElement}</styled.RightElement>}
      </styled.Container>
    </styled.Layout>
  );
}

export default TextButton;
