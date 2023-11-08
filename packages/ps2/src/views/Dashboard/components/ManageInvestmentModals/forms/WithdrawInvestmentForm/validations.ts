import { inputAmountValidation } from 'util/validation';
import * as yup from 'yup';
import BigNumber from 'bignumber.js';

export const withdrawValidation = ({
  minInvestment,
  minOwner,
  coin,
  max,
}: {
  minInvestment?: number;
  minOwner?: number;
  coin: string;
  max: string | number;
}) => {
  let validation = inputAmountValidation({
    coin,
    max,
  });
  if (minOwner) {
    validation = validation.test(
      'number',
      'common:validation.min-invest-amount-for-owner',
      (value) =>
        new BigNumber(max)
          .minus(new BigNumber(value))
          .isGreaterThanOrEqualTo(new BigNumber(minOwner)),
    );
  }

  if (minInvestment) {
    validation = validation.test(
      'number',
      'withdraw:min-investment',
      (value) =>
        new BigNumber(max).eq(new BigNumber(value)) ||
        new BigNumber(max).minus(new BigNumber(value)).gte(minInvestment),
    );
  }
  return yup.object().shape({
    amountTransfer: validation,
  });
};
