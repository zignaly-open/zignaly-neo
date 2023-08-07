import * as yup from 'yup';

export const EditProfileValidation = yup
  .object({
    username: yup.string().required('error:error.required'),
    email: yup
      .string()
      .required('error:error.required')
      .email('error:error.email-invalid'),
    bio: yup
      .string()
      .test(
        'maxlength',
        'common:validation.max-allowed-length',
        function (val) {
          return val.length <= 200;
        },
      ),
  })
  .required();
