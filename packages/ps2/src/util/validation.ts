import * as yup from 'yup';
import BigNumber from 'bignumber.js';

const inputAmountNumberValidation = yup
  .string()
  .required('common:validation.invalid-amount')
  .test('int', 'common:validation.invalid-amount', (val) => {
    return String(val) !== '0.0' && String(val) !== '0' && String(val) !== '0.';
  })
  .test('max', 'common:validation.invalid-value', function (val) {
    return !new BigNumber(val).isNaN();
  });

const inputAmountNumberValidationGt0 = inputAmountNumberValidation.test(
  'min',
  'common:validation.negative-amount',
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

export const inputAmountTokenMaxValidation = yup.object().shape({
  value: inputAmountNumberValidationMaxToken,
});
