import { inputAmountValidation } from 'util/validation';
import * as yup from 'yup';
import i18n from 'i18next';
import BigNumber from 'bignumber.js';

export const withdrawValidation = (
  minOwner: number,
  coin: string,
  max: string | number,
) => {
  let validation = inputAmountValidation({
    coin,
    max,
  });
  if (minOwner) {
    validation = validation.test(
      'number',
      i18n.t('common:validation.min-invest-amount-for-owner', {
        minAmount: minOwner,
        minAmountCoin: coin,
      }),
      (value) =>
        new BigNumber(max)
          .minus(new BigNumber(value))
          .isGreaterThanOrEqualTo(new BigNumber(minOwner)),
    );
  }
  return yup.object().shape({
    amountTransfer: validation,
  });
};
