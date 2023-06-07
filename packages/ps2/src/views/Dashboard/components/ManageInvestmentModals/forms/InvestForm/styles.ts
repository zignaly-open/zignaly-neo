import { styled } from '@mui/system';
import { Field as EditField } from '../EditInvestmentForm/styles';

export const Field = styled(EditField)`
  grid-template-columns: 1fr 1fr;
`;

export const ZigInputWrapper = styled('div')`
  .MuiInput-root {
    &:not(:hover):not(:has(input:focus)) {
      &,
      .MuiInput-input {
        background: #171b30;
      }
    }
  }
`;
