// Dependencies
import React from "react";

// Styles
import * as styled from "./styles";

const componentByVariants = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "span",
  number: "span",
};

export interface TypographyProps {
  variant?: keyof typeof componentByVariants;
  size?: string;
  style?: any;
  component?: any;
  className?: string;
  color?: string;
  children: React.ReactNode;
}

const Typography = ({
  children,
  variant = "body",
  size = "medium",
  style,
  color,
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
