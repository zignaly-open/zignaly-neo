import * as yup from 'yup';
import { inputAmountValidation } from '../../../../util/validation';

export const MinBalanceModalValidation = yup.object({
  amountValue: inputAmountValidation({}),
});
