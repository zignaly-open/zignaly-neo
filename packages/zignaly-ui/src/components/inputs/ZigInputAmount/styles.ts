import { Divider } from "@mui/material";
import { styled, Box } from "@mui/system";
import ZigButton from "../ZigButton";

export const Layout = styled(Box)<{ error: boolean; labelInline: boolean }>`
  border: 1px dotted ${({ theme }) => theme.palette.neutral600};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 24px 12px;
  position: relative;
  border-radius: 5px;

  ${({ error, theme }) => error && `border-color: ${theme.palette.redGraphOrError};`}
  ${({ labelInline }) =>
    labelInline &&
    `
      border-top: none;
      margin-top: 5px;
    `}

  && {
    .MuiInput-root {
      padding: 2px 24px;
      background: ${({ theme }) => theme.palette.neutral750};
      border: none;
    }

    .MuiInput-input {
      font-size: 30px;
      font-weight: 500;
      border-color: ${({ theme }) => theme.palette.neutral400};
      background: ${({ theme }) => theme.palette.neutral750};
      -webkit-text-fill-color: #878dd1 !important;
    }
  }
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

export const MaxButton = styled(ZigButton)`
  padding: 3px 10px;
  border-radius: 13px;
  border: solid 1px #35334a;
  min-width: 44px;
  min-height: 30px;
  font-size: 12px;
  background: transparent;
  color: ${({ theme }) => theme.palette.neutral200};
`;
