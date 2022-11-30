import * as yup from 'yup';
import BigNumber from 'bignumber.js';

const inputAmountNumberValidation = yup
  .string()
  .required('common:validation.invalid-amount')
  .test('int', 'common:validation.invalid-value', (val) => {
    return String(val)[String(val).length - 1] !== '.';
  })
  .test('max', 'common:validation.invalid-value', function (val) {
    return !new BigNumber(val).isNaN();
  });

const inputAmountNumberValidationGt0 = inputAmountNumberValidation.test(
  'min',
  'common:validation.negative-amount',
  function (val) {
    return new BigNumber(val).gt(0);
  },
);

const inputAmountNumberValidationGte0 = inputAmountNumberValidation.test(
  'min',
  'common:validation.negative-zeroable-amount',
  function (val) {
    return new BigNumber(val).gte(0);
  },
);

const inputAmountNumberValidationMaxToken = inputAmountNumberValidationGt0.test(
  'number',
  'common:validation.insufficient-amount',
  function (val) {
    const tokenBalance = new BigNumber(this.parent?.token?.balance);
    const currentValue = new BigNumber(val);
    return !currentValue.isGreaterThan(tokenBalance);
  },
);

export const inputAmountTokenValidation = yup.object().shape({
  value: inputAmountNumberValidationGt0,
});

export const inputAmountZeroableValidation = yup.object().shape({
  value: inputAmountNumberValidationGte0,
});

export const inputAmountTokenMaxValidation = yup.object().shape({
  value: inputAmountNumberValidationMaxToken,
});
