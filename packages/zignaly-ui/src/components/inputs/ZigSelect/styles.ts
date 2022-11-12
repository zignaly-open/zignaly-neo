import { Box, styled } from "@mui/material";
import { NiceScrollbar } from "utils/css";
import React from "react";

type Props = { error?: string; width?: number };

export const StyledSelectWrapper = styled(Box)<Props>`
  .MuiInput-root {
    &.Mui-disabled {
      cursor: not-allowed;
      border-color: ${({ theme }) => theme.palette.neutral700};
    }

    &.Mui-focused {
      border-color: ${({ theme }) => theme.palette.neutral400};
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

  .zig-react-select {
    &__control {
      border: 1px solid
        ${({ theme, error }) => (error ? theme.palette.redGraphOrError : theme.palette.neutral600)};
      padding: 11px 24px 11px 16px;
      margin-top: 4px;
      min-height: 60px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      background: rgba(16, 18, 37);
      background: linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%);
      transition: border-color 0.2s;
      margin-bottom: 3px;

      ${({ width }) => width && `width: ${width}${width?.toString().includes("%") ? "" : "px"}`};

      padding-right: 0;

      &:hover {
        border-color: ${({ theme, error }) =>
          error ? theme.palette?.redGraphOrError : theme.palette.neutral400};
      }

      &--is-focused {
        border: 1px solid
          ${({ theme, error }) =>
            error ? theme.palette.redGraphOrError : theme.palette.neutral400};
        box-shadow: none !important;
      }
    }

    &__placeholder,
    &__single-value {
      padding: 0;
      font-size: 16px;
      line-height: 20px;
    }

    &__single-value,
    &__input {
      color: ${({ theme }) => theme.palette.neutral100} !important;
    }

    .zig-react-select__menu {
      border: 1px solid ${({ theme }) => theme.palette.neutral600} !important;
      color: ${({ theme }) => theme.palette.neutral200} !important;
      background: rgba(16, 18, 37) !important;
    }

    &__placeholder {
      color: ${({ theme }) => theme.palette.neutral400} !important;
    }

    &__menu {
      ${({ width }) => width && `width: ${width}px`};
      background: rgba(16, 18, 37);
      border: 1px solid ${({ theme }) => theme.palette.neutral600} !important;
      color: ${({ theme }) => theme.palette.neutral200} !important;

      &-list {
        ${NiceScrollbar.toString()};
      }
    }

    &__option--is-focused {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);
    }

    &__option--is-selected {
      background: rgba(255, 255, 255, 0.2);
    }

    &__indicator {
      ${({ width }) => width && width <= 100 && `padding: 0 2px`};
    }
  }
` as React.FC<Props>;
