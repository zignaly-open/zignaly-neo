import {LoadingButton, LoadingButtonProps} from "@mui/lab";
import { styled } from "@mui/system";
import React from "react";

const ZigButton: React.FC<LoadingButtonProps & { active?: boolean }> = styled(
  ({ active, ...props }: LoadingButtonProps & { active?: boolean }) => (
    <LoadingButton {...props} className={active ? "MuiButton-active" : ""} />
  ),
)``;

export default ZigButton;
