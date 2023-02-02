import * as yup from 'yup';

export const CreateServiceValidation = yup
  .object({
    serviceName: yup.string().required('error:error.required'),
    baseCurrency: yup.string().required('error:error.required'),
  })
  .required();
