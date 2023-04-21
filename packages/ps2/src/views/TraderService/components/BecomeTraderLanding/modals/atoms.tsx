import { Box, styled } from '@mui/material';

export const ZigButtonGroupInputWrapper = styled(Box)`
  & > div {
    width: 100%;
  }
`;

export const SuccessFieldWrapper = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: row;
  .MuiFormControl-root {
    min-width: 100px;
    width: 50%;
    margin-top: 0;
    &,
    & > label {
      overflow: visible;
    }

    .MuiInput-root {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const SuccessFieldWrapperShit = styled(Box)`
  min-width: 200px;
  width: 50%;
  height: 60px;
  padding-top: 17px;
  text-align: center;
  margin-top: 48px;
  border: 1px solid #35334a;
  border-left-width: 0;
  position: relative;
  /* border-left-width: 0; */
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #090a15;
`;
