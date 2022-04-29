// Dependencies
import * as React from "react";
import { ReactElement, useMemo } from "react";

// Styled Components
import * as styled from "./styles";

type ButtonProps = {
  caption?: string;
  icon?: ReactElement<any> | string;
  leftElement?: ReactElement<any> | string;
  rightElement?: ReactElement<any> | string;
  underline?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function TextButton({
  caption = "Button",
  leftElement,
  rightElement,
  underline,
  onClick = () => {},
}: ButtonProps): ReactElement {
  /**
   * @function renderLeftElement
   * @description Render an element on the left side, if a JSX render a component, otherwise an image.
   * @type {JSX.Element}
   */
  const renderLeftElement = useMemo(
    () =>
      typeof leftElement === "function" ? (
        leftElement
      ) : (
        <styled.Icon src={leftElement} alt={caption} />
      ),
    [leftElement],
  );

  /**
   * @function renderRightElement
   * @description Render an element on the right side, if a JSX render a component, otherwise an image.
   * @type {JSX.Element}
   */
  const renderRightElement = useMemo(
    () =>
      typeof rightElement === "function" ? (
        rightElement
      ) : (
        <styled.Icon src={rightElement} alt={caption} />
      ),
    [rightElement],
  );
  return (
    <styled.Layout
      underline={underline}
      withElements={!!leftElement || !!rightElement}
      onClick={onClick}
    >
      <styled.Container>
        {leftElement && <styled.LeftElement>{renderLeftElement}</styled.LeftElement>}
        {caption}
        {rightElement && <styled.RightElement>{renderRightElement}</styled.RightElement>}
      </styled.Container>
    </styled.Layout>
  );
}

export default TextButton;
