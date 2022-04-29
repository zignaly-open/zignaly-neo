// Dependencies
import React from "react";

// Styled Components
import * as styled from "./styles";

// Types
import { IconButtonSizes, IconButtonVariants } from "./types";

type IconButtonProps = {
  variant?: IconButtonVariants;
  icon: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ variant = IconButtonVariants.PRIMARY, icon, onClick }: IconButtonProps) => {
  console.log(icon);
  return (
    // @ts-ignore
    <styled.Layout variant={variant} size={IconButtonSizes.MEDIUM} onClick={onClick}>
      {icon}
    </styled.Layout>
  );
};

export { IconButtonVariants, IconButtonSizes };
export default IconButton;
