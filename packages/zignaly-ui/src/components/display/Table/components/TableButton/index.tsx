// Dependencies
import React from "react";

// Styled Components
import * as styled from "./styles";

// Types
import { sizeTypesId } from "types/sizes";
import { buttonVariantsId } from "types/buttons";

export interface TableButtonProps {
  caption: string;
  variant?: buttonVariantsId;
  size?: sizeTypesId;
  icon?: any;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const TableButton = ({
  caption,
  variant,
  size = sizeTypesId.SMALL,
  icon,
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
