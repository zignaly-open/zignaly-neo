import { Box, GlobalStyles, styled } from "@mui/material";
import { NiceScrollbar } from "utils/css";
import React from "react";
import { css } from "@emotion/react";
import dark from "../../../theme/dark";

type Props = { error?: string; width?: number };

export const StyledSelectWrapper = styled(Box)<Props>`
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
      margin-left: 0;
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

    &__indicator {
      ${({ width }) => width && width <= 100 && `padding: 0 2px`};
    }
  }
` as React.FC<Props>;

export const ZigSelectGlobalStyle = (
  <GlobalStyles
    styles={css`
      .zig-react-select {
        &__menu-portal {
          z-index: 1500 !important;
        }

        &__menu {
          background: rgba(16, 18, 37) !important;
          border: 1px solid ${dark.neutral600} !important;
          color: ${dark.neutral200} !important;

          &-list {
            ${NiceScrollbar.toString()};
          }
        }

        &__option--is-focused {
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1) !important;
        }

        &__option--is-selected {
          background: rgba(255, 255, 255, 0.2) !important;
        }
      }
    `}
  />
);
