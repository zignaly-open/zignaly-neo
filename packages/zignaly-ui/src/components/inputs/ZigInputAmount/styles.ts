import { Divider } from "@mui/material";
import { styled, Box } from "@mui/system";
import ZigButton from "../ZigButton";

export const Layout = styled(Box)<{
  withCoinSelector?: boolean;
  error: boolean;
  labelInline: boolean;
}>`
  border: ${({ withCoinSelector, theme }) =>
    withCoinSelector ? "none;" : `1px dotted ${theme.palette.neutral600};`};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ withCoinSelector }) => (withCoinSelector ? "5px 24px 12px;" : "24px 24px 12px;")};
  position: relative;
  border-radius: 5px;

  ${({ error, theme, withCoinSelector }) =>
    error && !withCoinSelector && `border-color: ${theme.palette.redGraphOrError};`}
  ${({ labelInline }) =>
    labelInline &&
    `
      border-top: none;
      margin-top: 5px;
    `}

  && {
    .MuiInput-root {
      padding: 2px 24px;
      ${({ withCoinSelector, theme }) =>
        !withCoinSelector &&
        `
        background: ${theme.palette.neutral750};
      `}
      border: none;
    }

    .MuiInput-input {
      font-size: 30px;
      font-weight: 500;
      border-color: ${({ theme }) => theme.palette.neutral400};
      background: ${({ theme, withCoinSelector }) =>
        withCoinSelector ? "unset" : theme.palette.neutral750};
      -webkit-text-fill-color: ${({ theme }) => theme.palette.neutral175} !important;
    }
  }
`;

export const DividerWrapper = styled(Box)<{ error?: boolean }>`
  padding: 8px 0;
  width: 100%;
  height: 100%;
`;

export const TopDivider = styled(Divider, {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error: boolean }>`
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  transform: translateY(-50%);
  &:before {
    left: 1.5px;
  }
  &:after {
    right: 1.5px;
  }

  &:before,
  &:after {
    border-color: ${({ theme, error }) =>
      error ? theme.palette.redGraphOrError : theme.palette.neutral600};
    border-top-style: dotted;
  }
`;
export const InputWrapper = styled(Box)<{
  withCoinSelector?: boolean;
  error: boolean;
  wide?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 16px;
  width: ${({ wide }) => (wide ? "1;" : "auto;")};
  ${({ withCoinSelector, theme, error, disabled }) =>
    withCoinSelector &&
    `
    gap: 0;
    border-radius: 5px;
    border: 1px dotted ${error ? theme.palette.redGraphOrError : theme.palette.neutral600};
    &:hover{
      border-color: ${
        error
          ? theme.palette.redGraphOrError
          : disabled
          ? theme.palette.neutral600
          : theme.palette.neutral400
      };
    }
    `};
`;

export const MaxButton = styled(ZigButton)`
  padding: 3px 10px;
  border-radius: 13px;
  border: solid 1px ${(props) => props.theme.palette.neutral600};
  min-width: 44px;
  min-height: 30px;
  font-size: 12px;
  background: transparent;
  color: ${({ theme }) => theme.palette.neutral200};
`;
