// Dependencies
import React from "react";

// Styled Components
import * as styled from "./styles";

// Types
import { IconButtonSizes, IconButtonVariants } from "./types";

type IconButtonProps = {
  variant?: IconButtonVariants;
  icon: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ variant = IconButtonVariants.PRIMARY, icon, onClick }: IconButtonProps) => {
  return (
    <styled.Layout variant={variant} size={IconButtonSizes.MEDIUM} onClick={onClick}>
      <styled.Icon src={icon} />
    </styled.Layout>
  );
};

export { IconButtonVariants, IconButtonSizes };
export default IconButton;
