import * as yup from 'yup';
import { inputAmountValidation } from 'util/validation';

export const editInvestmentValidation = ({ max }: { max: string }) =>
  yup.object().shape({
    amountTransfer: inputAmountValidation({ max }),
  });
