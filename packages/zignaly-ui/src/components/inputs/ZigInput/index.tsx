import React from "react";
import { ZigInputProps } from "./types";
import ErrorMessage from "components/display/ErrorMessage";
import { styled, TextField } from "@mui/material";

const ZigInput: React.FC<ZigInputProps> = styled<React.FC<ZigInputProps>>(
  ({ error, helperText, ...props }) => (
    <TextField
      {...props}
      variant={"standard"}
      error={!!error}
      helperText={typeof error === "string" ? error && <ErrorMessage text={error} /> : helperText}
      InputProps={{ disableUnderline: true, ...(props.InputProps || {}) }}
      InputLabelProps={{ shrink: true, ...(props.InputLabelProps || {}) }}
    />
  ),
)`
  .MuiInputLabel-root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 15px !important;
    line-height: 24px;
    letter-spacing: 0.55px;
    color: ${({ theme }) => theme.palette.neutral200};
    transform: none !important;
  }

  .MuiInput-root {
    border: 1px solid ${({ theme }) => theme.palette.neutral600};
    padding: 12px 24px;
    margin-top: 26px;
    min-height: 60px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background: rgba(16, 18, 37);
    background: linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%);

    &.Mui-disabled {
      cursor: not-allowed;
      border-color: ${({ theme }) => theme.palette.neutral700};
    }

    &.Mui-focused {
      border-color: ${({ theme }) => theme.palette.neutral500};
    }

    &.Mui-error,
    &.Mui-error.Mui-focused {
      border-color: ${({ theme }) => theme.palette.redGraphOrError};

      .MuiInputLabel-root {
        color: ${({ theme }) => theme.palette.neutral200};
      }
    }
  }

  .MuiInput-input {
    background: transparent;
    border: none;
    color: rgb(193, 193, 200) !important;
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

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
      -webkit-background-clip: text;
    }

    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 50px white inset;
      -webkit-text-fill-color: #333;
    }

    -webkit-text-fill-color: #838b95 !important;

    &::placeholder {
      -webkit-text-fill-color: ${({ theme }) => theme.palette.neutral400} !important;
    }

    &.Mui-disabled {
      cursor: not-allowed;
      opacity: 0.67;
      color: ${({ theme }) => theme.palette.neutral100} !important;
    }
  }
`;

export default ZigInput;
