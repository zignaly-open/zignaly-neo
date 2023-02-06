import * as yup from 'yup';
import {
  inputAmountZeroableValidation,
  inputAmountTokenDecimalsValidation,
} from '../../../../util/validation';

export const MinBalanceModalValidation = yup.object({
  amountValue: inputAmountZeroableValidation.concat(
    inputAmountTokenDecimalsValidation,
  ),
});
