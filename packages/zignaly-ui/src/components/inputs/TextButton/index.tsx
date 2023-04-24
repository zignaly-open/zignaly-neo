import { LoaderTypes } from "components/display/Loader";
import * as React from "react";
import { ReactElement } from "react";

import * as styled from "./styles";
import { ButtonProps } from "./types";
import ZigTypography from "../../display/ZigTypography";

// TODO: think of a good way to fix this
function TextButton({
  caption = "Button",
  leftElement,
  rightElement,
  underline,
  onClick = () => {},
  href,
  allowClickOnDisabled = false, // sorry
  disabled = false,
  loading = false,
  rel,
  as,
  id,
  target,
  className,
  tabIndex,
  color = "links",
  type = "button",
  variant = "h4",
}: ButtonProps): ReactElement {
  // @ts-ignore
  return (
    <styled.Layout
      className={className}
      color={color}
      id={id}
      type={type}
      isLoading={loading}
      withElements={!!leftElement || !!rightElement}
      onClick={(allowClickOnDisabled || !disabled) && onClick}
      disabled={disabled || loading}
      tabIndex={tabIndex}
      as={as}
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
          <ZigTypography
            color={disabled ? "neutral300" : color}
            // @ts-ignore
            variant={variant}
            underline={underline}
          >
            {caption}
          </ZigTypography>
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
