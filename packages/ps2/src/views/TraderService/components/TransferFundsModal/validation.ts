import * as yup from 'yup';
import {
  inputAmountTokenMaxValidation,
  inputAmountTokenDecimalsValidation,
  inputAmountValidation,
} from '../../../../util/validation';

export const transferModalValidation = (max: number | string) =>
  yup.object({
    amountValue: inputAmountValidation({ max }),
  });
