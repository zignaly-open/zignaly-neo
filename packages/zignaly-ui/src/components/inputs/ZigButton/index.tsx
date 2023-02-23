import React from "react";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { ButtonGroup, styled, Tooltip } from "@mui/material";
import { dark } from "../../../theme";

export type ZigButtonProps = LoadingButtonProps & {
  ctaId?: string;
  tooltip?: string;
  active?: boolean;
};

const ZigButton = ({ active, tooltip, ctaId, color, ...props }: ZigButtonProps) => {
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

export const ZigButtonGroup: React.FC = styled(ButtonGroup)`
  .MuiButton-root {
    border-right-width: 0 !important;

    &:last-child {
      border-right-width: 1px !important;
    }

    &:hover,
    &.MuiButton-active {
      z-index: 3;
      box-shadow: 1px 0 0 ${dark.neutral400};
    }

    &.Mui-disabled {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export default ZigButton as typeof LoadingButton & typeof ZigButton;
