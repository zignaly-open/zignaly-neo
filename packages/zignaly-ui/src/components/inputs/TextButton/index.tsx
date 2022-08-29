// Dependencies
import { LoaderTypes } from "components/display/Loader";
import Typography from "components/display/Typography";
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
  href,
  disabled = false,
  loading = false,
  rel,
  target,
  className,
  tabIndex,
  color = "links",
  variant = "h4",
}: ButtonProps): ReactElement {
  return (
    <styled.Layout
      className={className}
      color={color}
      isLoading={loading}
      withElements={!!leftElement || !!rightElement}
      onClick={!disabled && onClick}
      disabled={disabled || loading}
      tabIndex={tabIndex}
      {...(href && {
        href,
        as: "a" as any,
        rel: rel ?? "noopener noreferrer",
        target: target ?? "_blank",
      })}
    >
      <styled.Container>
        <styled.ElementsContainer>
          {leftElement && <styled.LeftElement>{leftElement}</styled.LeftElement>}
          <Typography color={color} weight="regular" variant={variant} underline={underline}>
            {caption}
          </Typography>
          {rightElement && <styled.RightElement>{rightElement}</styled.RightElement>}
        </styled.ElementsContainer>
      </styled.Container>

      {loading && (
        <styled.LoaderContainer>
          <styled.ButtonLoader type={LoaderTypes.TAILSPIN} color="#9CA3AF" ariaLabel="Loader" />
        </styled.LoaderContainer>
      )}
    </styled.Layout>
  );
}

export default TextButton;
