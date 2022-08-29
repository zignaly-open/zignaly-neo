import * as yup from 'yup';

export const EditInvestmentValidation = yup.object().shape({
  amountTransfer: yup
    .string()
    .required('edit-investment.validation.indicateAnAmount')
    .test('int', 'edit-investment.validation.indicateAnAmount', (val) => {
      return (
        String(val) !== '0.0' && String(val) !== '0' && String(val) !== '0.'
      );
    }),
});
