import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/system";
import React from "react";
import { Tooltip } from "@mui/material";

const ZigButton = styled(
  ({
    active,
    tooltip,
    ctaId,
    ...props
  }: LoadingButtonProps & { ctaId?: string; tooltip?: string; active?: boolean }) => {
    const button = (
      <LoadingButton
        data-tack-cta={ctaId}
        {...props}
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
  },
)``;

export default ZigButton;
