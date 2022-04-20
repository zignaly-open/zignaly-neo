// Dependencies
import React from "react";

// Styles
import * as styled from "./styles";
import { componentByVariants, TypographyProps } from "./types";

const Typography = ({
  children,
  variant = "body",
  weight,
  style,
  color = "#F3F4F6",
  underline,
  component,
  className,
}: TypographyProps) => {
  return (
    <styled.Layout
      color={color}
      underline={underline}
      weight={weight}
      className={[variant, style && `style-${style}`, className]}
      as={component ?? componentByVariants[variant]}
    >
      {children}
    </styled.Layout>
  );
};

export default Typography;
