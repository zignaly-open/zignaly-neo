import { styled } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

export const StyledEditor = styled(MDEditor)<{
  error: boolean;
}>`
  button {
    width: 20px;
    height: 20px;
  }
  .w-md-editor-text {
    * {
      font-size: 16px;
      line-height: 25px;
      color: ${({ theme }) => theme.palette.neutral200} !important;
    }
  }
  .w-md-editor-toolbar {
    button {
      width: 25px;
      height: 25px;
      svg {
        width: 15px;
        height: 15px;
        color: ${({ theme }) => theme.palette.neutral200} !important;
      }
    }
  }
  .w-md-editor-toolbar-child {
    width: 70px;
    button {
      color: ${({ theme }) => theme.palette.neutral200};
    }
    button:hover {
      background: unset;
      color: ${({ theme }) => theme.palette.neutral000};
    }
  }
  box-shadow: none !important;
  .w-md-editor-toolbar,
  .w-md-editor-input,
  .w-md-editor-preview {
    background: linear-gradient(
      90deg,
      rgb(16 18 37) 0%,
      rgb(16 18 37) 35%,
      rgb(16 18 37) 100%
    );
    color: ${({ theme }) => theme.palette.neutral200};
    font-size: 16px;
    scrollbar-width: thin;
  }
  margin-bottom: 5px;
  padding: 0;

  ${({ theme, error }) =>
    `
      border: 1px solid ${
        error ? theme.palette.redGraphOrError : theme.palette.neutral600
      };
      border-radius: 5px;
      min-height: 400px;
      ${
        !error &&
        `&:hover, &:focus{
        border: 1px solid ${theme.palette.neutral400}
        };
        `
      }
    `}
`;
