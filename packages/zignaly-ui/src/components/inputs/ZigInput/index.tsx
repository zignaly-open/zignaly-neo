import React, { useState } from "react";
import { ZigInputProps } from "./types";
import { styled } from "@mui/material/styles";
import { InputAdornment, TextField } from "@mui/material";
import ZigButton from "../ZigButton";
import dark from "../../../theme/dark";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ErrorMessage } from "../../display/ZigAlertMessage";

function valueToArray<T>(v: T | T[]): T[] {
  return (Array.isArray(v) ? v : [v]).filter(Boolean);
}

const ZigInput: React.FC<ZigInputProps> = styled<React.FC<ZigInputProps>>(
  React.forwardRef(({ error, wide, sensitive, labelAction, helperText, id, ...props }, ref) => {
    const [isShown, setIsShown] = useState(false);
    const EyeIcon = !isShown ? VisibilityOffIcon : VisibilityIcon;

    return (
      <TextField
        id={id}
        inputRef={ref}
        {...props}
        inputProps={{
          ...(props.inputProps || {}),
          "data-testid":
            props?.inputProps?.["data-testid"] ||
            (process.env.NODE_ENV === "test" && id) ||
            undefined,
        }}
        label={
          !props.label ? null : (
            <>
              {props.label}
              {labelAction && (
                <ZigButton
                  variant={"text"}
                  sx={{ fontSize: "13px", fontWeight: 400 }}
                  tabIndex={labelAction.tabIndex}
                  onClick={labelAction.onClick}
                  href={labelAction.href}
                  id={labelAction.id}
                >
                  {labelAction.text}
                </ZigButton>
              )}
            </>
          )
        }
        variant={"standard"}
        error={!!error}
        helperText={
          typeof error === "string" && error !== ""
            ? error && <ErrorMessage text={error} />
            : helperText
        }
        type={sensitive ? (!isShown ? "password" : "text") : props.type}
        InputProps={{
          disableUnderline: true,
          ...(props.InputProps || {}),
          ...(sensitive
            ? {
                endAdornment: [
                  <InputAdornment position="end" key={id + "-sensivive"}>
                    {!!sensitive && (
                      <EyeIcon
                        id={id && `${id}-visibility-icon`}
                        onClick={() => setIsShown((v) => !v)}
                        width={40}
                        height={40}
                        sx={ZigInputInteractiveAdornmentStyle}
                      />
                    )}
                  </InputAdornment>,
                  ...valueToArray(props?.InputProps?.endAdornment),
                ],
              }
            : {}),
        }}
        InputLabelProps={{ shrink: true, ...(props.InputLabelProps || {}) }}
      />
    );
  }),
)`
  // TODO: move to darkMui
  ${(props) => props.wide && "display: block;"}

  .MuiInputLabel-root {
    &.Mui-focused {
      color: ${({ theme }) => theme.palette.neutral000};
    }
    transform: none !important;
    width: 100%;
    transition: color 0.2s;

    ${({ theme, labelInline }) =>
      !labelInline
        ? `
    font-size: 15px !important;
    line-height: 24px;
    letter-spacing: 0.55px;
    color: ${theme.palette.neutral200} !important;
    
    display: flex;
    position: static;
    flex-direction: row;
    justify-content: space-between;

    button {
      float: right;
    }
  `
        : `
    text-align: center;
    z-index: 2;
    font-size: 11px;
    letter-spacing: 0.33px;
    margin-top: 8px;
    color: ${theme.palette.neutral300} !important;
  `}
  }

  .MuiInput-root {
    border: 1px solid ${({ theme }) => theme.palette.neutral600};
    padding: ${({ labelInline }) => (labelInline ? "18px 24px 6px" : "12px 24px")};
    margin-top: ${(props) => (props.label ? "10px" : 0)};
    min-height: 60px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background: rgba(16, 18, 37);
    background: linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%);
    transition: border-color 0.2s;

    &.Mui-disabled {
      cursor: not-allowed;
      border-color: ${({ theme }) => theme.palette.neutral700};
    }

    &.Mui-focused,
    &:hover {
      border-color: ${({ theme }) => theme.palette.neutral400};
    }

    &.Mui-error,
    &.Mui-error:hover,
    &.Mui-error.Mui-focused {
      border-color: ${({ theme }) => theme.palette.redGraphOrError};

      .MuiInputLabel-root {
        color: ${({ theme }) => theme.palette.neutral200};
      }
    }

    .MuiInputAdornment-root {
      .MuiSvgIcon-root {
        width: 18px;
        height: 18px;
      }
    }
  }

  .MuiInput-input {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.palette.neutral100} !important;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.55px;
    width: 100%;
    font-family: "Avenir Next", sans-serif;
    box-shadow: none !important;
    resize: none;
    background: linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%);

    -webkit-text-fill-color: #838b95 !important;

    &::placeholder {
      -webkit-text-fill-color: ${({ theme }) => theme.palette.neutral400} !important;
    }

    &.Mui-disabled {
      cursor: not-allowed;
      opacity: 0.67;
      color: ${({ theme }) => theme.palette.neutral100} !important;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const ZigInputInteractiveAdornmentStyle = {
  cursor: "pointer",
  color: dark.neutral300,
  transition: "all .3s",
  "&:hover": {
    color: dark.neutral200,
  },
};

export default ZigInput;
