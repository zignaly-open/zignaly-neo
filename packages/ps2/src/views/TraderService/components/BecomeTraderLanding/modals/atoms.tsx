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
        margin-left: 22px;
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
  border: 1px solid #35334a;
  border-left-width: 0;
  position: relative;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #171b30;
  margin-left: -4px;
`;
