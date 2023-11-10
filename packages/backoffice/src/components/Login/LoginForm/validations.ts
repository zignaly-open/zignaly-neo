import * as yup from 'yup';

export const LoginValidation = yup
  .object({
    email: yup
      .string()
      .required('auth:error.required')
      .email('auth:error.email-invalid'),
    password: yup.string().required('auth:error.required'),
  })
  .required();
