import * as yup from 'yup';

export const EditProfileValidation = yup
  .object({
    username: yup.string().required('error:error.required'),
    email: yup
      .string()
      .required('error:error.required')
      .email('error:error.email-invalid'),
  })
  .required();
