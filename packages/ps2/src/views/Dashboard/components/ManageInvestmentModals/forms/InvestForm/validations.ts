import * as yup from 'yup';
import { inputAmountTokenMaxValidation } from '../../../../../../util/validation';

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: inputAmountTokenMaxValidation,
  understandMargin: yup.boolean().oneOf([true], 'error:error.required'),
  transferConfirm: yup
    .string()
    .test('text-matches', 'error:error.invalid-value', function (value) {
      return value === 'Transfer' || this.parent.step === 1;
    }),
  understandMoneyTransferred: yup
    .boolean()
    .oneOf([true], 'error:error.required'),
});
