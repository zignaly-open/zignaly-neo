import * as yup from 'yup';
import { investAmountValidation } from '../InvestForm/validations';

export const editInvestmentValidation = ({
  max,
  balance,
  coin,
}: {
  max: string;
  coin: string;
  balance: string;
}) =>
  yup.object().shape({
    amountTransfer: investAmountValidation(max, coin, balance),
  });
