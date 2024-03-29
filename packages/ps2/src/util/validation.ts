import * as yup from 'yup';
import BigNumber from 'bignumber.js';
import i18n from 'i18next';
import { checkDecimals } from '@zignaly-open/ui';

export const decimalsValidation = (maxDecimals: number) =>
  yup
    .string()
    .test('int', 'common:validation.max-decimals', (val) =>
      checkDecimals(val, maxDecimals),
    );

export const decimalsValidationNumber = (maxDecimals: number) =>
  yup
    .number()
    .typeError('common:validation.invalid-value')
    .test('int', 'common:validation.max-decimals', (val) =>
      checkDecimals(val, maxDecimals),
    );

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

export const inputAmountMinOwnerInvested = (minInvestedAmount: number) =>
  yup
    .string()
    .test(
      'number',
      'common:validation.min-invest-amount-for-owner',
      function (val) {
        const tokenBalance = new BigNumber(this.parent?.token?.balance);
        const currentValue = new BigNumber(val);
        const minBalance = new BigNumber(minInvestedAmount);
        return tokenBalance
          .minus(currentValue)
          .isGreaterThanOrEqualTo(minBalance);
      },
    );

export const inputAmountMinOwnerInvestedValidation = (minAmount: number) =>
  yup.object().shape({
    value: inputAmountMinOwnerInvested(minAmount),
  });

const inputAmountNumberValidationMinToken = inputAmountNumberValidationGt0.test(
  'number',
  'common:validation.insufficient-amount-min',
  function (val) {
    const minValue = new BigNumber(this.parent?.token?.min);
    const currentValue = new BigNumber(val);
    return !currentValue.isLessThan(minValue);
  },
);

export const inputAmountTokenValidation = yup.object().shape({
  value: inputAmountNumberValidationGt0,
});

export const inputAmountZeroableValidation = () =>
  yup
    .string()
    .typeError('common:validation.invalid-value')
    .concat(inputAmountNumberValidation)
    .concat(inputAmountNumberValidationGte0)
    .test(
      'number',
      i18n.t('common:validation.max-decimals', { maxDecimals: 8 }),
      (val) => checkDecimals(val, 8),
    );

export const inputAmountTokenMaxValidation = yup.object().shape({
  value: inputAmountNumberValidationMaxToken,
});

export const inputAmountTokenMinValidation = yup.object().shape({
  value: inputAmountNumberValidationMinToken,
});

export const inputAmountTokenDecimalsValidation = yup.object().shape({
  value: decimalsValidation(8),
});

export const inputAmountValidation = ({
  min,
  max,
  balance,
  maxDecimals = 8,
  coin,
}: {
  min?: number | string;
  max?: number | string;
  balance?: number | string;
  maxDecimals?: number;
  coin?: string;
}) => {
  let validation = yup
    .string()
    .typeError('common:validation.invalid-value')
    // not sure why we're getting the error here but it's not a big deal
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .concat(inputAmountNumberValidation)
    // not sure why we're getting the error here but it's not a big deal
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .concat(inputAmountNumberValidationGt0);

  if (balance !== undefined) {
    validation = validation.test(
      'number',
      'common:validation.insufficient-amount',
      (val) => !new BigNumber(val).isGreaterThan(new BigNumber(balance)),
    );
  }

  if (min !== undefined) {
    validation = validation.test(
      'number',
      i18n.t('common:validation.insufficient-amount-min', {
        minValue: min,
        minValueCoin: coin,
      }) as string,
      (val) => !new BigNumber(val).isLessThan(new BigNumber(min)),
    );
  }

  if (max !== undefined) {
    validation = validation.test(
      'number',
      i18n.t('common:validation.insufficient-amount-max', {
        maxValue: max,
        coin,
      }) as string,
      (val) => !new BigNumber(val).isGreaterThan(new BigNumber(max)),
    );
  }

  if (maxDecimals !== undefined) {
    validation = validation.test(
      'number',
      i18n.t('common:validation.max-decimals', { maxDecimals }),
      (val) => checkDecimals(val, maxDecimals),
    );
  }

  return validation;
};
