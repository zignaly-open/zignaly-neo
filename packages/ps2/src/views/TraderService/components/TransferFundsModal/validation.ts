import * as yup from 'yup';
import { inputAmountValidation } from '../../../../util/validation';

export const transferModalValidation = (max: number | string) =>
  yup.object({
    amountValue: inputAmountValidation({ max }),
  });
