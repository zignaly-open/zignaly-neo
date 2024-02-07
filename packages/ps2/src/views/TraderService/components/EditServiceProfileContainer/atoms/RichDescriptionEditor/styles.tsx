import { styled } from '@mui/material';
import { Editable } from 'slate-react';
export const StyledEditable = styled(Editable)<{
  readOnly: boolean;
  error: boolean;
}>`
  margin-bottom: 5px;
  &:focus-visible {
    outline: none;
  }
  ${({ readOnly, theme, error }) =>
    !readOnly &&
    `background: linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%);
      border: 1px solid ${
        error ? theme.palette.redGraphOrError : theme.palette.neutral600
      };
      border-radius: 5px;
      padding: 0 10px;
      min-height: 350px;
      ${
        !error &&
        `&:hover, &:focus{
        border: 1px solid ${theme.palette.neutral400}
        };
        `
      }
    `}
`;
