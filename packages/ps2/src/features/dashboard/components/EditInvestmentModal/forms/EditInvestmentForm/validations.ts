import * as yup from 'yup';
import { maxAmountValidation } from '../../util';

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: maxAmountValidation,
});
