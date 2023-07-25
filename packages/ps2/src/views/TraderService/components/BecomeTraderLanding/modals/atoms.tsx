import { Box, styled } from '@mui/material';

export const ZigButtonGroupInputWrapper = styled(Box)`
  & > div {
    width: 100%;
  }
`;

export const SuccessFieldWrapper = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: column;

  .MuiFormControl-root {
    z-index: 1;
    width: 135px;

    .MuiInput-root {
      margin-top: 0;

      input {
        text-align: center;
        margin-left: 18px;
        width: 100%;
      }

      .MuiTypography-root,
      input {
        color: ${({ theme }) => theme.palette.neutral200} !important;
        -webkit-text-fill-color: ${({ theme }) =>
          theme.palette.neutral200} !important;

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }

    p {
      white-space: nowrap;
    }
  }
`;

export const SuccessFieldReceive = styled(Box)`
  min-width: 135px;
  height: 60px;
  text-align: center;
  position: relative;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: ${({ theme }) => theme.palette.neutral750};
  margin-left: -4px;
`;
