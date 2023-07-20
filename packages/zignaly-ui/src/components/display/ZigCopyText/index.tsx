import React from "react";
import { ZigCopyTextProps } from "./types";
import { styled } from "@mui/material/styles";
import ZigInput, { ZigInputInteractiveAdornmentStyle } from "../../inputs/ZigInput";
import { InputAdornment } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "copy-to-clipboard";

const ZigCopyText: React.FC<ZigCopyTextProps> = styled<React.FC<ZigCopyTextProps>>(
  ({ onCopied, copyElementId, InputProps, ...props }) => {
    const doCopy = () => {
      onCopied?.();
      copy(props.value as string);
    };
    return (
      <ZigInput
        wide
        {...props}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <ContentCopyIcon
                id={copyElementId}
                onClick={doCopy}
                width={40}
                height={40}
                sx={ZigInputInteractiveAdornmentStyle}
              />
            </InputAdornment>
          ),
        }}
        readOnly
      />
    );
  },
)`
  .MuiInput-root {
    &,
    & .MuiInput-input {
      cursor: default;
    }

    &,
    &.Mui-focused,
    &:hover {
      border-color: ${({ theme }) => theme.palette.neutral700} !important;
    }
  }
`;

export default ZigCopyText;
