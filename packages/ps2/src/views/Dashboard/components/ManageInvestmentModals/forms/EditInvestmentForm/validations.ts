import * as yup from 'yup';
import { investAmountValidation } from '../InvestForm/validations';

export const editInvestmentValidation = (
  params: Parameters<typeof investAmountValidation>[0],
) =>
  yup.object().shape({
    amountTransfer: investAmountValidation(params),
  });
