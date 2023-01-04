import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/system";
import React from "react";
import { Tooltip } from "@mui/material";

type ButtonProps = LoadingButtonProps & { ctaId?: string; tooltip?: string; active?: boolean };

type ButtonPropsSxFix = Omit<ButtonProps, "sx"> & { __sx: ButtonProps["sx"] };

const ZigButton = styled(
  ({
    active,
    tooltip,
    ctaId,
    color,
    __sx, // somehow in this scenario the sx prop is not passed properly
    ...props
  }: ButtonPropsSxFix) => {
    const button = (
      <LoadingButton
        data-tack-cta={ctaId}
        {...props}
        sx={__sx}
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
  },
)``;

export default ({ sx, ...props }: ButtonProps) => <ZigButton {...props} __sx={sx} />;
