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
      // @ts-ignore
      data-testid={
        props["data-testid"] || (process.env.NODE_ENV === "test" && props.id) || undefined
      }
      // hack to preserve old behavior but allow for normal mui theming
      color={variant === "outlined" && !color ? "secondary" : color}
      className={active ? `${props.className} MuiButton-active` : props.className}
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
    font-weight: 400;
    text-transform: capitalize !important;

    &:hover,
    &.MuiButton-active {
      z-index: 3;
      border-color: #464a85 !important;
      border-radius: 5px;
      background: ${({ theme }) => theme.palette.neutral750};
      color: ${({ theme }) => theme.palette.highlighted};

      + button,
      + span button {
        border-left-color: transparent;
      }
    }

    &:not(:last-child) {
      border-right-color: transparent;
    }

    &.Mui-disabled {
      border-color: ${({ theme }) => theme.palette.neutral600};
      color: rgba(255, 255, 255, 0.2);
    }
  }

  span button {
    height: 100%;
  }
` as typeof ButtonGroup;

export default ZigButton as typeof LoadingButton & typeof ZigButton;
