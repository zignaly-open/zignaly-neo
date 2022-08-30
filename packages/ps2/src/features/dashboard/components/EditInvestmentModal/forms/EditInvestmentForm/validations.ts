import * as yup from 'yup';
import BigNumber from 'bignumber.js';

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: yup.object().shape({
    value: yup
      .string()
      .required('edit-investment:edit-investment.validation-indicateAnAmount')
      .test(
        'int',
        'edit-investment:edit-investment.validation-indicateAnAmount',
        (val) => {
          return (
            String(val) !== '0.0' && String(val) !== '0' && String(val) !== '0.'
          );
        },
      )
      .test('max', 'common:validation.invalid-value', function (val) {
        return !new BigNumber(val).isNaN();
      })
      .test('number', 'common:validation.insufficient-amount', function (val) {
        const tokenBalance = new BigNumber(this.parent?.token?.balance);
        const currentValue = new BigNumber(val);
        return !currentValue.isGreaterThan(tokenBalance);
      }),
  }),
});
