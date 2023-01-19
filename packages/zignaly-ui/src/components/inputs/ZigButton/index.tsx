import React from "react";
import { LoadingButton } from "@mui/lab";
import { Tooltip } from "@mui/material";

export type ZigButtonProps = React.ComponentProps<typeof LoadingButton> & {
  // export type ZigButtonProps = LoadingButtonProps & {
  ctaId?: string;
  tooltip?: string;
  active?: boolean;
};

const ZigButton = ({ loading, active, tooltip, ctaId, color, ...props }: ZigButtonProps) => {
  const button = (
    <LoadingButton
      data-tack-cta={ctaId}
      {...props}
      // hack to preserve old behavior but allow for normal mui theming
      color={props.variant === "outlined" && !color ? "secondary" : color}
      className={active ? "MuiButton-active" : ""}
    />
  );
  return tooltip ? (
    <Tooltip title={tooltip}>
      {/* if we want to have a tooltip and have the button be disabled, we need a new container */}
      {props.disabled ? <span>{button}</span> : button}
    </Tooltip>
  ) : (
    button
  );
};

export default ZigButton as typeof ZigButton & typeof LoadingButton;
