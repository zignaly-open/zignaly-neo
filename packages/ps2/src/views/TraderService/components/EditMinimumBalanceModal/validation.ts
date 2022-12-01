import * as yup from 'yup';
import { inputAmountZeroableValidation } from '../../../../util/validation';

export const MinBalanceModalValidation = yup.object({
  amountValue: inputAmountZeroableValidation,
});
