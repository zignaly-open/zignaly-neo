import { Box, GlobalStyles, styled } from "@mui/material";
import { NiceScrollbar } from "utils/css";
import React from "react";
import { css } from "@emotion/react";
import { StyledComponent } from "@emotion/styled";
import { BoxTypeMap } from "@mui/system";

type Props = {
  error?: string | boolean;
  width?: number;
  small?: boolean;
  outlined?: boolean;
  showBorder?: boolean;
  hoverBackground?: boolean;
};

export const StyledSelectWrapper: StyledComponent<BoxTypeMap & Props> = styled(Box)<Props>`
  gap: 10px;
  display: flex;
  flex-direction: column;

  .zig-react-select {
    &__control {
      border: 1px solid
        ${({ theme, error }) => (error ? theme.palette.redGraphOrError : theme.palette.neutral600)};
      ${({ showBorder }) => !showBorder && "border: none;"};
      padding: ${({ small }) => (small ? "3px 16px 3px 9px" : "11px 24px 11px 16px")};
      min-height: ${({ small }) => (small ? "0" : "60px")};
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-wrap: nowrap;
      ${({ outlined, theme }) =>
        css`
          background: ${outlined ? "transparent" : theme.palette.neutral800};
        `}
      transition: border-color 0.2s;

      ${({ width }) => width && `width: ${width}${width?.toString().includes("%") ? "" : "px"}`};

      padding-right: 0;

      &:hover {
        border-color: ${({ theme, error }) =>
          error ? theme.palette?.redGraphOrError : theme.palette.neutral400};
        ${({ outlined, hoverBackground }) =>
          outlined &&
          hoverBackground &&
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
        ${({ showBorder }) => !showBorder && "border: none;"};
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
      ${({ small }) =>
        small
          ? css`
              padding-bottom: 1px;
            `
          : ""};
    }

    &__single-value,
    &__input {
      ${({ small }) =>
        small
          ? css`
              height: 13px;
            `
          : ""};
      color: ${({ theme }) => theme.palette.neutral100} !important;
    }

    .zig-react-select__menu {
      border: 1px solid ${({ theme }) => theme.palette.neutral600} !important;
      color: ${({ theme }) => theme.palette.neutral200} !important;
      background: ${({ theme }) => theme.palette.neutral800} !important;
    }

    &__placeholder {
      color: ${({ theme }) => theme.palette.neutral400} !important;
    }

    &__input-container {
      margin-left: 0;
    }

    &__indicator {
      color: ${({ theme }) => theme.palette.neutral400};

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
`;

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
