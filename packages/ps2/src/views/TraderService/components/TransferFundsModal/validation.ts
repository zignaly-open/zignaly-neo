import * as yup from 'yup';
import { inputAmountTokenMaxValidation } from '../../../../util/validation';

export const TransferModalValidation = yup.object({
  amountValue: inputAmountTokenMaxValidation,
});
