import * as yup from 'yup';

export const CreateKeyValidation = yup
  .object({
    name: yup.string().required('error:error.required'),
  })
  .required();
