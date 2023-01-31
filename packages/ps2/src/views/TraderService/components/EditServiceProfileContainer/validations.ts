import * as yup from 'yup';

const nameRegex = /^[a-zA-Z0-9 $._#&|()\[\]%-]*$/;

export const EditServiceValidation = yup
  .object({
    name: yup
      .string()
      .required('error:error.required')
      .matches(nameRegex, 'common:validation.invalid-characters')
      .min(5, 'service:edit.validation.name-length')
      .max(50, 'service:edit.validation.name-length'),
    successFee: yup
      .number()
      .typeError('error:error.required')
      .required('error:error.required')
      .test(
        'range',
        'service:edit.validation.success-fee-range',
        (v) => !v || (v >= 10 && v < 75),
      ),
    // maximumSbt: yup
    //   .number()
    //   .typeError('error:error.required')
    //   .required('error:error.required')
    //   .positive('common:validation.negative-zeroable-amount'),
  })
  .required();
