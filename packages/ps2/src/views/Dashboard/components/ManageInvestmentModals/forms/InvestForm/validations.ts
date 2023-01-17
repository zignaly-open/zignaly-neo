import * as yup from 'yup';
import {
  inputAmountTokenMaxValidation,
  decimalsValidation,
} from '../../../../../../util/validation';

const amountDecimalsValidation = decimalsValidation(8);

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: inputAmountTokenMaxValidation.concat(
    yup.object().shape({
      value: yup.string().concat(amountDecimalsValidation),
    }),
  ),
  understandMargin: yup.boolean().oneOf([true], 'error:error.required'),
  transferConfirm: yup
    .string()
    .test(
      'text-matches',
      'edit-investment:invest-modal.transfer-error',
      function (value) {
        return (
          value.toLocaleLowerCase() ===
            this.parent.transferLabelForValidation?.toLocaleLowerCase() ||
          this.parent.step === 1
        );
      },
    ),
  understandMoneyTransferred: yup
    .boolean()
    .oneOf([true], 'error:error.required'),
});
