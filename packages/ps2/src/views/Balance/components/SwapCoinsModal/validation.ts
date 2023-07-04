import { inputAmountValidation } from 'util/validation';
import * as yup from 'yup';

export const convertAmountValidation = ({
  min,
  coin,
  balance,
}: {
  min: number;
  coin: string;
  balance: string | number;
}) =>
  yup
    .object()
    .shape({ fromCoinAmount: inputAmountValidation({ balance, min, coin }) });
