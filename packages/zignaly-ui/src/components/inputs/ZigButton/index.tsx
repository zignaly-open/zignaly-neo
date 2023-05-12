import React from "react";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { ButtonGroup, styled, Tooltip } from "@mui/material";

export type ZigButtonProps = Omit<LoadingButtonProps, "size" | "variant"> & {
  size?: LoadingButtonProps["size"] | "xlarge";
  variant?: LoadingButtonProps["variant"];
  ctaId?: string;
  tooltip?: string;
  narrow?: boolean;
  linkTarget?: "_blank";
  linkRel?: "noopener noreferrer";
  active?: boolean;
};

const ZigButton = ({
  active,
  tooltip,
  ctaId,
  color,
  size,
  narrow,
  variant = "contained",
  linkTarget,
  linkRel,
  ...props
}: ZigButtonProps) => {
  const button = (
    <LoadingButton
      data-tack-cta={ctaId}
      // it wasn't me lol
      size={size as LoadingButtonProps["size"]}
      variant={variant as LoadingButtonProps["variant"]}
      {...props}
      {...(narrow
        ? {
            sx: {
              ...props.sx,
              minWidth: "0 !important",
              padding: "6px",
            },
          }
        : {})}
      {...(props.href
        ? {
            rel: linkRel ?? "noopener noreferrer",
            target: linkTarget ?? "_blank",
          }
        : {})}
      // hack to preserve old behavior but allow for normal mui theming
      color={variant === "outlined" && !color ? "secondary" : color}
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

export const ZigButtonGroup = styled(ButtonGroup)`
  outline: 1px solid ${({ theme }) => theme.palette.neutral600};
  outline-offset: -1px;

  .MuiButton-root {
    &:hover,
    &.MuiButton-active {
      z-index: 3;
      border-color: #464a85 !important;
      border-radius: 5px;

      + button {
        border-left-color: transparent;
      }
    }

    &.Mui-disabled {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
` as typeof ButtonGroup;

export default ZigButton as typeof LoadingButton & typeof ZigButton;
