import * as yup from 'yup';
import { investAmountValidation } from '../InvestForm/validations';

export const EditInvestmentValidation = ({
  max,
  coin,
}: {
  max: string;
  coin: string;
}) =>
  yup.object().shape({
    amountTransfer: investAmountValidation(max, coin),
  });
