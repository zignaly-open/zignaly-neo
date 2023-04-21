import * as yup from 'yup';
import {
  inputAmountTokenMaxValidation,
  inputAmountTokenDecimalsValidation,
  inputAmountMinOwnerInvestedValidation,
} from '../../../../../../util/validation';

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: inputAmountTokenMaxValidation.concat(
    inputAmountTokenDecimalsValidation,
  ),
});

export const EditInvestmentValidationOwner = (minAmount: number) =>
  yup.object().shape({
    amountTransfer: inputAmountTokenMaxValidation
      .concat(inputAmountTokenDecimalsValidation)
      .concat(inputAmountMinOwnerInvestedValidation(minAmount)),
  });
