import { Box, GlobalStyles, styled } from "@mui/material";
import { NiceScrollbar } from "utils/css";
import React from "react";
import { css } from "@emotion/react";

type Props = { error?: string; width?: number; small?: boolean; outlined?: boolean };

export const StyledSelectWrapper = styled(Box)<Props>`
  .zig-react-select {
    &__control {
      border: 1px solid
        ${({ theme, error }) => (error ? theme.palette.redGraphOrError : theme.palette.neutral600)};
      padding: ${({ small }) => (small ? "3px 16px 3px 9px" : "11px 24px 11px 16px")};
      margin-top: 4px;
      min-height: ${({ small }) => (small ? "30.75px" : "60px")};
      border-radius: 5px;
      display: flex;
      align-items: center;
      ${({ outlined }) =>
        css`
          background: ${outlined ? "transparent" : "rgba(16, 18, 37)"};
          background: ${outlined
            ? "transparent"
            : `linear-gradient(
            90deg,
            rgb(16 18 37) 0%,
            rgb(16 18 37) 35%,
            rgb(16 18 37) 100%
          );`};
        `}
      transition: border-color 0.2s;
      margin-bottom: 3px;

      ${({ width }) => width && `width: ${width}${width?.toString().includes("%") ? "" : "px"}`};

      padding-right: 0;

      &:hover {
        border-color: ${({ theme, error }) =>
          error ? theme.palette?.redGraphOrError : theme.palette.neutral400};
        ${({ outlined }) =>
          outlined &&
          css`
            background-color: rgba(118, 130, 247, 0.08);
          `}
        ${({ outlined, theme }) =>
          outlined &&
          css`
            .zig-react-select__single-value {
              color: ${theme.palette.neutral000} !important;
            }
          `}
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
      margin-left: 0;
    }

    &__value-container {
      ${({ small }) =>
        small &&
        css`
          padding: 0 5px;
        `}
    }

    &__placeholder,
    &__single-value,
    &__input-container,
    &__input {
      font-size: ${({ small }) => (small ? "13px" : "16px")};
      line-height: ${({ small }) => (small ? "15px" : "20px")};
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

    &__input-container {
      margin-left: 0;
    }

    &__indicator {
      ${({ width }) =>
        width &&
        width <= 100 &&
        css`
          padding: 0 2px;
        `};
      ${({ small }) =>
        small &&
        css`
          padding: 0 4px;
          width: 22px;
          height: 22px;
        `};
    }
  }
` as React.FC<Props>;

export const ZigSelectGlobalStyle = (
  <GlobalStyles
    styles={css`
      .zig-react-select {
        &__menu {
          &-list {
            ${NiceScrollbar.toString()};
          }
        }
      }
    `}
  />
);
