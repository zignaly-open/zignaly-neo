import * as yup from 'yup';

export const ForgotPasswordValidation = yup
  .object({
    email: yup
      .string()
      .required('error:error.required')
      .email('error:error.email-invalid'),
  })
  .required();
