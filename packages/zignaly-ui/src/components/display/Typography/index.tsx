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
  weight?: string;
  style?: any;
  component?: any;
  className?: string;
  color?: string;
  underline?: boolean;
  children: React.ReactNode;
}

const Typography = ({
  children,
  variant = "body",
  weight = "medium",
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
      className={[variant, weight, style && `style-${style}`, className]}
      as={component ?? componentByVariants[variant]}
    >
      {children}
    </styled.Layout>
  );
};

export default Typography;
