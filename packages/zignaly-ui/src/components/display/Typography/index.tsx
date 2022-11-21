import React from "react";
import * as styled from "./styles";
import { componentByVariants, TypographyProps } from "./types";

/**
 * @deprecated
 */
function Typography({
  children,
  variant = "body1",
  weight,
  color,
  underline,
  component,
  className,
}: TypographyProps): JSX.Element {
  return (
    <styled.Layout
      color={color}
      underline={underline}
      weight={weight}
      className={[variant, className]}
      as={component ?? componentByVariants[variant]}
    >
      {children}
    </styled.Layout>
  );
}

export default Typography;
