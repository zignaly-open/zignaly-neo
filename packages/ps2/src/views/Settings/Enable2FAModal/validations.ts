import * as yup from 'yup';

export const TwoFAValidation = yup
  .object({
    code: yup
      .string()
      .required('error:error.required')
      .typeError('common:validation.invalid-value')
      .test(
        'value',
        'common:validation.invalid-value',
        (v) => Number.isInteger(Number(v)) && v?.length === 6,
      ),
  })
  .required();
