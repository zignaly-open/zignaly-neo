import * as yup from 'yup';
import { inputAmountTokenValidation } from '../../../../util/validation';

export const MinBalanceModalValidation = yup.object({
  amountValue: inputAmountTokenValidation,
});
