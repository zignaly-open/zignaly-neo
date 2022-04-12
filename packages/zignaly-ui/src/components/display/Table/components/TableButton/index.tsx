// Dependencies
import React from "react";

// Styled Components
import * as styled from "./styles";

// Types
import { TableButtonSizes } from "./types";

enum ButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface TableButtonProps {
  caption: string;
  variant?: ButtonVariants;
  size?: TableButtonSizes;
  icon?: any;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const TableButton = ({
  caption,
  icon,
  variant = ButtonVariants.PRIMARY,
  size = TableButtonSizes.SMALL,
  onClick = () => {},
}: TableButtonProps) => {
  return (
    <styled.Layout onClick={onClick} variant={variant} size={size}>
      {icon && <styled.Icon src={icon} />}
      <styled.Caption>{caption}</styled.Caption>
    </styled.Layout>
  );
};

export default TableButton;
