import * as yup from 'yup';
import { inputAmountTokenMaxValidation } from '../../../../../../util/validation';

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: inputAmountTokenMaxValidation,
});
