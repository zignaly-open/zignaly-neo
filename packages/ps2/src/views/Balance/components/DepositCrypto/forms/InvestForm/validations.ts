import * as yup from 'yup';
import { inputAmountTokenMaxValidation } from '../../../../../../util/validation';

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: inputAmountTokenMaxValidation,
  understandMargin: yup.boolean().oneOf([true], 'error:error.required'),
  transferConfirm: yup
    .string()
    .test(
      'text-matches',
      'edit-investment:invest-modal.transfer-error',
      function (value) {
        return (
          value.toLocaleLowerCase() === 'transfer' ||
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
