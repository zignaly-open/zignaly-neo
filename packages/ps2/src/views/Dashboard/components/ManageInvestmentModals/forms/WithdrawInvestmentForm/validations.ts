import * as yup from 'yup';
import {
  inputAmountTokenMaxValidation,
  inputAmountTokenDecimalsValidation,
} from '../../../../../../util/validation';

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: inputAmountTokenMaxValidation.concat(
    inputAmountTokenDecimalsValidation,
  ),
});
