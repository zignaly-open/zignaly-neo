import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const ZigButton: React.FC<ButtonProps & { active?: boolean }> = styled(
  ({ active, ...props }: ButtonProps & { active?: boolean }) => (
    <Button {...props} className={active ? "MuiButton-active" : ""} />
  ),
)``;

export default ZigButton;
