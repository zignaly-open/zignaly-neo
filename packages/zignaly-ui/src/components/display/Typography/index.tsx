// Dependencies
import React from "react";

// Styles
import * as styled from "./styles";

// Types
import { TypographyProps, componentByVariants } from "./types";

const Typography = ({
  children,
  variant = "body",
  size = "medium",
  style,
  color = "#F3F4F6",
  component,
  className,
}: TypographyProps) => {
  return (
    <styled.Layout
      color={color}
      className={[variant, size, style && `style-${style}`, className]}
      as={component ?? componentByVariants[variant]}
    >
      {children}
    </styled.Layout>
  );
};

export default Typography;
