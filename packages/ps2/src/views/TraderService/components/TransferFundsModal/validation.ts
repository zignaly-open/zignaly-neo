import * as yup from 'yup';
import {
  inputAmountTokenMaxValidation,
  inputAmountTokenDecimalsValidation,
} from '../../../../util/validation';

export const TransferModalValidation = yup.object({
  amountValue: inputAmountTokenMaxValidation.concat(
    inputAmountTokenDecimalsValidation,
  ),
});
