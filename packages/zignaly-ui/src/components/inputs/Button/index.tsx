import * as React from "react";
import { ReactElement, useMemo } from "react";

import * as styled from "./styles";

import { ButtonProps } from "./types";

// TODO: deprecated, use ZigButton
function Button({
  variant = "primary",
  size = "medium",
  caption = "Button",
  color = "grey",
  leftElement = null,
  rightElement = null,
  disabled = false,
  onClick = () => {},
  id,
  loading,
  type,
  testIdLeftElement = null,
  testIdCaptionElement = null,
  testIdRightElement = null,
  minWidth,
  maxWidth,
  maxHeight,
  bottomElement,
  width,
}: ButtonProps): ReactElement {
  /**
   * @function renderLeftElement
   * @description Render an element on the left side, if a JSX render a component, otherwise an image.
   * @type {JSX.Element}
   */
  const renderLeftElement = useMemo(
    () => (typeof leftElement === "object" ? leftElement : null),
    [leftElement],
  );

  /**
   * @function renderRightElement
   * @description Render an element on the right side, if a JSX render a component, otherwise an image.
   * @type {JSX.Element}
   */
  const renderRightElement = useMemo(
    () => (typeof rightElement === "object" ? rightElement : null),
    [rightElement],
  );

  return (
    <styled.Layout
      width={width}
      isLoading={loading}
      id={id}
      withElements={!!leftElement && !!rightElement && !!caption}
      withLeftElement={!!leftElement && !!caption}
      withRightElement={!!rightElement && !!caption}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      type={type}
      minWidth={minWidth}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    >
      <styled.Container>
        <styled.ElementsContainer>
          {leftElement && (
            <styled.LeftElement
              id={"button-left-element"}
              data-testid={testIdLeftElement ? testIdLeftElement : "button-left-element"}
            >
              {renderLeftElement}
            </styled.LeftElement>
          )}
          <styled.CaptionContainer>
            {caption && (
              <styled.Caption
                id={"button-caption-element"}
                data-testid={testIdCaptionElement ? testIdCaptionElement : "button-caption-element"}
              >
                {caption}
              </styled.Caption>
            )}
            {bottomElement && bottomElement}
          </styled.CaptionContainer>
          {rightElement && (
            <styled.RightElement
              id={"button-right-element"}
              data-testid={testIdRightElement ? testIdRightElement : "button-right-element"}
            >
              {renderRightElement}
            </styled.RightElement>
          )}
        </styled.ElementsContainer>
      </styled.Container>
    </styled.Layout>
  );
}

export default Button;
