// Dependencies
import { LoaderTypes } from "components/display/Loader";
import * as React from "react";
import { ReactElement, useMemo } from "react";

// Styled Components
import * as styled from "./styles";

// Types
import { ButtonProps } from "./types";

function Button({
  variant = "primary",
  size = "medium",
  caption = "Button",
  color = "grey",
  leftElement = null,
  rightElement = null,
  disabled = false,
  onClick = () => {},
  loading,
  type,
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
      isLoading={loading}
      withElements={!!leftElement && !!rightElement && !!caption}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      type={type}
    >
      <styled.Container>
        <styled.ElementsContainer>
          {leftElement && <styled.LeftElement>{renderLeftElement}</styled.LeftElement>}
          {caption && <styled.Caption>{caption}</styled.Caption>}
          {rightElement && <styled.RightElement>{renderRightElement}</styled.RightElement>}
        </styled.ElementsContainer>
      </styled.Container>

      {loading && (
        <styled.LoaderContainer>
          <styled.ButtonLoader
            type={LoaderTypes.TAILSPIN}
            color="#9CA3AF"
            ariaLabel="Loader"
          ></styled.ButtonLoader>
        </styled.LoaderContainer>
      )}
    </styled.Layout>
  );
}

export default Button;
