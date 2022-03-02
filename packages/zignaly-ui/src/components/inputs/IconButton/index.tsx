// Dependencies
import React from "react";

// Styled Components
import * as styled from "./styles";

// Types
import { buttonVariantsId } from "types/buttons";
import { sizeTypesId } from "types/sizes";

type IconButtonProps = {
  variant?: buttonVariantsId;
  icon: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ variant = buttonVariantsId.PRIMARY, icon, onClick }: IconButtonProps) => {
  return (
    <styled.Layout variant={variant} size={sizeTypesId.MEDIUM} onClick={onClick}>
      <styled.Icon src={icon} />
    </styled.Layout>
  );
};

export default IconButton;
